import mongoose from "mongoose";
import { IBook } from "./bookModel";

const bookSchema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: [true, "book title is a mandatory field."]
    },
    genres: {
        type: [{
            type: String
        }],
        default: []
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
    img: {
        type: String,
        default: null
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }]
    }
})

export const bookModel = mongoose.model("Book", bookSchema);