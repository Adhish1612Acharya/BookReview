import mongoose, { Document, mongo } from "mongoose";
const Schema = mongoose.Schema;

export interface reviewDocument extends Document {
  rating: number;
  description: string;
  author: mongoose.Types.ObjectId;
  bookDetail: mongoose.Types.ObjectId;
}

const reviewSchema = new Schema<reviewDocument>({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
    minlength: 1,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bookDetail: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
});

const Review = mongoose.model<reviewDocument>("Review", reviewSchema);

export default Review;
