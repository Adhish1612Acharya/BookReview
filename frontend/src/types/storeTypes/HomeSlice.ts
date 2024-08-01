import { NavigateFunction } from "react-router-dom";
import { bookObj } from "../routesTypes/user/HomePage";

export interface homeState {
  showComponent: boolean;
  navLogin: boolean;
  books: bookObj[];
  logoutLoad: boolean;
}

export interface Payload {
  navigate: NavigateFunction;
}
