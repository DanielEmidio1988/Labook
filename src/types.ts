export interface UserDB{
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    // create_at: string,
}

export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    // likes: number,
    // dislikes: number,
    // created_at: string,
    // updated_at: string,
}

export interface PostbyUsersDB{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: UserDB[]
}

export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number,
}