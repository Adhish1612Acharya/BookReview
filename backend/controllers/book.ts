import { Request, Response } from "express";
import Book, { bookDocument } from "../models/Book";
import { model, Types } from "mongoose";
import { populate } from "dotenv";
import Review, { reviewDocument } from "../models/Review";
import { Users } from "../types/UserType";
import { Req } from "../types/express";
import User, { userDocument } from "../models/User";

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await Book.find({}).populate("publisher");
  const loginStatus = req.mdata?.login;
  res.json({
    books: books,
    login: loginStatus,
  });
};

export const getBookDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const loginStatus = req.mdata?.login;
  let owner = false;
  const bookDetail = await Book.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("publisher")
    .catch((err) => console.log("Book not found error"));
  if (!bookDetail) {
    res.json({
      bookDetail: "bookNotFound",
      login: loginStatus,
    });
  } else {
    if (loginStatus) {
      owner = new Types.ObjectId((req.user as Users)._id).equals(
        bookDetail.publisher._id
      );
    }
    res.json({
      bookDetail: bookDetail,
      login: loginStatus,
      owner: owner,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    if (req.file?.path !== undefined) {
      newBook.image = req.file?.path;
    }
    newBook.publisher = new Types.ObjectId(req.user?._id as string);
    await newBook.save();
    const user = await User.findById(req.user?._id);
    if (user) {
      user.books.push(newBook as any);
      await user.save();
    }

    res.json({ message: "bookCreated", _id: newBook._id });
  } catch (err) {
    console.log(err);
  }
};

export const editBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const editedBook = await Book.findByIdAndUpdate(id, {
    title: title,
    description: description,
    price: price,
    image: req.file?.path,
  }).catch((err) => console.log("Book not found error"));

  if (!editedBook) {
    res.json({ message: "bookNotFound" });
  } else {
    res.json({ message: "bookEdited" });
  }
};

export const destroyBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id).catch((err) => {
    console.log("Book not found");
  });
  if (!deletedBook) {
    res.json({ message: "bookNotFound" });
  } else {
    await Review.deleteMany({ bookDetail: id });
    res.json({ message: "bookDeleted" });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("publisher");
  if (!book) {
    res.json({ message: "bookNotFound" });
  } else if (book) {
    const newReview = new Review(req.body);
    newReview.author = new Types.ObjectId((req.user as Users)._id);
    newReview.bookDetail = new Types.ObjectId(id);
    await newReview.save();
    book.reviews.push(newReview._id as any);
    const updatedBook = await book.save();
    console.log(book);
    res.json({ message: "reviewAdded" });
  }
};

export const loginCheck = (req: Request, res: Response) => {
  res.json({ message: "loggedIn" });
};

export default {
  getAllBooks,
  getBookDetails,
  createBook,
  editBook,
  destroyBook,
  addReview,
  loginCheck,
};
