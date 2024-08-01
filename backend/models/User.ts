import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

export interface userDocument extends Document {
  email: string;
  books: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<userDocument>({
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/, "Invalid email"],
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<userDocument>("User", userSchema);
export default User;
