import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { bookCardProps } from "../types/components/BookCard";
import "../styles/Home.css";

const BookCard: React.FC<bookCardProps> = ({ book }) => {
  return (
    <CardActionArea className="cardActionArea">
      <Card className="card" elevation={8}>
        <img
          className="bookImage"
          src={book.image}
          alt={"book image"}
          style={{ width: "100px", height: "100px" }}
        />

        <CardContent
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <Typography
            component="h2"
            style={{ wordWrap: "break-word" }}
            variant="h6"
          >
            {book.title}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ wordWrap: "break-word" }}
            paragraph
          >
            Publisher : {book.publisher.username}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default BookCard;
