import { config as dotEnvConfig } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotEnvConfig();
}

import express, { Request, Response } from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import cors from "cors";
import errorHandler from "./types/errorHandler";
import path from "path";
import MongoStore from "connect-mongo";
import User from "./models/User";

import bookRouter from "./routes/book";
import userRouter from "./routes/user";

const DB_URL = "mongodb://127.0.0.1:27017/bookreview";
// process.env.DB_PORT ||
main()
  .then(() => {
    console.log("DB connected", DB_URL);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: {
    secret: process.env.SECRET || "My secret code",
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error occured in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "MySecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

app.use(bodyParser.json());
app.use(session(sessionOptions));

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(
  (entity: any, done: (err: any, data: { id: string }) => void) => {
    done(null, { id: entity._id });
  }
);

passport.deserializeUser(
  (obj: { id: string }, done: (err: any, user?: any) => void) => {
    User.findById(obj.id).then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(new Error("user id not found:" + obj.id));
      }
    });
  }
);

// passport.serializeUser(
//   (user: userDocument, done: (err: any, id?: any) => void) => {
//     done(null, user._id);
//   }
// );

// passport.deserializeUser(
//   (id: string, done: (err: any, user?: userDocument) => void) => {
//     User.findById(id)
//       .then((user) => {
//         done(null, user || undefined);
//       })
//       .catch((err) => {
//         done(err);
//       });
//   }
// );

app.use("/api/books", bookRouter);
app.use("/api/user", userRouter);

// -------------------Deployment------------------//

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "local") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json("Success");
  });
}

// -------------------Deployment------------------//

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
