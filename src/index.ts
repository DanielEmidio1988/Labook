import express, { Request, Response } from 'express';
import cors from 'cors'
import { UserController } from './controller/UserController';

//invocando a função express() dentro da variável app
const app = express();

app.use(express.json())
app.use(cors())

app.listen(3003,()=>{ 
    console.log(`Servidor iniciado na porta ${3003}`)})

const userController = new UserController()

app.get("/ping", (req:Request, res:Response)=>{
    res.status(201).send({message:"pong"})
})

app.get("/users", userController.getAllUsers)