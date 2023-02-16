import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async getAllUsers(){
        const userDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        // const userDB = result

        return userDB
    }

    public async signUp(newUser:UserDB){
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUser)
    }

    public async login(email: string, password: string){
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where({email} && {password})
        const userDB = result

        return userDB
    }

}