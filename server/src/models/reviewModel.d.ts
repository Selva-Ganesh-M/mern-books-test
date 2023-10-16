import mongoose from "mongoose";

export interface IReview {
    user: mongoose.Schema.Types.ObjectId;
    comment: string;
    rating: number;
}

export interface IReviewDoc extends Document, IReview {}

export interface IReviewLeanDoc extends IReview {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}