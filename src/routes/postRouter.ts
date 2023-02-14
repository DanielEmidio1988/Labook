import express from "express";
import { PostController } from "../controller/PostController";
// import { db } from "../database/Knex";
// import { UserDB, PostbyUsersDB, PostDB } from "../types";

export const postRouter = express.Router()
const postController = new PostController()

//Daniel: endpoint para buscar todos os posts
postRouter.get("/", postController.getPosts)

//Daniel: endpoint para inserir novo post
postRouter.post("/", postController.insertNewPost)

//Daniel: endpoint para atualizar um post
postRouter.put("/:id", postController.updatePost)

//Daniel: endpoint para deletar post
postRouter.delete("/:id", postController.deletePost)