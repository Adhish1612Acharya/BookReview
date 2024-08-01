import { NextFunction, Request, Response } from "express";
import Book from "./models/Book";
import { Types } from "mongoose";
import { Users } from "./types/UserType";
import { Req } from "./types/express.d";
import Session from "./types/session";
import { ZodError } from "zod";
import expressError from "./utils/expressError";
import { bookSchemaValidation } from "./schemeValidation";

export const validateBookSchema1 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    throw new expressError(422, "Image is required");
  }
  try {
    bookSchemaValidation.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      console.log(error);
      next(error);
    }
  }
};

export const validateBookSchema2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file === undefined && req.body.image === "undefined") {
      throw new expressError(422, "Image is not entered");
    } else if (req.body.image === "undefined") {
      throw new expressError(422, "Image is not entered");
    } else {
      bookSchemaValidation.parse(req.body);
      next();
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
  }
};

export const loginCheck = (req: Request, res: Response, next: NextFunction) => {
  req.mdata = {
    login: req.isAuthenticated(),
  };
  next();
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const { route } = req.body;

  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.redirect = route;
    res.json({ message: "notLogin" });
  }
};

export const authRouteLoginCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    res.json({ message: "loggedIn" });
  } else {
    next();
  }
};

export const logOutCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ message: "loggedOut" });
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { route } = req.body;
  if (req.isAuthenticated()) {
    const book = await Book.findById(id);
    if (!book) {
      res.json({ message: "bookNotFound" });
    } else if (
      req.user &&
      new Types.ObjectId((req.user as Users)._id).equals(book?.publisher)
    ) {
      next();
    } else {
      res.json({ message: "notOwner" });
    }
  } else {
    req.session.redirect = route;
    res.json({ message: "notLogin" });
  }
};

export const redirect = (req: Request, res: Response, next: NextFunction) => {
  res.locals.redirect = req.session.redirect;
  next();
};

export const cloudinaryPopulateBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  next();
};
