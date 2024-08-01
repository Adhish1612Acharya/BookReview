import { bookObj } from "../routesTypes/user/HomePage";

export interface reviewValueObj {
  [key: string]: string | number;
}

export interface bookStatObj {
  navLogin: boolean;
  showComponent: boolean;
  owner: boolean;
  bookInfo: bookObj;
  deleteLogin: boolean;
  openDrawer: boolean;
  openReviewForm: boolean;
  reviewValue: reviewValueObj;
  reviewError: {
    errMsg: string;
    valid: boolean;
  };
  reviewLoad: boolean;
  textInptError: boolean;
}
