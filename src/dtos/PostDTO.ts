    import { Post } from "../models/Post";

    export interface InsertInputPostDTO{
        content: string,
        creator_id: string,
        id: string,
    }

    export interface UpdateInputDTO{
        content: string,
        id: string,
    }

   export class PostDTO {
    insertInputPost = (id: string, creator_id:string, content: string) :InsertInputPostDTO =>{
        if (content !== undefined){
            if(typeof content !== "string"){
                throw new Error("'content' precisa ser uma string")
            }
        }else{
            throw new Error("Favor, informar o 'content'")
        }
        const result: InsertInputPostDTO={
            content,
            creator_id,
            id,
        }

        return result
    }

    updateInputPost = (id: string, content: string): UpdateInputDTO =>{
        if (content !== undefined){
            if(typeof content !== "string"){
                throw new Error("'content' precisa ser uma string")
            }
        }else{
            throw new Error("Favor, informar o 'content'")
        }

        const result:UpdateInputDTO={
            id,
            content,
        }

        return result
    }
   } 