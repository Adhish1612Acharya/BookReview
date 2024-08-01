import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./routes/user/Home";
import ErrorPage from "./routes/otherPages/ErrorPage";
import Login from "./routes/otherPages/Login";
import SignUp from "./routes/otherPages/SignUp";
import CreateBook from "./routes/user/CreateBook";
import BookDetails from "./routes/user/BookDetails";
import { loader as bookInfoLoader } from "./routes/user/BookDetails";
import EditBook, { loader as editBookInfoLoader } from "./routes/user/EditBook";
import UserBooks from "./routes/user/UserBooks";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/books/add",
    element: <CreateBook />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/books/:id",
    element: <BookDetails />,
    loader: bookInfoLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/books/:id/edit",
    element: <EditBook />,
    loader: editBookInfoLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/your-books",
    element: <UserBooks />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        bodyClassName="toastBody"
        style={{ marginTop: "5rem" }}
      />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

      {/* <App /> */}
    </>
  );
} else {
  console.error("Root element not found");
}
