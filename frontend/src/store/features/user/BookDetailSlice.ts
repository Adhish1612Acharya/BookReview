import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import {
  bookStatObj,
  reviewValueObj,
} from "../../../types/storeTypes/BookInfoSlice";
import { RootState } from "../../store";

const initialState: bookStatObj = {
  navLogin: false,
  showComponent: false,
  owner: false,
  bookInfo: {
    _id: "",
    title: "",
    description: "",
    image: "",
    price: 0,
    publisher: {
      username: "",
    },
    reviews: [],
  },
  deleteLogin: false,
  openDrawer: false,
  openReviewForm: false,
  reviewValue: {
    rating: 2,
    description: "",
  },
  reviewError: {
    errMsg: "",
    valid: true,
  },
  reviewLoad: false,
  textInptError: false,
};

interface payLoad {
  navigate: NavigateFunction;
  id: string;
}

interface payLoad2 {
  navigate: NavigateFunction;
  id: string;
  value: {
    [key: string]: string | number;
  };
}

export const getBookDetail = createAsyncThunk(
  "/getBookDetail",
  async ({ navigate, id }: payLoad, _thunkAPI) => {
    try {
      const detail = await axios.get(`${server}/api/books/${id}`, {
        withCredentials: true,
      });
      if (detail.data.bookDetail === "bookNotFound") {
        toast.warn("No such book is available");
        navigate("/");
      } else {
        return detail.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred , try refreshing the page");
      navigate("/");
    }
  }
);

export const deleteBookDetail = createAsyncThunk(
  "/deleteBookDetail",
  async ({ navigate, id }: payLoad, _thunkAPI) => {
    try {
      const detail = await axios.delete(`${server}/api/books/${id}`, {
        withCredentials: true,
      });
      console.log(detail);
      if (detail.data.message === "bookNotFound") {
        toast.warn("No such book is available");
        navigate("/");
      } else if (detail.data.message === "notLogin") {
        toast.warn("You need to login");
        navigate("/login");
      } else if (detail.data.message === "notOwner") {
        toast.warn("You are not the owner");
        navigate("/");
      } else if (detail.data.message === "bookDeleted") {
        toast.success("Book deleted successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred , try refreshing the page");
      navigate("/");
    }
  }
);

export const addReview = createAsyncThunk(
  "/addReview",
  async ({ navigate, id, value }: payLoad2, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      console.log(state.bookInfoPage.textInptError);
      if (!state.bookInfoPage.textInptError) {
        console.log("request sent");
        thunkAPI.dispatch(setReviewLoad(true));
        const detail = await axios.post(
          `${server}/api/books/${id}/reviews`,
          value,
          {
            withCredentials: true,
          }
        );
        if (detail.data.message === "bookNotFound") {
          toast.warn("No such book is available");
          navigate("/");
        } else if (detail.data.message === "notLogin") {
          toast.warn("You need to login");
          navigate("/login");
        } else if (detail.data.message === "reviewAdded") {
          toast.success("Review Added");
          navigate("/");
          return detail.data;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred , try refreshing the page");
      navigate("/");
    }
  }
);

export const SchemeDetailSlice = createSlice({
  name: "schemeDetail",
  initialState,
  reducers: {
    setOpenReviewForm: (state, action: PayloadAction<boolean>) => {
      state.openReviewForm = action.payload;
    },
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
    setReviewInputData: (
      state,
      action: PayloadAction<{ name: string; value: string | number }>
    ) => {
      state.reviewError = { errMsg: "", valid: true };
      state.reviewValue[action.payload.name] = action.payload.value;
    },
    validation: (state, action: PayloadAction<{ data: reviewValueObj }>) => {
      const regex = /.*\S.*/;
      let err = false;
      console.log(action.payload.data.description);

      if (!regex.test(String(action.payload.data.description))) {
        state.reviewError = {
          errMsg: "Enter description",
          valid: false,
        };
        err = true;
      }
      state.textInptError = err;
    },
    setReviewLoad: (state, action: PayloadAction<boolean>) => {
      state.reviewLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookDetail.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.bookInfo = action.payload.bookDetail;
        state.owner = action.payload.owner;
        state.navLogin = action.payload.login;
        state.showComponent = true;
      }
    });
    builder.addCase(getBookDetail.pending, (state, _action) => {
      state.openDrawer = false;
      state.openReviewForm = false;
      state.deleteLogin = false;
      state.showComponent = false;
    });

    builder.addCase(deleteBookDetail.pending, (state, _action) => {
      state.deleteLogin = true;
    });
    builder.addCase(deleteBookDetail.fulfilled, (state, _action) => {
      state.showComponent = false;
    });

    builder.addCase(addReview.pending, (state, action) => {
      if (action.payload !== undefined) {
        state.reviewLoad = true;
      }
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.reviewError = {
          errMsg: "",
          valid: true,
        };
        state.reviewValue = {
          rating: 2,
          description: "",
        };
        state.reviewLoad = false;
      }
    });
  },
});

export default SchemeDetailSlice.reducer;
export const {
  setOpenReviewForm,
  setOpenDrawer,
  setReviewInputData,
  validation,
  setReviewLoad,
} = SchemeDetailSlice.actions;
