'use client'

import React from 'react'
import { Plus } from 'lucide-react';
import { CreateOrganization } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTrigger } from '../../../../components/ui/dialog';
import { Hints } from '../../../../components/Hints';


const NewButton = () => {
  return (
    <Dialog>
        <DialogTrigger>
            <div className='aspect-square' >
                <Hints lable="Create Organization" side='right' align='start' sideOffset={15}  > 
<button className='bg-white/25  h-full w-full rounded-md  flex items-center justify-center opacity-60  hover:opacity-100  transition    ' >
 <Plus className='text-white' />
</button>
</Hints>
            </div>
        </DialogTrigger>
<DialogContent  className='p-0  bg-transparent  border-none max-w-[480px]  ' >
    <CreateOrganization/>
</DialogContent>
    </Dialog>
  )
}

export default NewButton