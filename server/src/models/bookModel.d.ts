import mongoose from "mongoose";

export interface IBook {
    title: string, 
    genres: Array<string>,
    rating: number,
    img: string | null,
    reviews: Array<mongoose.Schema.Types.ObjectId>
}

export interface IBookDoc extends Document, IBook {}

export interface IBookLeanDoc extends IBook {
    _id: string,
    createdAt: Date,
    updatedAt: Date
}