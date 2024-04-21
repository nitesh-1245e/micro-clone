import React from 'react'
import { Hints } from '../../../../components/Hints';
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar';


interface UserAvtarProps{
    src?:string;
    name?:string;
    fallback?:string;
    bordercolor?:string;
}


export const UserAvtar = ({src,name,fallback,bordercolor}:UserAvtarProps) => {
  return (
   <Hints lable={name || "Teammate"} side='bottom' sideOffset={18} >
<Avatar className='h-8 w-8 border-2' style={{ borderColor:bordercolor }} >
<AvatarImage src={src}  />
<AvatarFallback className='text-sm font-semibold ' >
    {fallback}
</AvatarFallback>
</Avatar>
   </Hints>
  )
}
