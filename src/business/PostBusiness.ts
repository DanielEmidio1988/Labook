import { db } from "../database/Knex"
import { PostDatabase } from "../database/PostDatabase"
import { PostDB } from "../types"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase
    ){}

    public getPosts = async ()=>{
               
        const {
            postsDB,
            creatorsDB,
        } = await this.postDatabase.getPostsWithCreator()

        const posts = postsDB.map((postDB)=>{
            return {
                id: postDB.id,
                content: postDB.content,
                likes: postDB.likes,
                dislikes: postDB.dislikes,
                createdAt: postDB.created_at,
                updatedAt: postDB.updated_at,
                creator: getCreator(postDB.creator_id)
            }
        })

        function getCreator(creatorId: string){
            const creator = creatorsDB.find((creatorDB)=>{
                return creatorDB.id === creatorId
            })

            return{
                id: creator.id,
                name: creator.name
            }
        }

        return posts  
    }

    public insertNewPost = async(input:PostDB)=>{

        const {id,creator_id, content} = input

        if (content !== undefined){
            if(typeof content !== "string"){
                throw new Error("'content' precisa ser uma string")
            }
        }else{
            throw new Error("Favor, informar o 'content'")
        }

        const newPost:PostDB ={
            id,
            creator_id,
            content,
        }

        await db("posts").insert(newPost)

        const output = {
            message: "Publicação realizada com sucesso",
            post: newPost,
        }

        return output
    }

    // public updatePost = async (input: any)=>{

    //     if (newContent !== undefined){
    //         if(typeof newContent !== "string"){
    //             throw new Error("'content' precisa ser uma string")
    //         }
    //     }else{
    //         throw new Error("Favor, informar o 'content'")
    //     }

    //     const [filterPost]:PostDB[] = await db("posts").where({id:id})

    //     if(filterPost){
    //         const updatePost:PostDB={
    //             content: newContent || filterPost.content,
    //             creator_id: filterPost.creator_id,
    //             id: filterPost.id,
    //         }

    //         await db("posts").update(updatePost).where({id:id})
    // }
}