import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { UserDTO } from "../dtos/UserDTO";

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase), 
    new UserDTO)

//Daniel: endpoint para buscar todos os clientes cadastrados (rota teste)
userRouter.get("/", userController.getAllUsers)

//Daniel: endpoint para cadastro de novos 
userRouter.post("/signup", userController.signUp)

//Daniel: endpoint para login de usuário
userRouter.post("/login", userController.login)
