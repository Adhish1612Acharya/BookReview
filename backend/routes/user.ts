import express from "express";
import {
  authRouteLoginCheck,
  isLoggedIn,
  logOutCheck,
  redirect,
} from "../middlewares";
import wrapAsync from "../utils/wrapAsync";
const router = express.Router();
import userController from "../controllers/user";
import passport from "passport";

router.post(
  "/signUp",
  authRouteLoginCheck,
  redirect,
  wrapAsync(userController.signUp)
);

router.post(
  "/login",
  authRouteLoginCheck,
  redirect,
  passport.authenticate("local", {
    failureRedirect: "/api/user/loginFailure",
  }),
  userController.login
);

router.get("/loginFailure", userController.loginFailure);

router.get("/logout", logOutCheck, userController.logout);

router.get("/books", isLoggedIn, wrapAsync(userController.getUserBooks));

router.get("/loginCheck", authRouteLoginCheck, userController.loginUserCheck);

export default router;
