import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { UserDB, TokenPayload } from "../types";
import { SignUpDTO, LoginDTO } from "../dtos/UserDTO";
import { ROLE_USER } from "../types";
import { BadRequestError } from "../errors/BadRequestError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
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
        const {name,email,password} = input

        const id = this.idGenerator.generate()
        
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

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }
        
        const token = this.tokenManager.createToken(tokenPayload)
        const newUserDB = newUser.toDBModel()
        await this.userDatabase.signUp(newUserDB)

        const output={
            message: "Usuário cadastrado com sucesso",
            token,
        }

        return output

    }

    public async login(input:LoginDTO ){
        const {email, password} = input

        if(typeof email !== "string"){        
            throw new BadRequestError("'E-mail' precisa ser uma string.")
        }

        if(password === undefined){            
            throw new BadRequestError("Favor, informar o 'password'")
        }

        const searchUserByLogin = await this.userDatabase.login(email,password)

        if(searchUserByLogin){

            const userLogin = new User(
                searchUserByLogin.id,
                searchUserByLogin.name,
                searchUserByLogin.email,
                searchUserByLogin.password,
                searchUserByLogin.role,
                searchUserByLogin.create_at,
            )

            const tokenPayload: TokenPayload = {
                id: userLogin.getId(),
                name: userLogin.getName(),
                role: userLogin.getRole()
            }
            
            const token = this.tokenManager.createToken(tokenPayload)

            const output = {message:"Login realizado com sucesso", token}
            return output
        }else{
            const output = {message:"Dados incorretos!"}
            return output
        }  

    }

}