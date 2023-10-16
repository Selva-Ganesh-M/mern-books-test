import mongoose from "mongoose";

export interface IBook {
    title: string, 
    genres: Array<string>,
    rating: number,
    img: string | null,
    reviews: Array<mongoose.Schema.Types.ObjectId>
}

export interface IAuthorDoc extends Document, IAuthor {}

export interface IAuthorLeanDoc extends IAuthor {
    _id: string,
    createdAt: Date,
    updatedAt: Date
}