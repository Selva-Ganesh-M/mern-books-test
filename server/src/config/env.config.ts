import dotenv from "dotenv"
dotenv.config();

export const envs = {
    dbUri: process.env.MONGO_URI,
    port: process.env.PORT
}