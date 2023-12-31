import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userModel";
import { userModel } from "../models/User.model";
import CustomError from "../utils/customError";
import isValidMongoId from "../utils/isValidMongoId";

const createUser = function(req: Request<{}, {}, IUser, {}>, res: Response, next: NextFunction){
        const userPayload = req.body;
        if (!userPayload) return next(new CustomError(400, "user details should be provided to create user."));
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
    if(!isValidMongoId(req.params.userId)) return next(new CustomError(400, "invalid user id is provided."))
    userModel
    .findById(req.params.userId)
    .lean()
    .then((user)=>{
        if(!user) return next(new CustomError(404, 'user not found.'))
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
    .lean()
    .then((users)=>{
        return res.status(200).json({
            statusText: "success",
            message: "fetch all users success",
            payload: users
        });
    })
    .catch((err)=>next(err))
}

const updateUser = (req: Request<{userId: string}, {}, Partial<IUser>, {}>, res: Response, next: NextFunction) => {
    let userId = req.params.userId;
    if(!isValidMongoId(userId)) return next(new CustomError(400, "invalid userId is provided."));
    let userPayload = req.body;
    if (!userPayload || Object.keys(userPayload).length==0) 
        return next(new CustomError(400, "user details is mandatory to update the user."));
    userModel
    .findByIdAndUpdate(userId, {
        $set: userPayload
    }, {
        new: true
    })
    .lean()
    .then(user=>{
        if(!user) return next(new CustomError(404, 'user not found'))
        return res.status(200).json({
            statusText: "success",
            message: "user updated successfully.",
            payload: user 
        })
    })
    .catch(err=>next(err));
}

const deleteUser = function(req: Request<{userId: string}>, res: Response, next: NextFunction){
    let userId = req.params.userId;
    if(!userId) return next(new CustomError(400, 'invalid userId provided'));
    userModel
    .deleteOne({
        _id: userId
    })
    .lean()
    .then(data=>{
        if (data.deletedCount!=1) return next(new CustomError(404, "user not found."))
        return res.status(200).json({
            statusText: 'success',
            message: 'user deleted successfully',
            payload: null
            })
    })
    .catch(err=>next(err))
}

export const userCtrl = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}