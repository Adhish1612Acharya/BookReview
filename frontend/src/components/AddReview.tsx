import { FC, FormEvent } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../store/store";
import {
  addReview,
  setOpenReviewForm,
  setReviewInputData,
  validation,
} from "../store/features/user/BookDetailSlice";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { Rating, TextField } from "@mui/material";
import { Form, NavigateFunction } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

interface addReviewprops {
  openStatus: boolean;
  navigate: NavigateFunction;
  id: string;
  value: {
    [key: string]: string | number;
  };
  reviewLoad: boolean;
  error: {
    errMsg: string;
    valid: boolean;
  };
}

const AddReview: FC<addReviewprops> = ({
  reviewLoad,
  navigate,
  id,
  value,
  error,
}) => {
  const dispatch = useAppDispatch();
  const preventDefault = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(validation({ data: value }));
    dispatch(addReview({ navigate, id, value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "2rem" }}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add your Review
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Controlled</Typography>
          <Form onSubmit={preventDefault}>
            <Rating
              name="simple-controlled"
              value={value.rating as number}
              onChange={(_event, newValue) => {
                dispatch(
                  setReviewInputData({
                    name: "rating",
                    value: newValue as number,
                  })
                );
              }}
              onClick={() => dispatch(setOpenReviewForm(true))}
            />
            <TextField
              id="outlined-basic"
              label="Add your review"
              variant="outlined"
              fullWidth
              type={"text"}
              name={"description"}
              value={value.description}
              error={!error.valid}
              helperText={error.errMsg}
              onChange={(event) => {
                dispatch(
                  setReviewInputData({
                    name: event.target.name,
                    value: event.target.value,
                  })
                );
              }}
            />
            <DialogActions>
              {!reviewLoad ? (
                <Button type="submit" variant="contained" color="secondary">
                  Add
                </Button>
              ) : (
                <LoadingButton
                  size="small"
                  loading={true}
                  variant="contained"
                  disabled
                >
                  <span>disabled</span>
                </LoadingButton>
              )}
            </DialogActions>
          </Form>
        </DialogContent>
      </div>
    </ThemeProvider>
  );
};
export default AddReview;
