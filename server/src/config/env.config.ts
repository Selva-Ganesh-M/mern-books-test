import dotenv from "dotenv"
dotenv.config();


let necessary_env_variables = ['PORT', 'MONGO_URI', 'JWT_SECRERT', 'SALT_ROUNDS']

let saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

export const envs = {
    dbUri: process.env.MONGO_URI,
    port: process.env.PORT,
    saltRounds,
    jwtSecret: process.env.JWT_SECRET,
    envPresenceCheck: ()=>{
        let missing_vars = necessary_env_variables.filter(variable=>!process.env[variable]);
        if (missing_vars.length>0) throw Error(`missing env varaibles: ${missing_vars.toString()}`)
    }
}