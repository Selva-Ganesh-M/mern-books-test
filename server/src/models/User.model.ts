import mongoose from "mongoose";
import {IUser, IUserDoc} from "./userModel";
import bcrypt from "bcrypt";
import { envs } from "../config/env.config";
import passwordHasher from "../utils/passwordHasher";
import CustomError from "../utils/customError";


const userSchema = new mongoose.Schema<IUser>({
    userName: {
        type: String,
        required: [true, "userNname is a mandatory field."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is a mandatory field."]
    },
    password: {
        type: String,
        required: [true, "password is a mandatory field."]
    }
},{
    timestamps: true
})

userSchema.pre('save', function(next){
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(envs.saltRounds, (err, salt)=>{
        if (err){
            return next(err)
        }else{
            const hash = bcrypt.hashSync(this.password, salt)
            this.password = hash;
            return next();
        }
    })

})

userSchema.pre('findOneAndUpdate', function(next){
    let update = this.getUpdate() as any;
    if(!update) return next(new CustomError(400, 'update content must be provided'))
    if (update.$set.password){
        passwordHasher(update.$set.password)
        .then(hash=>{
            update.$set.password = hash;
            next();
        })
        .catch(err=>next(err))
    }else{
        next();
    }
})

userSchema.methods.comparePassword = function(receivedPassword: string){
        let user = this as IUserDoc;
        return bcrypt.compareSync(receivedPassword, user.password)
}


export const userModel = mongoose.model("User", userSchema);