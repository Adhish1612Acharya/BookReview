import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  payLoad,
  statObj,
  valueObj,
} from "../../../types/storeTypes/LoginSlice";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { server } from "../../../server";

const initialState: statObj = {
  showComponent: false,
  value: {
    username: "",
    password: "",
  },
  error: {
    username: {
      valid: true,
      errMsg: "",
    },
    password: {
      valid: true,
      errMsg: "",
    },
  },
  textInputErr: false,
  loginLoad: false,
};

export const checkLogin = createAsyncThunk(
  "/loginCheck",
  async (navigate: NavigateFunction, _thunkAPI) => {
    const response = await axios.get(`${server}/api/user/loginCheck`, {
      withCredentials: true,
    });
    console.log(response);
    if (response.data.message === "loggedIn") {
      toast.warn("You are already logged in");
      navigate("/");
    } else if (response.data.message === "notLogin") {
      return response.data;
    }
  }
);

export const login = createAsyncThunk(
  "/loginRoute",
  async ({ value, navigate }: payLoad, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const textIputError = state.loginPage.textInputErr;
      if (!textIputError) {
        thunkAPI.dispatch(setLoginLoad(true));
        const response = await axios.post(`${server}/api/user/login`, value, {
          withCredentials: true,
        });
        console.log(response);
        console.log(response);
        if (response.data.loginStatus === "successLogin") {
          navigate(`${response.data.redirect}`);
          toast.success("Logged in successfully ");
        } else if (response.data.loginStatus === "directLogin") {
          navigate(`${response.data.redirect}`);
          toast.success("Logged in successfully ");
        } else if (response.data.message === "failureLogin") {
          toast.error("Either username or password is not valid");
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

export const LoginPageSlice = createSlice({
  name: "loginPage",
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
      let err = false;
      if (!regex.test(action.payload.loginData.username)) {
        state.error.username = {
          errMsg: "Enter a valid username of atleast 5 charecters",
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
    setLoginLoad: (state, action: PayloadAction<boolean>) => {
      state.loginLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state, _action) => {
      (state.value = {
        username: "",
        password: "",
      }),
        (state.error = {
          username: {
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

    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoad = false;
      console.log(action.payload);
      if (
        action.payload === undefined ||
        (action.payload.message && action.payload.message !== "failureLogin")
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

export default LoginPageSlice.reducer;
export const { setFormData, validateForm, setLoginLoad } =
  LoginPageSlice.actions;
