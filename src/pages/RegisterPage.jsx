import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/operations";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("geçerli mail giriniz").required("zorunlu"),
    password: Yup.string()
      .min(6, "sifre en az 6 karakterli olmalıdır")
      .max(12, "şifre max 15 karakter olmalıdır")
      .required("zorunlu"),
  });

  const registerSubmit = (values) => {
    dispatch(register(values));
    console.log(values);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={registerSubmit}
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
            placeholder="parola giriniz"
          />
          <button type="submit" >Kayıt ol</button>
        </Form>
      </Formik>
    </div>
  );
}
