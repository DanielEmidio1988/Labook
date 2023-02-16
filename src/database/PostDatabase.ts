import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase{
    public static POSTS_TABLE = "posts"

    public getAllPosts = async () => {
        const postDB = await BaseDatabase
        .connection(PostDatabase.POSTS_TABLE)
        .select()

        return postDB
    }

    public getPostsWithCreator = async()=>{
        const postsDB = await this.getAllPosts()
        const creatorsDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return{
            postsDB,
            creatorsDB,
        }
    }
}