'use client'

import React from 'react'
import { useOrganizationList } from '@clerk/nextjs';
import Item from './Item';
 


 const List = () => {

    const {userMemberships} = useOrganizationList({
       userMemberships:{infinite:true,},
    });


    if(!userMemberships.data?.length) return null ;

   return (
    <ul className='space-y-4'>
    {userMemberships.data.map((mem) => (
    //   <p key={mem.organization.id}>
    //     {mem.organization.name}
    //   </p>
    <Item
    key={mem.organization.id}
    id={mem.organization.id}
    name={mem.organization.name}
    imageUrl={mem.organization.imageUrl}
    />
    ))}
  </ul>  
   )
 }
 
 export default List