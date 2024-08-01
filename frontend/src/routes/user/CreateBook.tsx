import { CircularProgress } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  checkLogin,
  createBook,
  fileReader,
  setInputData,
  validation,
} from "../../store/features/user/CreateBookSlice";
import NavBar from "../../components/NavBar";
import BookForm from "../../components/BookForm";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

const CreateBook: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector(
    (state) => state.createPage.showComponent
  );
  const navLogin = useAppSelector((state) => state.createPage.navLogin);
  const value = useAppSelector((state) => state.createPage.value);
  const errors = useAppSelector((state) => state.createPage.errors);
  const imagePreview = useAppSelector((state) => state.createPage.imagePreview);
  const submitLoad = useAppSelector((state) => state.createPage.submitLoad);
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
    dispatch(createBook({ imageFile, navigate }));
  };

  useEffect(() => {
    dispatch(checkLogin(navigate));
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        {showComponent ? (
          <>
            {!logoutLoad ? (
              <>
                <NavBar navigate={navigate} login={navLogin} />
                <h1 style={{ textAlign: "center" }}>Host Your&nbsp;</h1>
                <AutoStoriesRoundedIcon fontSize="large" />

                <BookForm
                  value={value}
                  error={errors}
                  imagePreview={imagePreview}
                  setTextInput={setTextInput}
                  submitFunction={submit}
                  submitLoad={submitLoad}
                  edit={false}
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

export default CreateBook;
