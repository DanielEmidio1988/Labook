import express, { Request, Response } from 'express';
import cors from 'cors'
import { UserController } from './controller/UserController';
import { db } from './database/Knex';
import { UserDB } from './types';
import { postRouter } from './routes/postRouter';

//invocando a função express() dentro da variável app
const app = express();

app.use(express.json())
app.use(cors())

app.listen(3003,()=>{ 
    console.log(`Servidor iniciado na porta ${3003}`)})

const userController = new UserController()

app.use("/posts", postRouter)

app.get("/ping", (req:Request, res:Response)=>{
    res.status(201).send({message:"pong"})
})

//Rota de teste para buscar clientes
// app.get("/users", userController.getAllUsers)

app.get("/users", async (req:Request, res: Response)=>{
    try {
        
        const result = await db("users")
        res.status(201).send(result)
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
})

// Daniel: endpoint para cadastro de usuário
app.post("/signup", async(req:Request, res:Response)=>{
    try {
        const {id, name, email, password, role, create_at} = req.body

        if(name !== undefined){
            if(typeof name !== "string"){
                throw new Error("'Name' precisa ser uma string.")
            }
        }else{
                throw new Error("Usuário precisa ter uma 'Name'.")
        }

        if(email !== undefined){
            if(typeof email !== "string"){
                throw new Error("'E-mail' precisa ser uma string.")
            }
        }else{
                throw new Error("Usuário precisa ter um 'e-mail'.")
        }

        if(password !== undefined){
            if(typeof password !== "string"){
                throw new Error("'Password' precisa ser uma string.")
            }
        }else{
                throw new Error("Usuário precisa ter uma 'Password'.")
        }

        const [searchUserByEmail] = await db("users").where({email})

        if(searchUserByEmail){
            res.status(400)
            throw new Error("E-mail já cadastrado na base de dados")
        }

        const newUser:UserDB={
            id,
            name,
            email,
            password,
            role,
            // create_at
        }
        
        await db("users").insert(newUser)
        res.status(201).send("Usuário cadastrado com sucesso!")
        
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
})

//Daniel: endpoint para login de usuario
app.post("/login", async(req:Request, res:Response)=>{
    try {

        const {email, password} = req.body

        if(email !== undefined){
            if(typeof email !== "string"){
                res.status(400)
                throw new Error("'E-mail' precisa ser uma string.")
            }
        }else{
            res.status(400)
            throw new Error("Favor, informar o 'e-mail'")
        }

        if(password === undefined){
            res.status(400)
            throw new Error("Favor, informar o 'password'")
        }

        const [searchUserByLogin] = await db("users").where({email: email, password:password})

        if(searchUserByLogin){
            res.status(201).send("Login realizado com sucesso")
        }else{
            res.status(400)
            throw new Error("Login ou usuário incorreto.")
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
})