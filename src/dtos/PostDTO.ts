    export interface InsertInputPostDTO{
        content: string,
        creator_id: string,
        id: string,
    }

    export interface UpdateInputDTO{
        content: string,
        id: string,
    }

    export interface LikeDislikeDTO{
        id: string,
        like: number,
    }

   export class PostDTO {
    insertInputPost = (id: string, creator_id:string, content: string) :InsertInputPostDTO =>{

        const result: InsertInputPostDTO={
            content,
            creator_id,
            id,
        }

        return result
    }

    updateInputPost = (id: string, content: string): UpdateInputDTO =>{

        const result:UpdateInputDTO={
            id,
            content,
        }

        return result
    }

    likeDislike = (id:string,like:number):LikeDislikeDTO=>{
        const result:LikeDislikeDTO={
            id,
            like,
        }

        return result
    }

    
   } 