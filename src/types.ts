export interface userDB{
    id: string,
    name: string,
    password: string,
    role: string,
    create_at: string,
}

export interface postDBB{
    id: string,
    create_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface likeDislikeDB{
    user_id: string,
    post_id: string,
    like: number,
}