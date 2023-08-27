import React, { useState } from "react";
import { Formik } from "formik";
import TextInputFieldFormik from "../../components/forms/TextInput";
import "bootstrap/dist/css/bootstrap.css";
import { CSSProperties } from "@mui/material/styles/createTypography";
import { httpPostRequest } from "../../https/api";
import { useRouter } from "next/router";
import { backEndUrl } from "../../commons/url.constant";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setTokenValue } from "../../redux/slices/token.slice";
import { LoginParams, loginAsycThunk } from "../../redux/thunks/token.thunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getToken } from "../../redux/selectors/token.selector";

const initialLoginValue = {
  email: "",
  password: "",
};

const stlForm: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "50%",
};


export default function Login() {
  const router = useRouter();
  const thunkDispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const token = useSelector(getToken);
  useEffect(() => {
    if (token) {
      router.replace("/");
      alert("you logined");
    }
  }, [token]);
  const handleOnSubmit = (value: LoginParams) => {
    const date = new Date();
    const expiresAt = date.getTime() + 60 * 1000 * 60 * 24 * 30;
    thunkDispatch(loginAsycThunk(value));
  };
  return (
    <div className="container">
      <center style={{ marginTop: "25px" }}>
        <h1>LOGIN</h1>
      </center>
      <Formik
        initialValues={initialLoginValue}
        validationSchema={Yup.object().shape({
          email: Yup.string().required("fasd"),
          password: Yup.string().required("required"),
        })}
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
      >
        {(formik) => (
          <form
            style={{ display: "flex", justifyContent: "center" }}
            onSubmit={formik.handleSubmit}
          >
            <div style={stlForm}>
              <TextInputFieldFormik
                label={"Email"}
                name={"email"}
                placeHolder={"nhập vào email của bạn"}
                formik={formik}
              />
              {formik.touched.email && formik.errors.email && "fashjsd"}
              <TextInputFieldFormik
                label={"Password"}
                name={"password"}
                placeHolder={"nhập vào password"}
                type={"password"}
                formik={formik}
              />
              {formik.touched.password && formik.errors.password && "fashjsd"}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginTop: "15px", width: "120px" }}
                >
                  login
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
