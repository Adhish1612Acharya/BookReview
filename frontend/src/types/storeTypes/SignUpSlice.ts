import { NavigateFunction } from "react-router-dom";

export interface signUpFormProps {
  route: string;
}

export interface valueObj {
  [key: string]: string;
}

export interface errorParams {
  valid: boolean;
  errMsg: string;
}

export interface errorObj {
  [key: string]: errorParams;
}

export interface statObj {
  showComponent: boolean;
  value: valueObj;
  error: errorObj;
  textInputErr: boolean;
  signUpLoad: boolean;
}

export interface payLoad2 {
  navigate: NavigateFunction;
}

export interface payLoad {
  value: valueObj;
  navigate: NavigateFunction;
}
