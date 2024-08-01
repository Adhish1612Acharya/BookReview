import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import homeReducer from "./features/user/HomeSlice";
import LoginPageReducer from "./features/otherPages/LoginSlice";
import SignUpPageSliceReducer from "./features/otherPages/SignUpPageSlice";
import CreateBookSliceReducer from "./features/user/CreateBookSlice";
import GetBookInfoPageReducer from "./features/user/BookDetailSlice";
import EditBookSliceReducer from "./features/user/EditBookSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    loginPage: LoginPageReducer,
    signUpPage: SignUpPageSliceReducer,
    createPage: CreateBookSliceReducer,
    editPage: EditBookSliceReducer,
    bookInfoPage: GetBookInfoPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
