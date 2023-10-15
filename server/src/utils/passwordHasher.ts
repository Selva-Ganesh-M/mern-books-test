import bcrypt from "bcrypt";
import { envs } from "../config/env.config";

export default function(password: string){
    return new Promise((res, rej)=>{
        bcrypt
        .genSalt(envs.saltRounds)
        .then(salt=>res(bcrypt.hashSync(password, salt)))
        .catch(err=>rej(err))
    })
}