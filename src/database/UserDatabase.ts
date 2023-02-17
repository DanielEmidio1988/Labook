import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public getAllUsers= async()=>{
        const userDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return userDB
    }

    public async signUp(newUser:UserDB){
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUser)
    }

    public async login(email: string, password: string){
        const [userDB]:UserDB[] | undefined = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email} && {password})

        return userDB
    }

}