import { userDocument } from "../models/User";

declare global {
  namespace Express {
    interface User extends userDocument {
      _id: string;
    }
  }
}

export interface Users {
  _id: string;
}
