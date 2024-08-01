import { FC, useEffect } from "react";
import BookInfo from "../../components/BookInfo";
import NavBar from "../../components/NavBar";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import BookInfoBtns from "../../components/BookInfoBtns";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteBookDetail,
  getBookDetail,
  setOpenDrawer,
} from "../../store/features/user/BookDetailSlice";
import { CircularProgress } from "@mui/material";
import AddReview from "../../components/AddReview";
import ReviewDrawer from "../../components/ReviewDrawer";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { id } = params as { id: string };
  return { id };
};

const BookDetails: FC = () => {
  const { id } = useLoaderData() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector(
    (state) => state.bookInfoPage.showComponent
  );
  const navLogin = useAppSelector((state) => state.bookInfoPage.navLogin);
  const owner = useAppSelector((state) => state.bookInfoPage.owner);
  const bookDetail = useAppSelector((state) => state.bookInfoPage.bookInfo);
  const deleteLogin = useAppSelector((state) => state.bookInfoPage.deleteLogin);
  const logoutLoad = useAppSelector((state) => state.home.logoutLoad);
  const openForm = useAppSelector((state) => state.bookInfoPage.openReviewForm);
  const openDrawer = useAppSelector((state) => state.bookInfoPage.openDrawer);
  const reviewValue = useAppSelector((state) => state.bookInfoPage.reviewValue);
  const reviewLoad = useAppSelector((state) => state.bookInfoPage.reviewLoad);
  const reviewError = useAppSelector((state) => state.bookInfoPage.reviewError);

  useEffect(() => {
    dispatch(getBookDetail({ navigate, id }));
  }, []);

  const dispatchDeleteFunc = () => {
    dispatch(deleteBookDetail({ navigate, id }));
  };

  const disDrawer = (value: boolean) => {
    dispatch(setOpenDrawer(value));
  };

  return (
    <>
      {showComponent ? (
        !logoutLoad ? (
          <>
            <NavBar login={navLogin} navigate={navigate} />
            <ReviewDrawer
              review={bookDetail.reviews}
              drawerOpen={openDrawer}
              dispatchDrawer={disDrawer}
            />
            <AddReview
              openStatus={openForm}
              navigate={navigate}
              id={id}
              value={reviewValue}
              reviewLoad={reviewLoad}
              error={reviewError}
            />
            <BookInfoBtns
              owner={owner}
              deleteLogin={deleteLogin}
              dispatchDelete={dispatchDeleteFunc}
              dispatchDrawer={disDrawer}
              navigate={navigate}
              id={id}
            />
            <BookInfo book={bookDetail} />
          </>
        ) : (
          <CircularProgress />
        )
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default BookDetails;
