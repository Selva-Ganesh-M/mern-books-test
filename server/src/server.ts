import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

import { envs } from "./config/env.config";
import { db } from "./config/db.config";
import { _404Router } from "./routers/404.router";
import customErrorHandler from "./utils/customErrorHandler";
import router from "./routers/router";
import CustomError from "./utils/customError";
import logger from "./middleware/logger";

const server = express();

server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(logger)

server.use("/api", router)

// custom error handler
server.use(customErrorHandler)

// 404 route

// server initiation
db.connectToDb((err)=>{
    if (err){
        console.log(err.message);
    }else{
        try{
            envs.envPresenceCheck();
            server.listen(envs.port, ()=>{
                console.log(`server started at PORT ${envs.port}`)
            })
        }catch(err: unknown){
            if (err instanceof Error || err instanceof CustomError){
                console.log(err.message)
            }else{
                console.log(`Error: ${JSON.stringify(err)}`)
            }
            process.exit(1);
        }
    }
})
