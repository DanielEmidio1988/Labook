import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { PostDTO } from "../dtos/PostDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router()

const postController = new PostController(

    new PostBusiness(
        new PostDatabase(),
        new PostDTO(),
        new IdGenerator(),
        new TokenManager()      
    ),
    new PostDTO())

//Daniel: endpoint para buscar todos os posts
postRouter.get("/", postController.getPosts)

//Daniel: endpoint para inserir novo post
postRouter.post("/", postController.insertNewPost)

//Daniel: endpoint para atualizar um post
postRouter.put("/:id", postController.updatePost)

//Daniel: endpoint para deletar post
postRouter.delete("/:id", postController.deletePost)

//Daniel: endpoint like/dislike
postRouter.put("/:id/like", postController.likeDislike)