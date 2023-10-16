import mongoose from "mongoose";
import { IReview } from "./reviewModel";

const reviewSchema = new mongoose.Schema<IReview>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: [true, "comment is a required field for a review."]
    },
    rating: {
        type: Number,
        required: [true, "rating is a mandatory field."],
        min: 1,
        max: 10,
        validate: {
            validator: (value: number) => value >=1 && value <=10,                
            message: "rating must be in the range of 1 to 10"
        }
    },
},{
    timestamps: true
})

export const reviewModel = mongoose.model("Review", reviewSchema)