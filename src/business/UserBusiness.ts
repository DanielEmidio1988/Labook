import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";
import { SignUpDTO, LoginDTO } from "../dtos/UserDTO";
import { ROLE_USER } from "../types";
import { BadRequestError } from "../errors/BadRequestError";

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase
    ){}
    public async getAllUsers(){
        
        const usersDB = await this.userDatabase.getAllUsers()
        
        const users = 
        usersDB.map((userDB)=>{ 
            const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.create_at,       
        )
        
        return user.toDBModel()
    })

        return users
    }

    public async signUp(input: SignUpDTO){
        const {id,name,email,password} = input

        const created_at = (new Date()).toISOString()

        if(typeof name !== "string"){
            throw new BadRequestError("'Name' precisa ser uma string.")
        }

        if(typeof email !== "string"){
            throw new BadRequestError("'E-mail' precisa ser uma string.")
        }

        if(typeof password !== "string"){
            throw new BadRequestError("'Password' precisa ser uma string.")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            ROLE_USER.NORMAL,
            created_at,
        )

        const newUserDB = newUser.toDBModel()
        await this.userDatabase.signUp(newUserDB)

        const output={
            message: "Usuário cadastrado com sucesso",
            data: newUserDB
        }

        return output

    }

    public async login(input:LoginDTO ){
        const {email, password} = input

        const searchUserByLogin = await this.userDatabase.login(email,password)

        if(typeof email !== "string"){        
            throw new BadRequestError("'E-mail' precisa ser uma string.")
        }

        if(password === undefined){            
            throw new BadRequestError("Favor, informar o 'password'")
        }

        if(searchUserByLogin){
            const output = {message:"Login realizado com sucesso", data:searchUserByLogin}
            return output
        }else{
            const output = {message:"Dados incorretos!", data:searchUserByLogin}
            return output
        }

        

    }

}