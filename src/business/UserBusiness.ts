import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";

export class UserBusiness{
    public async getAllUsers(){
        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers()
        
        const users:User[]= usersDB.map((userDB)=> new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.created_at
        ))

        return users
    }

}