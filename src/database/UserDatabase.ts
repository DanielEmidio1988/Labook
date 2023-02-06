import { BaseDatabase } from "./BaseDatabase";
import { userDB } from "../types";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsers(){
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        const userDB = result

        return userDB
    }

}