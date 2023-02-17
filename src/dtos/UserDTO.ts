export interface SignUpDTO{
    id: string, 
    name:string, 
    email:string, 
    password: string, 
}

export interface LoginDTO{
    email: string,
    password: string,
}

export class UserDTO{
    signUp = (id:string,name:string,email:string,password:string):SignUpDTO=>{

            const result:SignUpDTO ={
                id,
                name,
                email,
                password,                
            } 

            return result
    }

    login = (email:string,password:string):LoginDTO=>{

        const result:LoginDTO={
            email,
            password
        }

        return result
    }
}