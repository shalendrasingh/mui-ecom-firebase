import "./App.css";
import { Button } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );
  window.store = store;
  return(
     <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  )
}

export default App;
