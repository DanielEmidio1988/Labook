import { PostDB } from "../types"
import { db } from "../database/Knex"
import { Request,Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO } from "../dtos/PostDTO"


export class PostController{
    constructor(
        private postBusiness: PostBusiness,
        private postDTO: PostDTO
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
      
        const id = req.body.id
        const creator_id = req.body.creator_id 
        const content = req.body.content

            const input = this.postDTO.insertInputPost(id, creator_id, content)

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
            
        const id = req.params.id
        const content = req.body.content

        const input = await this.postDTO.updateInputPost(id,content)

        const output = await this.postBusiness.updatePost(input)

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

    public deletePost = async (req:Request, res: Response)=>{
        try {
            const id = req.params.id

            const output = await this.postBusiness.deletePost(id)

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

    public likeDislike = async (req:Request, res: Response)=>{
        try {

            const input = {
                id: req.params.id,
                like: req.body.like}

            const output = await this.postBusiness.likeDislike(input)

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
}