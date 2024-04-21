"use client";

import React from "react";
import { EmptySearch } from "./EmptySearch";
import EmptyFavourite from "./EmptyFavourite";
import EmptyBoards from "./EmptyBoards";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import BoardCard from "./BoardCard";
import NewBoardButton from "./NewBoardButton";
import NewButton from "./sidebar/NewButton";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
   
}

const BoardList = ({ orgId, query }: BoardListProps) => {



  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
      <h2 className="text-3xl  ">
        {query.favourites ? " Favourite Boards " : "Team Boards  "}
      </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4   xl:grid-cols-5   2xl:grid-cols-6   gap-5 mt-8 pb-10   ">
        <NewBoardButton orgId={orgId} disabled/>
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
      </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <div>
        <EmptySearch />
      </div>
    );
  }

  if (!data?.length && query.favourites) {
    return (
      <div>
        <EmptyFavourite />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div>
        <EmptyBoards />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl  ">
        {query.favourites ? " Favourite Boards " : "Team Boards  "}
      </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4   xl:grid-cols-5   2xl:grid-cols-6   gap-5 mt-8 pb-10   ">
        <NewBoardButton orgId={orgId} />

        {data.map((boards) => (
          <BoardCard
            key={boards._id}
            id={boards._id}
            title={boards.title}
            imageUrl={boards.imageUrl}
            authorId={boards.authorId}
            authorName={boards.authorName}
            createdAt={boards._creationTime}
            orgId={boards.orgId}
            isFavourite={boards.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
