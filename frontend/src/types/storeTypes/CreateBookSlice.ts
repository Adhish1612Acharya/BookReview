import { NavigateFunction } from "react-router-dom";

export interface valueObj {
  [key: string]: string;
}

export interface errorKeyParams {
  errMsg: string;
  valid: boolean;
}

export interface errorObj {
  [key: string]: errorKeyParams;
}

export interface statObj {
  value: valueObj;
  errors: errorObj;
  textInptError: boolean;
  imagePreview: any;
  submitLoad: boolean;
  showComponent: boolean;
  navLogin: boolean;
  logOutLoad: boolean;
}

export interface payLoad {
  imageFile: File | "";
  navigate: NavigateFunction;
}
