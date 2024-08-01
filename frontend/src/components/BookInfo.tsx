import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { bookObj } from "../types/routesTypes/user/HomePage";
import "../styles/BookInfo.css";
// import BookInfoBtns from "./BookInfoBtns";

interface bookInfoProps {
  book: bookObj;
}

const BookInfo: FC<bookInfoProps> = ({ book }) => {
  return (
    <Paper className="bookInfo" elevation={16}>
      <div className="infoHeader">
        <div className="image">
          <img src={book.image} alt="book image" style={{ width: "100%" }} />
          <Typography
            variant="subtitle1"
            style={{ wordWrap: "break-word" }}
            paragraph
          >
            <b>&#8377; {book.price}</b>
          </Typography>
        </div>
        <div className="reviewBtns">
          <Typography
            component="h2"
            style={{ wordWrap: "break-word" }}
            variant="h5"
          >
            Title : {book.title}
          </Typography>
          <Typography
            component="h2"
            style={{ wordWrap: "break-word" }}
            variant="h6"
          >
            Publisher : {book.publisher.username}
          </Typography>
        </div>
      </div>
      <div className="description" style={{ textAlign: "justify" }}>
        {book.description}
      </div>
    </Paper>
  );
};

export default BookInfo;
