import {Document, Schema} from "mongoose";

export interface IUser {
    userName: string,
    email: string,
    password: string,
    type: 'user'
}

export interface IUserDoc extends IUser, Document{}
export interface IUserLeanDoc extends IUser {
    _id: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

