import React, { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { selectRefreshing } from "./redux/auth/selectors";
import ProductPage from "./pages/ProductPage";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { refresh } from "./redux/auth/operations";
export default function App() {
  const isRefreshing = useSelector(selectRefreshing);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <p>Refresh user</p>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/register"
            element={
              <RestrictedRoute
                direktGit="/products"
                element={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute direktGit="/products" element={<LoginPage />} />
            }
          />
          <Route
            path="products"
            element={<PrivateRoute direktGit="/" element={<ProductPage />} />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      )}
    </>
  );
}
