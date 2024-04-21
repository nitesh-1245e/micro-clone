'use client'


import React from 'react'
import Link from 'next/link';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '../../../../lib/utils';
import { Hints } from '../../../../components/Hints';
import { Button } from '../../../../components/ui/button';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
// import {Actio}
import Action from '../../../../components/Action';
import { useRenameModal } from '../../../../store/UseRenameModal';
import { Menu } from 'lucide-react';
 



interface InfoProps{
  boardId:string;
}


const font = Poppins({
  subsets:["latin"],
  weight:["600"],
})



export const TabSeprator=()=>{
  return (
    <div className='text-neutral-300  px-1.5  '  >
|
    </div>
  )
}





 const Info = ({boardId}:InfoProps) => {

  const {onOpen} = useRenameModal();

const data  = useQuery(api.board.get,{
  id: boardId as Id<"boards">,
})


if(!data)return <InfoSkeleton/>;





  return (
    <div className='absolute top-2 left-2 px-1.5 bg-white rounded-md h-12 flex items-center shadow-md'>
      <Hints lable='Go to boards' side='bottom' sideOffset={10}  > 
<Button asChild variant='board'  className='px-2'  >
  <Link href={'/'} >
 <Image src={"/images/logoipsum-289.svg"}  alt='logo' width={40} height={40} />
 <span className={cn("font-semibold text-xl ml-2 text-black ",
 font.className,
 )} >
  Board
 </span>
 </Link>
 </Button>
 </Hints>
 <TabSeprator/>
 <Hints lable='Edit title' side='bottom' sideOffset={10} > 
 <Button  onClick={()=>onOpen(data?._id,data?.title)}  variant='board' className='text-base font-normal px-2  ' >
{data.title}
 </Button>
 </Hints>
  <TabSeprator/>
  <TabSeprator/>
  <TabSeprator/>

 <Action 
 id={data._id}
 title={data.title}
side='bottom'
sideOffset={10}>
  <div>
    <Hints lable='Main menu' side='bottom' sideOffset={10} >
<Button size='icon' variant='board' >
  <Menu/>
</Button>
    </Hints>
  </div>
</Action>
    </div>
  );
};


export default Info;

 export const InfoSkeleton=()=>{
  return(
    <div className=' absolute top-2 left-2 px-1.5 w-[300px] bg-white rounded-md h-12 flex items-center shadow-md'>
      {/* <Skeleton className=' h-full w-full bg-muted-400  ' /> */}
    </div>     
  );
};
