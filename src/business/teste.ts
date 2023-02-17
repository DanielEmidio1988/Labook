import { db } from "../database/Knex"
import { PostDatabase } from "../database/PostDatabase"
import { PostDB } from "../types"
import { Post } from "../models/Post"

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
            const post = new Post (
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                getCreator(postDB.creator_id)
                )

                return post.toBusinessModel()
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

        // const post = new Post(

        // )
        // await this.postDatabase.insertNewPost()

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
    //     const post = new Post (
    //         id,
    //         content,
    //         likes,
    //         dislikes,
    //         created_at,
    //         updated_at,
    //         creator_id,
    //         )

    //         // return post.toDBModel()
    
    

    // await db("posts").insert(newPost)

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