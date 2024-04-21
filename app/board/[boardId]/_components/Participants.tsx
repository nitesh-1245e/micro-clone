'use client'



import React from 'react'
import { Skeleton } from '../../../../components/ui/skeleton'
import { useOthers,useSelf } from '../../../../liveblocks.config'
import { UserAvtar } from './UserAvtar'
import { connectionIdToColor } from '../../../../lib/utils'



const MAX_SHOWN_USERS = 2;

 const Participants = () => {

const users = useOthers();
const currentUser = useSelf();
const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className=' absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md   ' >
         <div className='flex gap-x-2' >
    {users.slice(0,MAX_SHOWN_USERS)
    .map(({connectionId,info})=>{
    return(
      <UserAvtar
      bordercolor={connectionIdToColor(connectionId)}
      key={connectionId}
      src={info?.picture}
      name={info?.name}
      fallback={info?.name?.[0] || "T" }
      />
    )
    })}


    {currentUser  && (
       <UserAvtar
       bordercolor={connectionIdToColor(currentUser.connectionId)}
       src={currentUser.info?.picture}
       name={`${currentUser.info?.name}(You)`}
       fallback={currentUser.info?.name?.[0]}
       />
    )}


    {hasMoreUsers && (
      <UserAvtar 
      // bordercolor={connectionIdToColor(hasMoreUsers.connectionId)}
      name={`${users.length - MAX_SHOWN_USERS} more`}
      fallback={`+${users.length - MAX_SHOWN_USERS}`}
      />
    ) }
         </div>
    </div>
  )
}


export  default Participants;


 export const ParticipantsSkeleton=()=>{
  return(
    <div className=' absolute h-12 top-2 right-2 bg-white w-[100px] rounded-md p-3 flex items-center shadow-md   ' >
         {/* <Skeleton className=' h-full w-full bg-muted-400  ' /> */}
    </div>
  )
}