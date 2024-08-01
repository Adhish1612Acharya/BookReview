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

export default interface signUpFormProps {
  setTextField: functionType1;
  signUpFunction: functionType2;
  value: valueObj;
  error: error;
  signUpLoad: boolean;
}
