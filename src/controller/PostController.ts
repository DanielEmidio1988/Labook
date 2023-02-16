import { PostDB } from "../types"
import { db } from "../database/Knex"
import { Request,Response } from "express"
import { PostBusiness } from "../business/PostBusiness"

export class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}

    public getPosts = async(req:Request, res:Response)=>{
        try {

            const output = await this.postBusiness.getPosts()

            res.status(201).send(output)   
                      
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

            const input: PostDB = {
                id: req.body.id,
                creator_id: req.body.creator_id,
                content: req.body.content,
            }

            const output = await this.postBusiness.insertNewPost(input)
            
            res.status(200).send(output)
    
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

            // const input ={
            //     id: req.params.id,
            //     content: req.body.content

            // }

            // const output = await this.postBusiness.insertNewPost(input)

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