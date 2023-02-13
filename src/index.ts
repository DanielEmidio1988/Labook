import express, { Request, Response } from 'express';
import cors from 'cors'
import { UserController } from './controller/UserController';
import { db } from './database/Knex';
import { PostbyUsersDB, PostDB, UserDB } from './types';

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

//Daniel: endpoint para buscar todos os posts
app.get("/posts", async(req:Request, res:Response)=>{
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
})

//Daniel: endpoint para inserir novos posts
app.post("/posts", async(req:Request, res:Response)=>{
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
})


app.put("/posts/:id", async (req:Request, res: Response)=>{
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
})

app.delete("/posts/:id", async (req:Request, res: Response)=>{
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
})