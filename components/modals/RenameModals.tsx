'use client'



import React, {  FormEventHandler, useEffect, useState } from 'react'
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogFooter,
    DialogTitle,
 } from '../ui/dialog';
import { useRenameModal } from '../../store/UseRenameModal';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import { UseApiMutation } from '../../hooks/UseApiMutation';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';





export const RenameModals = () => {

const {mutate,pending} = UseApiMutation(api.boards.update)



    const{ isOpen, onClose, initialValues }= useRenameModal();

    const [title, setTitle] = useState(initialValues.title)

useEffect(()=>{
setTitle(initialValues.title)
},[initialValues.title])

const onSubmit:FormEventHandler<HTMLFormElement> =(e,)=>{
 e.preventDefault();

mutate({
    id:initialValues.id,
    title,
})
.then(()=> {
    toast.success("Board Renamed")
   onClose();
})
.catch(()=>{
     toast.error("Failed to rename board") 
    
    })

}


    return(
    <Dialog open={isOpen} onOpenChange={onClose}  >
<DialogContent>
    <DialogHeader>
        <DialogTitle>
            Edit Board Title
        </DialogTitle>
    </DialogHeader>
    <DialogDescription>
        Enter a new title for this board
    </DialogDescription>
    <form onSubmit={onSubmit} className='space-y-4'  >
        <Input  disabled={pending} required maxLength={60}   value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder='Board Title'
           />
    <DialogFooter>
        <DialogClose asChild >
<Button type='button' variant={"outline"} >
    Cancel
</Button>
        </DialogClose>
        <Button disabled={pending } type='submit'  >
            Save
        </Button>
    </DialogFooter>
    </form>
</DialogContent>
    </Dialog>
  )
}
