import React from 'react'
import Canvas from './_components/Canvas'
import { Room } from '../../../components/Room';
 
// import Loading from '../../../components/auth/Loading';
import Loading from './_components/Loading'
import { useSelf } from '../../../liveblocks.config';


interface BoardIdPageProps{
    params:{
        boardId:string;
    }
}





const BoardIdPage = ({params}:BoardIdPageProps) => {
 
//     const info = useSelf((me)=>me.info);

// console.log("info",info)

  return (
  <Room roomId={params.boardId} fallback={<Loading/>} >
      <Canvas boardId={params.boardId}  />
       
  </Room>
  
  )
}

export default BoardIdPage