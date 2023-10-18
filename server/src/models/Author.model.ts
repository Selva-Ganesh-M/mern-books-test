import mongoose from "mongoose";
import { IAuthor, IAuthorDoc } from "./authorModel";
import { envs } from "../config/env.config";
import CustomError from "../utils/customError";
import passwordHasher from "../utils/passwordHasher";
import bcrypt from "bcrypt"

const authorSchema = new mongoose.Schema<IAuthor>({
    userName: {
        type: String,
        required: [true, "author name is a mandatory field."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is a mandatory field."]
    },
    password: {
        type: String,
        required: [true, "password is a mandatory field."]
    },
    type: {
        type: String,
        default: 'author',
    },
    books: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }]
    }
}, {
    timestamps: true
})

authorSchema.pre('save', function(next){
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

authorSchema.pre('findOneAndUpdate', function(next){
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

authorSchema.methods.comparePassword = function(receivedPassword: string){
        let user = this as IAuthorDoc;
        return bcrypt.compareSync(receivedPassword, user.password)
}


export const authorModel = mongoose.model("Author", authorSchema);