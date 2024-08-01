import { Request, Response } from "express";
import User from "../models/User";
import expressError from "../utils/expressError";
import { Users } from "../types/UserType";

export const signUp = async (req: Request, res: Response) => {
  try {
    let signUpError = false;
    let { username, email, password } = req.body;
    let newUser = new User({
      username: username,
      email: email,
    });
    let registeredUser = await User.register(newUser, password).catch((err) => {
      console.log("signUpError");
      console.log(err);
      signUpError = true;
      res.json({ message: "signUpError" });
    });
    if (!signUpError && registeredUser) {
      req.login(registeredUser as Express.User, (err) => {
        if (err) {
          console.log(err);
        } else {
          if (res.locals.redirect === undefined) {
            res.json({
              signUpStatus: "directSignUp",
              redirect: "/",
            });
          } else {
            res.json({
              signUpStatus: "successSignUp",
              redirect: res.locals.redirect,
            });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, `Internal server error in signUp ${err}`);
  }
};

export const login = (req: Request, res: Response) => {
  if (res.locals.redirect === undefined) {
    console.log("directLogin");
    res.json({
      loginStatus: "directLogin",
      redirect: "/",
    });
  } else {
    res.json({
      loginStatus: "successLogin",
      redirect: res.locals.redirect,
    });
  }
};

export const loginFailure = (req: Request, res: Response) => {
  console.log("failureLogin");
  res.json({ message: "failureLogin" });
};

export const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      res.json("Some error occured");
    } else {
      console.log("loggedOut");
      res.send("loggedOut");
    }
  });
};

export const getUserBooks = async (req: Request, res: Response) => {
  const data = await User.findById(req.user?._id).populate({
    path: "books",
    populate: {
      path: "publisher",
    },
  });
  res.json({ books: data?.books });
};

export const loginUserCheck = (req: Request, res: Response) => {
  res.json({ message: "notLogin" });
};

export default {
  signUp,
  login,
  loginFailure,
  logout,
  getUserBooks,
  loginUserCheck,
};
