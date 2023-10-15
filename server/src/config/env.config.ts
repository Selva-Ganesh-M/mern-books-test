import dotenv from "dotenv"
dotenv.config();

let saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

export const envs = {
    dbUri: process.env.MONGO_URI,
    port: process.env.PORT,
    saltRounds
}