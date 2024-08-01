import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import {
  payLoad,
  statObj,
  valueObj,
} from "../../../types/storeTypes/CreateBookSlice";
import { NavigateFunction } from "react-router-dom";

const initialState: statObj = {
  value: {
    title: "",
    description: "",
    price: "1",
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

export const checkLogin = createAsyncThunk(
  "checkLogin",
  async (navigate: NavigateFunction, _thunkAPI) => {
    const response = await axios.post(
      `${server}/api/books/loginCheck`,
      { route: window.location.pathname },
      { withCredentials: true }
    );
    if (response.data.message === "notLogin") {
      toast.warn("You need to login");
      navigate("/login");
    } else if (response.data.message === "loggedIn") {
      return response.data;
    }
  }
);

export const createBook = createAsyncThunk(
  "/crateBook",
  async ({ imageFile, navigate }: payLoad, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      if (!state.createPage.textInptError) {
        thunkAPI.dispatch(setSubmitLoad(true));
        let data = new FormData();
        data.append("title", state.createPage.value.title);
        data.append("description", state.createPage.value.description);
        data.append("price", state.createPage.value.price);
        data.append("image", imageFile);
        const response = await axios.post(`${server}/api/books`, data, {
          withCredentials: true,
        });

        if (response.data.message === "notLogin") {
          toast.warn("You must be Logged in");
          navigate("/login");
        } else if (response.data.message === "bookCreated") {
          toast.success("Book hosted succesfully");
          navigate(`/books/${response.data._id}`);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occured try refreshing the page");
      navigate("/");
    }
  }
);

export const CreateBookSlice = createSlice({
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
    builder.addCase(createBook.fulfilled, (state, _action) => {
      state.submitLoad = false;
    });

    builder.addCase(checkLogin.pending, (state, _action) => {
      state.value = {
        title: "",
        description: "",
        price: "1",
        image: "",
      };
      state.submitLoad = false;
      state.showComponent = false;
      state.navLogin = false;
    });

    builder.addCase(checkLogin.fulfilled, (state, action) => {
      if (
        action.payload !== undefined &&
        action.payload.message === "loggedIn"
      ) {
        state.navLogin = true;
        state.showComponent = true;
      }
    });
  },
});

export default CreateBookSlice.reducer;
export const { setInputData, validation, fileReader, setSubmitLoad } =
  CreateBookSlice.actions;
