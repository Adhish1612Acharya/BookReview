import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import {
  payLoad,
  statObj,
  valueObj,
} from "../../../types/storeTypes/SignUpSlice";
import { server } from "../../../server";

const initialState: statObj = {
  showComponent: false,
  value: {
    username: "",
    email: "",
    password: "",
  },
  error: {
    username: {
      valid: false,
      errMsg: "",
    },
    email: {
      valid: true,
      errMsg: "",
    },
    password: {
      valid: true,
      errMsg: "",
    },
  },
  textInputErr: false,
  signUpLoad: false,
};

export const checkLogin = createAsyncThunk(
  "/loginCheck",
  async (navigate: NavigateFunction, _thunkAPI) => {
    try {
      const response = await axios.get(`${server}/api/user/loginCheck`, {
        withCredentials: true,
      });
      if (response.data.message === "loggedIn") {
        toast.warn("You are already logged in");
        navigate("/");
      } else if (response.data.message === "notLogin") {
        return response.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Spme error occured please try refreshing the page");
      navigate("/");
    }
  }
);

export const signUp = createAsyncThunk(
  "/signUpRoute",
  async ({ value, navigate }: payLoad, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const textIputError = state.signUpPage.textInputErr;
      if (!textIputError) {
        thunkAPI.dispatch(setSignUpLoad(true));
        const response = await axios.post(`${server}/api/user/signUp`, value, {
          withCredentials: true,
        });
        if (response.data.signUpStatus === "successSignUp") {
          toast.success("Logged in successfully ");
          navigate(`${response.data.redirect}`);
        } else if (response.data.signUpStatus === "directSignUp") {
          toast.success("Logged in successfully ");
          navigate(`${response.data.redirect}`);
        } else if (response.data.message === "signUpError") {
          toast.error("Username  already exists");
          return response.data;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred try refreshing the page");
      navigate("/");
    }
  }
);

export const SignUpPageSlice = createSlice({
  name: "signUpPage",
  initialState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.error[action.payload.name] = { valid: true, errMsg: "" };
      state.value[action.payload.name] = action.payload.value;
    },
    validateForm: (
      state,
      action: PayloadAction<{
        loginData: valueObj;
      }>
    ) => {
      const regex = /^\S{5,}$/;
      const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/;
      let err = false;
      if (!regex.test(action.payload.loginData.username)) {
        state.error.username = {
          errMsg: "Enter a valid username of atleast 5 charecters",
          valid: false,
        };
        err = true;
      }
      if (!emailRegex.test(action.payload.loginData.email)) {
        state.error.email = {
          errMsg: "Enter a valid email",
          valid: false,
        };
        err = true;
      }
      if (!regex.test(action.payload.loginData.password)) {
        state.error.password = {
          errMsg: "Enter a valid password of atleast 5 charecters",
          valid: false,
        };
        err = true;
      }
      state.textInputErr = err;
    },
    setSignUpLoad: (state, _action: PayloadAction<boolean>) => {
      state.signUpLoad = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state, _action) => {
      (state.value = {
        username: "",
        password: "",
        email: "",
      }),
        (state.error = {
          username: {
            valid: true,
            errMsg: "",
          },
          email: {
            valid: true,
            errMsg: "",
          },
          password: {
            valid: true,
            errMsg: "",
          },
        });
      state.textInputErr = false;
      state.showComponent = false;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        if (action.payload.message === "notLogin") {
          state.showComponent = true;
        }
      }
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.signUpLoad = false;
      if (
        action.payload !== undefined &&
        action.payload.message !== "signUpError"
      ) {
        if (!state.textInputErr) {
          state.value = {
            username: "",
            password: "",
          };
        }
      }
    });
  },
});

export default SignUpPageSlice.reducer;
export const { setFormData, validateForm, setSignUpLoad } =
  SignUpPageSlice.actions;
