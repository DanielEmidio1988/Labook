import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";

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
            userDB.created_at,       
        )
        
        return user.toDBModel()
    })

        return users
    }

}