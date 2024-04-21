'use client'

import React from 'react'
import {formatDistanceToNow} from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import OverLay from './OverLay';
import { useAuth } from '@clerk/nextjs';
import { Skeleton } from '../../../../components/ui/skeleton';
import Footer from './Footer';
import { MoreHorizontal } from 'lucide-react';
import Action from '../../../../components/Action';
import { UseApiMutation } from '../../../../hooks/UseApiMutation';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { Id } from '../../../../convex/_generated/dataModel';


interface BoardCardProps{
    id:string;
    title:string;
    authorName:string;
    authorId:string;
    imageUrl:string;
    createdAt:number
    orgId:string;
    isFavourite: boolean
}


const BoardCard = ({
id,title,authorName,authorId,imageUrl,createdAt,orgId,isFavourite
}:BoardCardProps) => {

const {userId} = useAuth();

const authorLabel = userId === authorId ? "You": authorName;
 
const creatAtLabel = formatDistanceToNow(createdAt,{
    addSuffix : true, 
});


// const handleFavourite = useMutation(api.board.favourite)
// const handleUnfavourite = useMutation(api.board.unfavourite)

const {
    mutate: onFavourite,
    pending: pendingFavourite,
  } = UseApiMutation(api.board.favourite);

  const {
    mutate: onUnfavourite,
    pending: pendingUnfavourite,
  } = UseApiMutation(api.board.unfavourite);

  const toggleFavourite = () => {
    if(isFavourite) {
      onUnfavourite({ id })
         
        .catch(() => toast.error("Failed to unfavourite"));
    } else {
      onFavourite({ id , orgId })
        
        .catch(() => toast.error("Failed to favourite"));
    }
  };



  return (
    <div>
<Link href={`/board/${id}`} >
     <div className='group aspect-[100/127] border rounded-lg flex flex-col  justify-between overflow-hidden   ' >
   <div className='relative  flex-1 bg-amber-100  ' >
<Image src={imageUrl}  alt='Doodle' fill className='object-fit'  />
<OverLay/>
<Action id={id} title={title} side='right' > 
<button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 pb-3 pt-1 outline-none  ' >
   <MoreHorizontal className=' text-white opacity-75 hover:opacity-100 transition-opacity   '  />
</button>
</Action>
   </div>
   <Footer
          isFavourite={isFavourite}
          title={title}
          authorLabel={authorLabel}
          creatAtLabel={creatAtLabel}
          onClick={toggleFavourite}
          disabled={pendingFavourite || pendingUnfavourite}
        />
     </div>
</Link>
    </div>
  )
}

export default BoardCard

BoardCard.Skeleton = function BoardCardSkeleton(){
    return(
     <div className='aspect-[100/127] rounded-lg overflow-hidden   ' >
<Skeleton className='h-full w-full ' />
     </div>
    )
}