import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import BookCard from "../../components/BookCard";
import { CircularProgress } from "@mui/material";
import { getUserBooks } from "../../store/features/user/HomeSlice";
import NavBar from "../../components/NavBar";
import "../../styles/Home.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";

const UserBooks: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector((state) => state.home.showComponent);
  const books = useAppSelector((state) => state.home.books);
  const navLogin = useAppSelector((state) => state.home.navLogin);
  const logOutLoad = useAppSelector((state) => state.home.logoutLoad);

  useEffect(() => {
    dispatch(getUserBooks(navigate));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {showComponent ? (
        !logOutLoad ? (
          <>
            <NavBar login={navLogin} navigate={navigate} />
            <h1>Your Books</h1>
            {books.length === 0 ? <h4>No books hosted yet</h4> : null}
            <div className="books">
              {books.map((book) => {
                return (
                  <a
                    href={`/books/${book._id}`}
                    style={{ textDecoration: "none" }}
                    key={book._id}
                  >
                    <BookCard book={book} userBook={true} />
                  </a>
                );
              })}
            </div>
          </>
        ) : (
          <CircularProgress />
        )
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
};

export default UserBooks;
