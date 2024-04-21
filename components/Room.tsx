'use client'



import React from 'react'
import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "../liveblocks.config";
import { Didact_Gothic } from 'next/font/google';
import { Divide } from 'lucide-react';
import { LiveMap, LiveList, LiveObject } from '@liveblocks/client';
import { Layer } from '../types/canvas'; 

interface RoomProps{
    children:ReactNode;
    roomId:string;
    fallback:NonNullable<React.ReactNode> | null;
}


export const Room = ({children, roomId,fallback }: RoomProps ) => {
  return (
      <RoomProvider id={roomId} initialPresence={{
        cursor:null,
         selection:[],
        pencilDraft:null,
        penColor:null,
        }}
       initialStorage={{layers:new LiveMap<string, LiveObject<Layer>>(), 
       layerIds:new LiveList
       }}  >

<ClientSideSuspense fallback={fallback}  >
    {()=> children }
</ClientSideSuspense>
      </RoomProvider>
  )
}
