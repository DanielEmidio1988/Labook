import { UserDB } from "../types"
export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string,
        private createAt: string,
    ){}
    
    public toDBModel():UserDB{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            create_at: this.createAt,
        }
    }

    public getId():string{
        return this.id
    }

    public setId(value:string):void{
        this.id = value
    }

    public getName():string{
        return this.name
    }

    public setName(value:string):void{
        this.name = value
    }

    public getPassword():string{
        return this.password
    }

    public setPassword(value:string):void{
        this.password = value
    }
    
    public getRole():string{
        return this.role
    }

    public setRole(value:string):void{
        this.role = value
    }

    public getCreateAt():string{
        return this.createAt
    }

    public setCreateAt(value:string):void{
        this.createAt = value
    }

}

