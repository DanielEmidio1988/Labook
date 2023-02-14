import { PostbyUsersDB, PostDB } from "../types"
import { db } from "../database/Knex"
import { Request,Response } from "express"

export class PostController{
    constructor(){}

    public getPosts = async(req:Request, res:Response)=>{
        try {
            const getAllPosts = await db.select("posts.id","posts.content","posts.likes","posts.dislikes","posts.created_at AS createdAt","posts.updated_at AS updatedAt").from("posts")
    
            const postsbyUser:PostbyUsersDB[] = [...getAllPosts]
    
            res.status(201).send(postsbyUser)
            
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    public insertNewPost = async(req:Request, res:Response)=>{
        try {
            const {id, creator_id, content} = req.body
    
            if (content !== undefined){
                if(typeof content !== "string"){
                    res.status(400)
                    throw new Error("'content' precisa ser uma string")
                }
            }else{
                res.status(400)
                throw new Error("Favor, informar o 'content'")
            }
    
            const newPost:PostDB ={
                id,
                creator_id,
                content,
            }
    
            await db("posts").insert(newPost)
            res.status(200).send({message:"Publicação realizada com sucesso!", post: newPost})
    
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    public updatePost = async (req:Request, res: Response)=>{
        try {
            const id = req.params.id
            const newContent = req.body.content
    
            if (newContent !== undefined){
                if(typeof newContent !== "string"){
                    res.status(400)
                    throw new Error("'content' precisa ser uma string")
                }
            }else{
                res.status(400)
                throw new Error("Favor, informar o 'content'")
            }
    
            const [filterPost]:PostDB[] = await db("posts").where({id:id})
    
            if(filterPost){
                const updatePost:PostDB={
                    content: newContent || filterPost.content,
                    creator_id: filterPost.creator_id,
                    id: filterPost.id,
                }
    
                await db("posts").update(updatePost).where({id:id})
                res.status(200).send({message: "Publicação atualizada com sucesso!", post: updatePost.content})
            }else{
                res.status(400)
                throw new Error("Publicação não encontrada")
            }
           
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }    
        }
    }

    public deletePost = async (req:Request, res: Response)=>{
        try {
            const id = req.params.id
    
            const [filterPostToDelete]:PostDB[] = await db("posts").where({id})
    
            if(filterPostToDelete){
                await db("posts").del().where({id:id})
                res.status(200).send({message:"Publicação excluida com sucesso!", post: filterPostToDelete})
            }else{
                res.status(400)
                throw new Error("Publicação não encontrada")
            }
    
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }   
        }
    }
}