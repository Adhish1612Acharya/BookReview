import { CircularProgress } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getBookDetails,
  editBook,
  fileReader,
  setInputData,
  validation,
} from "../../store/features/user/EditBookSlice";
import NavBar from "../../components/NavBar";
import BookForm from "../../components/BookForm";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { id } = params as { id: string };
  return { id };
};

const EditBook: FC = () => {
  const { id } = useLoaderData() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector((state) => state.editPage.showComponent);
  const navLogin = useAppSelector((state) => state.editPage.navLogin);
  const value = useAppSelector((state) => state.editPage.value);
  const errors = useAppSelector((state) => state.editPage.errors);
  const imagePreview = useAppSelector((state) => state.editPage.imagePreview);
  const submitLoad = useAppSelector((state) => state.editPage.submitLoad);
  const logoutLoad = useAppSelector((state) => state.home.logoutLoad);

  const [imageFile, setImageFile] = useState<File | "">("");

  let setTextInput = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.type === "file") {
      const file =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : "";
      setImageFile(file);
      const reader = new FileReader();
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = () => {
        dispatch(fileReader(reader.result));
      };
      const imageValue =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0].name
          : "";
      dispatch(setInputData({ name: event.target.name, value: imageValue }));
    } else {
      dispatch(
        setInputData({ name: event.target.name, value: event.target.value })
      );
    }
  };

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    dispatch(validation({ data: value }));
    dispatch(editBook({ imageFile, navigate, id }));
  };

  useEffect(() => {
    dispatch(getBookDetails({ navigate, id }));
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        {showComponent ? (
          <>
            {!logoutLoad ? (
              <>
                <NavBar navigate={navigate} login={navLogin} />
                <h1 style={{ textAlign: "center" }}>Edit Your&nbsp;</h1>
                <AutoStoriesRoundedIcon fontSize="large" />

                <BookForm
                  value={value}
                  error={errors}
                  imagePreview={imagePreview}
                  setTextInput={setTextInput}
                  submitFunction={submit}
                  submitLoad={submitLoad}
                  edit={true}
                />
              </>
            ) : (
              <CircularProgress />
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </ThemeProvider>
    </>
  );
};

export default EditBook;
