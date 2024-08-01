import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { statObj, valueObj } from "../../../types/storeTypes/CreateBookSlice";
import { NavigateFunction } from "react-router-dom";

const initialState: statObj = {
  value: {
    title: "",
    description: "",
    price: "",
    image: "",
  },
  errors: {
    title: { errMsg: "", valid: true },
    description: { errMsg: "", valid: true },
    price: { errMsg: "", valid: true },
    image: { errMsg: "", valid: true },
  },
  textInptError: false,
  imagePreview: "",
  submitLoad: false,
  showComponent: false,
  navLogin: false,
  logOutLoad: false,
};

interface payLoad1 {
  navigate: NavigateFunction;
  id: string;
}

interface payLoad2 {
  navigate: NavigateFunction;
  id: string;
  imageFile: File | "";
}

export const getBookDetails = createAsyncThunk(
  "getBookDetais",
  async ({ navigate, id }: payLoad1, _thunkAPI) => {
    const response = await axios.get(`${server}/api/books/${id}`, {
      withCredentials: true,
    });
    if (response.data.login === false) {
      toast.warn("You need to login");
      navigate("/login");
    } else if (response.data.owner === false) {
      toast.warn("You are not the owner of this book");
      navigate("/");
    } else {
      return response.data;
    }
  }
);

export const editBook = createAsyncThunk(
  "/editBook",
  async ({ imageFile, navigate, id }: payLoad2, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      if (!state.editPage.textInptError) {
        thunkAPI.dispatch(setSubmitLoad(true));
        let data = new FormData();
        data.append("title", state.editPage.value.title);
        data.append("description", state.editPage.value.description);
        data.append("price", state.editPage.value.price);
        data.append("image", imageFile);
        const response = await axios.put(`${server}/api/books/${id}`, data, {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.message === "notLogin") {
          toast.warn("You must be Logged in");
          navigate("/login");
        } else if (response.data.message === "bookNotFound") {
          toast.warn("No such Book found");
          navigate("/");
        } else if (response.data.message === "notOwner") {
          toast.warn("You are not the owner of this book");
          navigate("/");
        } else if (response.data.message === "bookEdited") {
          toast.success("Book edited successfully");
          navigate(`/books/${id}`);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occured try refreshing the page");
      navigate("/");
    }
  }
);

export const EditBookSlice = createSlice({
  name: "craeteBook",
  initialState,
  reducers: {
    setInputData: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.errors[action.payload.name] = { errMsg: "", valid: true };
      if (action.payload.name === "image") {
        state.imagePreview = "";
        state.value[action.payload.name] = action.payload.value;
      } else {
        state.value[action.payload.name] = action.payload.value;
      }
    },
    validation: (state, action: PayloadAction<{ data: valueObj }>) => {
      const regex = /.*\S.*/;
      const priceRegex = /^(?!0+$)\d+$/;
      const imageRegex = /^(?!\s*$).+/;
      let err = false;
      if (!regex.test(action.payload.data.title)) {
        state.errors.title = {
          errMsg: "Title cannot be empty",
          valid: false,
        };
        err = true;
      }
      if (!regex.test(action.payload.data.description)) {
        state.errors.description = {
          errMsg: "Description cannot be empty",
          valid: false,
        };
        err = true;
      }
      if (!priceRegex.test(action.payload.data.price)) {
        state.errors.price = {
          errMsg: "Price cannot be zero",
          valid: false,
        };
        err = true;
      }
      if (
        typeof action.payload.data.image === "string" &&
        !imageRegex.test(action.payload.data.image)
      ) {
        state.errors.image = {
          errMsg: "Enter an image of the book",
          valid: false,
        };
        err = true;
      }

      state.textInptError = err;
    },
    fileReader: (state, action: PayloadAction<any>) => {
      state.imagePreview = action.payload;
    },
    setSubmitLoad: (state, action: PayloadAction<boolean>) => {
      state.submitLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editBook.fulfilled, (state, _action) => {
      state.submitLoad = false;
    });

    builder.addCase(getBookDetails.pending, (state, _action) => {
      state.submitLoad = false;
      state.showComponent = false;
      state.navLogin = false;
    });

    builder.addCase(getBookDetails.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        const bookData = action.payload.bookDetail;
        state.value = {
          title: bookData.title,
          description: bookData.description,
          price: bookData.price,
          image: bookData.image,
        };
        state.imagePreview = bookData.image;
        state.navLogin = true;
        state.showComponent = true;
      }
    });
  },
});

export default EditBookSlice.reducer;
export const { setInputData, validation, fileReader, setSubmitLoad } =
  EditBookSlice.actions;
