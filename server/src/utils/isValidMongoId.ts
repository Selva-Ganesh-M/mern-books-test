import mongoose from "mongoose";

export default (id: string) => mongoose.isValidObjectId(id);