import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("geçerli mail giriniz").required("zorunlu"),
    name: Yup.string().min(2, "En az 2 harfli isim").required("zorunlu"),
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
          <Field type="text" name="name" id="name" placeholder="isim giriniz" />
          <ErrorMessage name="name" component="div" />

          <Field
            type="email"
            name="email"
            id="email"
            placeholder="e-mail giriniz"
          />
          <ErrorMessage name="e-mail" component="div" />
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="parola giriniz"
          />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Kayıt ol</button>
        </Form>
      </Formik>
    </div>
  );
}
