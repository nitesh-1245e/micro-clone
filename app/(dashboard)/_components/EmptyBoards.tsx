'use client'



import Image from 'next/image'
import React from 'react'
import { Button } from '../../../components/ui/button'
import { api } from '../../../convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { time } from 'console';
import { title } from 'process';
import { UseApiMutation } from '../../../hooks/UseApiMutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const EmptyBoards = () => {
const router = useRouter();
const {organization} = useOrganization();
const {mutate,pending} = UseApiMutation(api.board.create);


const  onClick  = ()=>{

    if(!organization)return;


    mutate({
        orgId:organization.id,
        title:"Untitled",
    })
    .then((id)=>{
        toast.success("Board Created")
        router.push(`/board/${id}`);
        // TODO :Redirect to board {id} 
    })
    .catch(()=>toast.error('Failed to create board'))
};



  return (
    <div className='h-full  flex flex-col items-center justify-center  ' >
    <Image src={'/images/saly-26.png'} alt='empty'  height={140} width={140}  />    
        <h2 className=' text-2xl font-semibold mt-6  ' >
 Create your first board!
        </h2>
        <p className='text-muted-foreground text-sm  mt-2  ' >
         Start by creating  a board for your organization 
        </p>
        <div className=' mt-6' >
            <Button  disabled={pending} onClick={onClick} size={'lg'} >
                Create Board
            </Button>
        </div>
    </div>
  )
}

export default EmptyBoards

function then(arg0: (id: any) => void) {
    throw new Error('Function not implemented.');
}
