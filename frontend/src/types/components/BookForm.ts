import { ChangeEvent, FormEvent } from "react";

type functionType1 = (event: ChangeEvent<HTMLInputElement>) => void;

type functionType2 = (event: FormEvent<HTMLFormElement>) => void;

interface valueObj {
  [key: string]: string;
}

interface errorParams {
  valid: boolean;
  errMsg: string;
}

interface error {
  [key: string]: errorParams;
}

export default interface bookFormProps {
  setTextInput: functionType1;
  submitFunction: functionType2;
  value: valueObj;
  error: error;
  submitLoad: boolean;
  imagePreview: string;
  edit: boolean;
}
