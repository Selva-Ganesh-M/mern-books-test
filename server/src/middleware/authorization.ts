import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import jwt from "jsonwebtoken";
import { envs } from "../config/env.config";
import isValidMongoId from "../utils/isValidMongoId";
import { userModel } from "../models/User.model";

declare module "express"{
    interface Request {
        locals?: Record<string, any>
    }
}

export default async function (req: Request, res: Response, next: NextFunction){
    try {
        let token = req.cookies.access_token;
        if(!token) throw new CustomError(400, 'access token missing.');
        let decoded = <{email: string, _id: string}> jwt.verify(token, envs.jwtSecret!);
        if(!isValidMongoId(decoded._id)) throw new CustomError(400, 'invalid access token');
        let user = await userModel.findById(decoded._id).select("-password").lean();
        if(!user) throw new CustomError(404, 'user not found');
        req.locals = {}
        req.locals.user = user;
        next();
    } catch (error) {
        console.log(error)
        next(error)
    }
} 