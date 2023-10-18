import { NextFunction, Request, Response } from "express"
import { IUser } from "../models/userModel"
import CustomError from "../utils/customError";
import { userModel } from "../models/User.model";
import { genJwt } from "../utils/genJwt";
import { authorModel } from "../models/Author.model";
import { IAuthorDoc, IAuthorLeanDoc } from "../models/authorModel";

const signup = async (req: Request<{}, {}, IUser & {type: "user" | "author"}, {}>, res: Response, next: NextFunction) => {
    try {
        const reqUser = req.body;
        if (!reqUser.type) throw new CustomError(400, "user type is mandatory to signup.")
        if (reqUser.type=="user"){
            let user = new userModel({...reqUser})
            user = await user.save();
            return res
            .cookie("access_token", genJwt({email: user.email, _id:user._id.toString(), type: reqUser.type}), {
                httpOnly: true,
                secure: true,
                path: "/"
            })
            .status(201)
            .json({
            statusText: 'success',
            message: `user signed up`,
            payload: {...user.toObject(), password: null}
            })
        }else{
            let author = new authorModel({...reqUser})
            author = await author.save();
            return res
            .cookie("access_token", genJwt({email: author.email, _id:author._id.toString(), type: reqUser.type}), {
                httpOnly: true,
                secure: true,
                path: "/"
            })
            .status(201)
            .json({
            statusText: 'success',
            message: `author signed up`,
            payload: {...author.toObject(), password: null}
            })
        }
    } catch (error) {
        next(error)
    }
}

const login = function (req: Request<{}, {}, {email: string, password: string, type: "user" | "author"}>, res: Response, next: NextFunction) {
    let data = req.body;
    if (!data.email || !data.password) return next(new CustomError(400, "email and password is mandatory."));
    switch(data.type){
        case 'user':
            userModel
            .findOne({email: data.email}, {password: -1})
            .lean()
            .then((user)=>{
                if(!user) return next(new CustomError(404, 'user not found'));
                return res
                .cookie("access_token", genJwt({email: user.email, _id: user._id.toString(), type: "user"}), {httpOnly: true, secure: true})
                .status(200)
                .json({
                statusText: 'success',
                message: 'login success',
                payload: {...user, password: null}
                })
            })
            .catch(err=>next(err))
            break;
        case "author":
            authorModel
            .findOne({email: data.email}, {password: -1})
            .lean()
            .then((author)=>{
                if(!author) return next(new CustomError(404, 'author not found'));
                return res
                .cookie(
                    "access_token",
                    genJwt({email: author.email, _id: author._id.toString(), type: "author"}),
                    {httpOnly: true, secure: true})
                .status(200)
                .json({
                    statusText: 'success',
                    message: 'login success',
                    payload: author
                })
            })
            .catch(err=>next(err))
            break;
        default:
            next(new CustomError(400, "invalid type is provided."));
    }
}

const logout = function(req: Request, res: Response, next: NextFunction){
    return res
    .status(200)
    .clearCookie("access_token", {path: "/"})
    .json({
        message: "logout successful",
        statusText: "success",
        payload: null
    })
}

export const authCtrl = {
    signup,
    login,
    logout,
}