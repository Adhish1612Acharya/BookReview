import { ChangeEvent, FC, FormEvent, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  checkLogin,
  setFormData,
  signUp,
  validateForm,
} from "../../store/features/otherPages/SignUpPageSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector(
    (state) => state.signUpPage.showComponent
  );
  const value = useAppSelector((state) => state.signUpPage.value);
  const error = useAppSelector((state) => state.signUpPage.error);
  const signUpLoad = useAppSelector((state) => state.signUpPage.signUpLoad);

  const setTextField = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormData({ name: event.target.name, value: event.target.value })
    );
  };

  const signUpFunction = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      dispatch(validateForm({ loginData: value }));
      dispatch(signUp({ value, navigate }));
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred try refershing the page");
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(checkLogin(navigate));
  }, []);
  return showComponent ? (
    <>
      <NavBar login={false} navigate={navigate} />
      <SignUpForm
        setTextField={setTextField}
        signUpFunction={signUpFunction}
        value={value}
        error={error}
        signUpLoad={signUpLoad}
      />
    </>
  ) : (
    <CircularProgress />
  );
};

export default SignUp;
