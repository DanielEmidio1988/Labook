import express from 'express';
import cors from 'cors'
import { postRouter } from './routes/postRouter';
import { userRouter } from './routes/userRouter';

//invocando a função express() dentro da variável app
const app = express();

app.use(express.json())
app.use(cors())

app.listen(3003,()=>{ 
    console.log(`Servidor iniciado na porta ${3003}`)})

app.use("/posts", postRouter)
app.use("/users", userRouter)