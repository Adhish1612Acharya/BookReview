import { FC } from "react";
import bookFormProps from "../types/components/BookForm";
import { Form } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "../styles/Forms.css";

const BookForm: FC<bookFormProps> = ({
  value,
  error,
  setTextInput,
  submitFunction,
  submitLoad,
  imagePreview,
  edit,
}) => {
  return (
    <div className="form">
      <Form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          submitFunction(event)
        }
      >
        <TextField
          margin="normal"
          fullWidth
          type={"text"}
          id="title"
          label="title"
          name="title"
          value={value.title}
          error={!error.title.valid}
          helperText={
            error.title.errMsg === "" ? (
              <b>"Enter the title of the book"</b>
            ) : (
              error.title.errMsg
            )
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTextInput(event)
          }
          autoComplete="title"
          autoFocus
        />

        <TextField
          margin="normal"
          fullWidth
          type={"text"}
          id="description"
          label="description"
          name="description"
          value={value.description}
          error={!error.description.valid}
          helperText={
            error.title.errMsg === "" ? (
              <b>"Enter the description of the book"</b>
            ) : (
              error.description.errMsg
            )
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTextInput(event)
          }
          multiline
          autoComplete="description"
        />

        <TextField
          margin="normal"
          fullWidth
          type={"number"}
          id="price"
          label="price"
          name="price"
          value={value.price}
          error={!error.price.valid}
          helperText={
            error.price.errMsg === "" ? (
              <b>"Enter the price of the book"</b>
            ) : (
              error.price.errMsg
            )
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTextInput(event)
          }
          autoComplete="price"
        />
        {imagePreview !== "" ? (
          <img
            src={imagePreview}
            alt={"Your image"}
            style={{ width: "5rem", height: "5rem" }}
          />
        ) : (
          ""
        )}

        <TextField
          margin="normal"
          fullWidth
          type={"file"}
          id="image"
          name="image"
          error={!error.image.valid}
          helperText={
            error.image.errMsg === "" ? (
              <b>"Enter the image of the book"</b>
            ) : (
              error.image.errMsg
            )
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTextInput(event)
          }
          autoComplete="image"
        />

        {!submitLoad ? (
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {!edit ? "Create" : "Save"}
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
      </Form>
    </div>
  );
};

export default BookForm;
