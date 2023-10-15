import express from "express"
import { envs } from "./config/env.config";
import { db } from "./config/db.config";
import { healthRouter } from "./routers/health.router";
import { _404Router } from "./routers/404.router";
import customErrorHandler from "./utils/customErrorHandler";
import cors from "cors";

const server = express();
server.use(cors())


//#region : 'routers'

server.use("/healthz", healthRouter);

server.use("/*", _404Router)

//#endregion : 'routers'

// custom error handler
server.use(customErrorHandler)

// 404 route

// server initiation
db.connectToDb((err)=>{
    if (err){
        console.log(err.message);
    }else{
        server.listen(envs.port, ()=>{
            console.log(`server started at PORT ${envs.port}`)
        })
    }
})
