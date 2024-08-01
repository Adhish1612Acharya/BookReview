import express from "express";
import {
  cloudinaryPopulateBody,
  isLoggedIn,
  isOwner,
  loginCheck,
  validateBookSchema1,
  validateBookSchema2,
} from "../middlewares";
import wrapAsync from "../utils/wrapAsync";
const router = express.Router();
import bookController from "../controllers/book";
import { storage } from "../cloudConfig";
import multer from "multer";
const upload = multer({ storage });

router.get("/", loginCheck, wrapAsync(bookController.getAllBooks));

router.get("/:id", loginCheck, wrapAsync(bookController.getBookDetails));

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  cloudinaryPopulateBody,
  validateBookSchema1,
  wrapAsync(bookController.createBook)
);

router.put(
  "/:id",
  isOwner,
  upload.single("image"),
  cloudinaryPopulateBody,
  validateBookSchema2,
  wrapAsync(bookController.editBook)
);

router.delete("/:id", isOwner, wrapAsync(bookController.destroyBook));

router.post("/:id/reviews", isLoggedIn, wrapAsync(bookController.addReview));

router.post("/loginCheck", isLoggedIn, bookController.loginCheck);

export default router;
