import mongoose, { Document, mongo } from "mongoose";
const Schema = mongoose.Schema;

export interface bookDocument extends Document {
  image: string;
  title: string;
  description: string;
  price: number;
  publisher: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
}

const booksSchema = new Schema<bookDocument>({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Book = mongoose.model<bookDocument>("Book", booksSchema);

export default Book;
