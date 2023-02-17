import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";

export class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}
    public getAllUsers = async (req:Request, res: Response)=>{
        try {
            const q = req.query.q as string | undefined

            const output = await this.userBusiness.getAllUsers()
            
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

}