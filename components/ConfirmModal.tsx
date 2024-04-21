'use clinet'



import React from 'react'
import { 
    AlertDialog,
    AlertDialogAction, 
    AlertDialogCancel,  
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogTitle,
} from "../src/components/ui/alert-dialog"


interface ConfirmModalProps{
    children:React.ReactNode;
    onConfirm: ()=>void;
    disabled:boolean;
    header:string;
    description?: string;
}





export const ConfirmModal = ({
children,
onConfirm,
disabled,
description,
header
}:ConfirmModalProps) => {

const handleConfirm = ()=>{
    onConfirm();
}


  return (
    <AlertDialog>
        <AlertDialogTrigger>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {header}
                </AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                disabled={disabled}
                onClick={handleConfirm}
                >
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
