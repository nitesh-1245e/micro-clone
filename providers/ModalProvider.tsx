'use client'



import { useState,useEffect } from "react";
import { RenameModals } from "../components/modals/RenameModals";



export const ModalProvider = ()=>{

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
setIsMounted(true);
    },[]);


if(!isMounted){
    return null;
}


return(
    <>
    <RenameModals/>
    </>
)
}