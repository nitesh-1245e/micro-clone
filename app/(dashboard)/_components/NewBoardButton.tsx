"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { Plus } from "lucide-react";
// import { useMutation } from 'convex/react';
import { UseApiMutation } from "../../../hooks/UseApiMutation";
import { api } from "../../../convex/_generated/api";
import { title } from "process";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  // const create = useMutation(api.board.create);
const router = useRouter();
  const { mutate, pending } = UseApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board Created");
 router.push(`/board/${id}`)
        // TODO :Redirect to board {id} 

      })
      .catch(() => toast.error("Failed to create"));
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        " col-span-1 aspect=[100/127] bg-blue-500 rounded-lg hover:bg-blue-700 flex flex-col   items-center justify-center py-6  ",
        (pending || disabled) && "opacity-75 hover:bg-blue-600  cursor-not-allowed "
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1 " />
      <p className="text-sm text-white font-light   ">New Board</p>
    </button>
  );
};

export default NewBoardButton;
