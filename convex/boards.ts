import {v} from 'convex/values';
import { mutation, query } from './_generated/server';
import {getAllOrThrow} from 'convex-helpers/server/relationships'
import { error } from 'console';
import { favourite } from './board';


export const  get = query({
    args:{
        orgId:v.string(),
        search:v.optional(v.string()),
        favourites:v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        if(args.favourites){
                const favouriteBoards = await ctx.db
                    .query("userFavourite")
                    .withIndex("by_user_org", (q) =>
                        q
                            .eq("userId", identity.subject)
                            .eq("orgId", args.orgId)
                    )   
                    .order("desc")
                    .collect();
        
                const ids = favouriteBoards.map((b) => b.boardId);
                //@ts-expect-error
                const boards = await getAllOrThrow(ctx.db, ids);
        
                return boards.map((board) => ({
                    ...board,
                    isFavourite: true
                }));
        
        }
        


  

        const title = args.search as string;
        let boards: any[] = [];
 
         if (title){
          boards =  await ctx.db
          .query("boards")
          .withSearchIndex("search_title", (q)=>
            q
               .search("title",title)
               .eq("orgId",args.orgId)   
          )
          .collect()
         }else{
            boards = await ctx.db
            .query("boards")
            .withIndex("by_org",(q)=>q.eq("orgId",args.orgId))
            .order("desc")
            .collect();            
         }
         

const boardsWithFavouriteRelation = boards.map((board)=>{

return ctx.db 
.query("userFavourite")
.withIndex("by_user_board", (q)=>
 q
   .eq("userId",identity.subject)
   .eq("boardId", board._id)
)
.unique()
.then((favourite)=>{
    return{
        ...board,
        isFavourite : !!favourite,
    };
});
});

const boardsWithFavouriteBoolean = Promise.all(boardsWithFavouriteRelation)

return boardsWithFavouriteBoolean;

    }
    
})




export const remove = mutation({
    args :{id:v.id("boards")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error('Unauthorized');
        }

const userId = identity.subject;

const existingFavourite = await ctx.db 
.query("userFavourite")
.withIndex("by_user_board", (q)=>  
q 
  .eq("userId",userId)
  .eq("boardId",args.id)

)

.unique();

if(existingFavourite){
await ctx.db.delete(existingFavourite._id)
}


        await ctx.db.delete(args.id)

    }
})




 export const update = mutation({
    args:{id:v.id("boards"),title:v.string() },
    handler :async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error('Unauthorized');
        }


        const title = args.title.trim()
        
        if(!title){
throw new Error("Title is required");
        }


        if(title.length > 60){
            throw new Error("Title cannot be longer than 60 characters ")
        }

const board =  await ctx.db.patch(args.id,{
    title:args.title,
});

return board;

    },
     
 });
