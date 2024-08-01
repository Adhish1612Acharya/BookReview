import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ReviewCard from "./ReviewCard";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

interface reviewObj {
  _id?: string;
  rating: number;
  description: string;
  author: {
    username: string;
  };
}

export interface reviewProps {
  review: reviewObj[];
  drawerOpen: boolean;
  dispatchDrawer: (value: boolean) => void;
}

const ReviewDrawer: React.FC<reviewProps> = ({
  review,
  drawerOpen,
  dispatchDrawer,
}) => {
  const list = () => (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 250 }} role="presentation">
        <Typography component={"h2"} style={{ textAlign: "center" }}>
          <b>Reviews</b>
          <IconButton
            aria-label="close"
            onClick={() => dispatchDrawer(false)}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        <List>
          {review.map((review) => {
            return <ReviewCard review={review} key={review._id} />;
          })}
        </List>
      </Box>
    </ThemeProvider>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={drawerOpen}
          onClose={() => dispatchDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ReviewDrawer;
