'use client'


import React from 'react'
import Image from 'next/image'
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { cn } from '../../../../lib/utils';
import { Hints } from '../../../../components/Hints';


interface ItemProps{
    id:string;
    name:string;
    imageUrl:string;
}


const Item = ({id,name, imageUrl}:ItemProps) => {

const {organization} = useOrganization();
const {setActive} = useOrganizationList();


const isActive = organization?.id === id;

const onClick=()=>{
    if(isActive)return;
    //@ts-ignore
    setActive({organization:id})
}

function getUpperCaseName(name:string){
  return (
    name.length
    )
}


 

  return (
    <div className='aspect-square relative' >
        <Hints
        lable={name}
        side='right' align='start' sideOffset={15}
        >
<Image src={imageUrl} alt='name' onClick={onClick} fill   className={cn("rounded-md  cursor-pointer  opacity-75 hover:opacity-100  transition ", isActive && "opacity-100" )}  />
        </Hints>
    </div>
  )
}

export default Item