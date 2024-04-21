import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { Result } from "postcss";


export const UseApiMutation =(mutationFunction :any  )=>{

const [pending, setPending] = useState(false);

const apiMutation = useMutation(mutationFunction);

const mutate = (payload :any) =>{
    setPending(true);
return apiMutation(payload)
.finally(()=>setPending(false))
.then((result)=>{
    return result;
})
.catch((error)=>{
throw error
})
}
 return {
    mutate,
    pending,
 };

};