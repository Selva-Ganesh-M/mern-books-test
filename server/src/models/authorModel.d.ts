import mongoose from "mongoose";

export interface IAuthor {
    name: string; 
    books: Array<mongoose.Schema.Types.ObjectId>;
    email: string;
    password: string;
}

export interface IAuthorDoc extends Document, IAuthor {}

export interface IAuthorLeanDoc extends IAuthor {
    _id: string,
    createdAt: Date,
    updatedAt: Date
}