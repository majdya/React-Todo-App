import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/views/Signup";
import Signin from "./components/views/Signin";

export const router = createBrowserRouter([
  { path: "", element: <App /> },
  { path: "signup", element: <Signup /> },
  { path: "signin", element: <Signin /> },
  //   { path: "todo", element: <App /> },
]);
