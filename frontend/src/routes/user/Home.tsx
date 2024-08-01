import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import BookCard from "../../components/BookCard";
import { CircularProgress } from "@mui/material";
import { getBooksData } from "../../store/features/user/HomeSlice";
import NavBar from "../../components/NavBar";
import "../../styles/Home.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector((state) => state.home.showComponent);
  const books = useAppSelector((state) => state.home.books);
  const navLogin = useAppSelector((state) => state.home.navLogin);

  useEffect(() => {
    dispatch(getBooksData(navigate));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {showComponent ? (
        <>
          <NavBar login={navLogin} navigate={navigate} />
          <div className="books">
            {books.map((book) => {
              return (
                <a
                  href={`/books/${book._id}`}
                  style={{ textDecoration: "none" }}
                  key={book._id}
                >
                  <BookCard book={book} />
                </a>
              );
            })}
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
};

export default Home;
