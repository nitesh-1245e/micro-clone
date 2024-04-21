import React from 'react'
import { Star } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { toast } from 'sonner';
import { Button } from '../../../../components/ui/button';



interface FooterProps {
    title:string;
    authorLabel:string;
    creatAtLabel:string;
    isFavourite:boolean;
    onClick:()=> void;
    disabled:boolean
}

const Footer = ({
    title,authorLabel,creatAtLabel,isFavourite,onClick,disabled
}:FooterProps) => {

    const handleClick =( event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      event.stopPropagation();
      event.preventDefault();  
       onClick()
    }



  return (
    
<div  className=' relative bg-white p-3    ' >
<p  className=' text-[13px] truncate max-w-[calc(100%-20px)]  ' >
{title}
</p>
<p className=' opacity-0 group-hover:opacity-100   transition-opacity  text-[10px] text-muted-foreground truncate   ' >
  {authorLabel},{creatAtLabel}  
</p>
<Button 
variant={"plane"}
 disabled={disabled}
 onClick={handleClick}
 className={cn('opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground   hover:text-blue-500 ', disabled &&  "cursor-not-allowed opacity-75  ")}>
    <Star
    className={cn(" h-4 w-4", isFavourite && "fill-blue-500  text-blue-500  "  )}
    />
</Button>
</div>

  )
}

export default Footer;



 