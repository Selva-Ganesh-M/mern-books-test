import jwt from "jsonwebtoken";
import { envs } from "../config/env.config";

export const genJwt = (data:{email: string, _id: string, type: "user"|"author"}) => jwt.sign(data, envs.jwtSecret!)