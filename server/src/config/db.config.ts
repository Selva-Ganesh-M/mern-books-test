import mongoose from "mongoose"
import { envs } from "./env.config"

const connectToDb = async function (cb: (err?: Error)=>void){
    if (!envs.dbUri) {
        return Promise.reject(`dburi in env file is missing.`)
    }
    mongoose.connect(envs.dbUri)
        .then(()=>{
            console.log('db connection success...')
            cb();
        }).catch((err)=>{
            cb(err)
        });
}

export const db = {
    connectToDb
}