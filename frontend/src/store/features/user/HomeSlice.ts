import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { server } from "../../../server";
import { homeState } from "../../../types/storeTypes/HomeSlice";

const initialState: homeState = {
  showComponent: false,
  navLogin: false,
  books: [],
  logoutLoad: false,
};

export const getBooksData = createAsyncThunk(
  "/getBooks",
  async (navigate: NavigateFunction, _thunkAPI) => {
    try {
      const books = await axios.get(`${server}/api/books`, {
        withCredentials: true,
      });
      return books.data;
    } catch (err) {
      console.log(err);
      toast.error("Some error Occurred Please refresh the page");
      navigate("/");
    }
  }
);

export const getUserBooks = createAsyncThunk(
  "/getUserBooks",
  async (navigate: NavigateFunction, _thunkAPI) => {
    try {
      const books = await axios.get(`${server}/api/user/books`, {
        withCredentials: true,
      });
      console.log(books);
      if (books.data.message === "notLogin") {
        toast.warn("You must login");
        navigate("/login");
      } else {
        return books.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error Occurred Please refresh the page");
      navigate("/");
    }
  }
);

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.showComponent = !action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.navLogin = action.payload;
    },
    setLogoutLoad: (state, action: PayloadAction<boolean>) => {
      state.logoutLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksData.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.books = action.payload?.books;
        state.navLogin = action.payload.login;
        state.showComponent = true;
      }
    });
    builder.addCase(getBooksData.pending, (state, _action) => {
      state.showComponent = false;
      state.logoutLoad = false;
    });

    builder.addCase(getUserBooks.pending, (state, _action) => {
      state.navLogin = false;
      state.showComponent = false;
      state.logoutLoad = false;
    });

    builder.addCase(getUserBooks.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.books = action.payload?.books;
        state.navLogin = true;
        state.showComponent = true;
      }
    });
  },
});

export default HomeSlice.reducer;
export const { setLoading, setLogin, setLogoutLoad } = HomeSlice.actions;
