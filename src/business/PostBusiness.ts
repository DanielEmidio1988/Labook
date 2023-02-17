import { db } from "../database/Knex"
import { PostDatabase } from "../database/PostDatabase"
import { PostDB } from "../types"
import { Post } from "../models/Post"
import { PostDTO, InsertInputPostDTO,UpdateInputDTO } from "../dtos/PostDTO"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private postDTO: PostDTO
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

    public insertNewPost = async(input:InsertInputPostDTO)=>{

        const {id,creator_id, content} = input

        const created_at = (new Date()).toISOString()
        const updated_at = (new Date()).toISOString()
        const likes = 0
        const dislikes = 0

        const newPost = new Post (
            id,
            content,
            likes,
            dislikes,
            created_at,
            updated_at,
            {id:creator_id,
            name: "",}
            )
        
        const newPostDB = newPost.toDBModel()
        await this.postDatabase.insertNewPost(newPostDB)

        const output = {
            message: "Publicação realizada com sucesso",
            post: newPost,
        }

        return output
    }

    public updatePost = async (input:UpdateInputDTO)=>{
        const {id,content} = input

        const filterPostToUpdate = await this.postDatabase.getPostById(id)

        if(!filterPostToUpdate){
            throw new Error("'Id' não localizada")
        }

        const updateAt = (new Date()).toISOString()

        const postToUpdate = new Post(
            id,
            content,
            filterPostToUpdate.likes,
            filterPostToUpdate.dislikes,
            filterPostToUpdate.created_at,
            updateAt,
            {
                id:filterPostToUpdate.creator_id,
                name: ""
            }
        )

        const postToUpdateDB = postToUpdate.toDBModel()
        await this.postDatabase.updatePost(postToUpdateDB,id)
    }


    public deletePost = async (id: string)=>{

        const filterPostToDelete = await this.postDatabase.getPostById(id)
    
        if(filterPostToDelete){
            await this.postDatabase.deletePostbyId(id)
        }else{
            throw new Error("Publicação não encontrada")
        }

    }
}