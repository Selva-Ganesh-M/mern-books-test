import mongoose from "mongoose";

export interface IAuthor {
    userName: string; 
    books: Array<mongoose.Schema.Types.ObjectId>;
    email: string;
    password: string;
    type: "author"
}

export interface IAuthorDoc extends Document, IAuthor {}

export interface IAuthorLeanDoc extends IAuthor {
    _id: string,
    createdAt: Date,
    updatedAt: Date
}