import { ChangeEvent, FC, FormEvent, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  checkLogin,
  login,
  setFormData,
  validateForm,
} from "../../store/features/otherPages/LoginSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector(
    (state) => state.loginPage.showComponent
  );
  const value = useAppSelector((state) => state.loginPage.value);
  const error = useAppSelector((state) => state.loginPage.error);
  const loginLoad = useAppSelector((state) => state.loginPage.loginLoad);

  const setTextField = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormData({ name: event.target.name, value: event.target.value })
    );
  };

  const loginFunction = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      dispatch(validateForm({ loginData: value }));
      dispatch(login({ value, navigate }));
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred try refershing the page");
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(checkLogin(navigate));
  }, []);
  return (
    <>
      {showComponent ? (
        <>
          {" "}
          <NavBar login={false} navigate={navigate} />
          <LoginForm
            setTextField={setTextField}
            loginFunction={loginFunction}
            value={value}
            error={error}
            loginLoad={loginLoad}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Login;
