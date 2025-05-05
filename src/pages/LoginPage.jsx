import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/operations";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import ProductPage from "./ProductPage";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const dispatch = useDispatch();
  //   const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

 
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Lütfen maili giriniz").required("Zorunlu"),
    password: Yup.string().min(2, "en az 2 karakterli").required("zorunlu"),
  });

  const loginSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <div>
      {isLoggedIn ? (
        <ProductPage />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginSubmit}
        >
          <Form>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="e-mail giriniz"
            />
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="parolayı giriniz"
            />
          <button type="submit" >Giriş yap</button>
          </Form>
          
        </Formik>
      )}
    </div>
  );
}
