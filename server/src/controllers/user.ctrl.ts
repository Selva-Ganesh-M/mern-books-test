import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userModel";
import { userModel } from "../models/User.model";
import CustomError from "../utils/customError";


const createUser = function(req: Request<{}, {}, IUser, {}>, res: Response, next: NextFunction){
        const userPayload = req.body;
        let user = new userModel(userPayload);
        user
        .save()
        .then((user)=>{
            return res.status(201).json({
                statusText: "success",
                message: "new user created",
                payload: user
            })
        }).catch((err)=>{
            return next(err);
        })
}

const getUser = (req: Request<{userId: string}>, res: Response, next: NextFunction) => {
    if (!req.params.userId) return next(new CustomError(400, "userId is mandatory"));
    userModel
    .findById(req.params.userId)
    .then((user)=>{
    return res.status(200).json({
        statusText: "success",
        message: "user fetch success.",
        payload: user
    })
    })
    .catch(err=>{
    return next(err);
    })
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    userModel
    .find()
    .then((users)=>{
        return res.status(200).json({
            statusText: "success",
            message: "fetch all users success",
            payload: users
        });
    })
    .catch((err)=>next(err))
}

export const userCtrl = {
    createUser,
    getUser,
    getAllUsers,
}