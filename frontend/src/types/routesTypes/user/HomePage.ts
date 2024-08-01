export interface userObj {
  username: string;
}

interface reviewObj {
  rating: number;
  description: string;
  author: {
    username: string;
  };
}

export interface bookObj {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  publisher: userObj;
  reviews: reviewObj[];
}
