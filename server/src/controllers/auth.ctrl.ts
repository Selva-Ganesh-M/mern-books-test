import { NextFunction, Request, Response } from "express"
import { IUser } from "../models/userModel"
import CustomError from "../utils/customError";
import { userModel } from "../models/User.model";
import { genJwt } from "../utils/genJwt";

const signup = async (req: Request<{}, {}, IUser & {type: "user" | "author"}, {}>, res: Response, next: NextFunction) => {
    try {
        const reqUser = req.body;
        if (!reqUser.type) throw new CustomError(400, "user type is mandatory to signup.")
        if (reqUser.type=="user"){
            let user = new userModel({...reqUser, type: null})
            user = await user.save();
            return res
            .cookie("access_token", genJwt({email: user.email, _id:user._id.toString()}), {
                httpOnly: true,
                secure: true,
                path: "/"
            })
            .status(201)
            .json({
            statusText: 'success',
            message: 'user signed up',
            payload: user
            })
        }else{

        }
    } catch (error) {
        
    }
}

const login = function (req: Request<{}, {}, {email: string, password: string}>, res: Response, next: NextFunction) {
    let data = req.body;
    if (!data.email || !data.password) return next(new CustomError(400, "email and password is mandatory."));
    userModel
    .findOne({email: data.email})
    .lean()
    .then((user)=>{
        if(!user) return next(new CustomError(404, 'user not found'));
        return res.cookie("access_token", genJwt({email: user.email, _id: user._id.toString()}), {httpOnly: true, secure: true}).status(200).json({
        statusText: 'success',
        message: 'login success',
        payload: user
        })
    })
    .catch(err=>next(err))
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