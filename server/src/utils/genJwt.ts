import jwt from "jsonwebtoken";
import { envs } from "../config/env.config";

export const genJwt = (data:{email: string, _id: string}) => jwt.sign(data, envs.jwtSecret!)