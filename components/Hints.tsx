'use client '

import React from "react";
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "./ui/tooltip";


export interface HintsProps{
lable:string;
children:React.ReactNode;
side?:"top"| "bottom" | "left" | "right";
align?: "start" | "center" | "end";
sideOffset?: number;
alignOffset?:number;
}


export const Hints =(
    {
        lable, 
children,
side,
align,
sideOffset, 
alignOffset 
    }:HintsProps
)=>{
return(
    <TooltipProvider>
        <Tooltip delayDuration={100} >
 <TooltipTrigger asChild >
    {children}
 </TooltipTrigger>
 <TooltipContent className=" text-white  bg-black border-black   " 
  side={side} 
 align={align}
 sideOffset={sideOffset}
 alignOffset={alignOffset}
 >
    <p className=" font-semibold capitalize  ">
{lable}
    </p>
 </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)
}