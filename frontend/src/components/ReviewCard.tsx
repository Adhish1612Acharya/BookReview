import { Avatar, Divider, Paper, Rating, Typography } from "@mui/material";
import { FC } from "react";
import "../styles/ReviewCard.css";

interface reviewObj {
  rating: number;
  description: string;
  author: {
    username: string;
  };
}

interface reviewCardProps {
  review: reviewObj;
}

const ReviewCard: FC<reviewCardProps> = ({ review }) => {
  <Divider />;
  console.log(review);
  return (
    <>
      <Paper className="reviewCard">
        <Divider />
        <div className="header">
          <Avatar alt="" src="" style={{ marginRight: "1rem" }} />
          <Typography variant="subtitle1">{review.author.username}</Typography>
        </div>
        <Divider />
        <div className="footer">
          <div className="retaing">
            <Rating name="read-only" value={review.rating} readOnly />{" "}
          </div>
          <Typography variant="subtitle2" paragraph>
            {review.description}
          </Typography>
        </div>
      </Paper>
      <Divider />
    </>
  );
};

export default ReviewCard;
