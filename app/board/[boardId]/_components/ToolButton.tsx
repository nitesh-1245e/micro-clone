'use client'



import React from 'react'
import { LucideIcon } from 'lucide-react';
import { Hints } from '../../../../components/Hints';
import { Button } from '../../../../components/ui/button';


interface ToolButtonProps{
    lable:string;
    icon:LucideIcon;
    onClick:()=> void;
    isActive?:boolean;
    isDisabled?:boolean;
}



export const ToolButton = ({lable,icon:Icon,onClick,isActive,isDisabled}:ToolButtonProps) => {
  return (
    <Hints lable={lable} side='right' sideOffset={14} >
<Button disabled={isDisabled} onClick={onClick} size="icon" variant={isActive ? 'boardActive' : 'board' } >
    <Icon/>
</Button>
    </Hints>
  )
}
