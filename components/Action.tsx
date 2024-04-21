'use client'


import React from 'react'
//@ts-ignore
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { UseApiMutation } from '../hooks/UseApiMutation';
import { api } from '../convex/_generated/api';
import { ConfirmModal } from './ConfirmModal';
import { Button } from './ui/button';
import { useRenameModal } from '../store/UseRenameModal';

interface ActionProps{
    children:React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
}



const Action = ({children,side,sideOffset,id,title}:ActionProps) => {

const {onOpen} = useRenameModal();


const {mutate,pending} = UseApiMutation(api.boards.remove)



const onCopyLink = ()=>{
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
    .then(()=> toast.success("Link Copied") )
    .catch(()=> toast.error("Failed to copied link"))
}


const OnDelete =()=>{
mutate({id})
.then(()=> toast.success("Board Delete") )
.catch(()=> toast.error("failed to delete board "))
}


  return (
    <div className='absolute z-50  top-1 right-1  ' >
         <DropdownMenu>
            <DropdownMenuTrigger asChild >
 {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e:any)=>e.stopPropagation()} side={side} sideOffset={sideOffset} className='w-60'  >
<DropdownMenuItem onClick={onCopyLink}  className='p-3 cursor-pointer ' >
    <Link2  className=' h-4 w-4 mr-2   '  />
    Copy Board Link
</DropdownMenuItem>
<DropdownMenuItem onClick={()=> onOpen(id,title)}  className='p-3 cursor-pointer ' >
    <Pencil  className=' h-4 w-4 mr-2   '  />
    Rename 
</DropdownMenuItem>
<ConfirmModal  header='Delete Board?'  description='This will delete the board and all of its content.'  disabled={pending}  onConfirm={OnDelete}   > 
<Button 
//  onClick={OnDelete} 
variant={'ghost'}
  className='  p-3 cursor-pointer text-sm w-full justify-start font-normal   ' >
    <Trash2  className=' h-4 w-4 mr-2   '  />
    Delete
</Button>
</ConfirmModal>
            </DropdownMenuContent>
         </DropdownMenu>
        </div>
  )
}

export default Action