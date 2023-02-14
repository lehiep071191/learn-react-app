import React from "react";
import TextInputFieldFormik from "../../components/forms/TextInput";
import "bootstrap/dist/css/bootstrap.css";
import { CSSProperties } from "@mui/material/styles/createTypography";
import { httpPostRequest } from "../../https/api";
import { useRouter } from "next/router";
import { backEndUrl } from "../../commons/url.constant";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import DatePickerInput from "../../components/forms/DatePickerInput";
import { Formik } from "formik";
import { Button } from "@mui/material";

const initialValue = {
  email: "",
  name: "",
  password: "",
  birthDay: new Date(),
  address: "",
  userName: "",
};

const stlForm: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "50%",
};

export default function index() {
  const url = backEndUrl.signUpUrl;
  const handleOnSubmit = (values: any) => {
    httpPostRequest(url, values)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="container" style={{ marginBottom: "20px" }}>
        <center style={{ marginTop: "25px", marginBottom: "25px" }}>
          <h1>SIGNUP</h1>
        </center>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleOnSubmit(values)}
        >
          {(formik: any) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div style={stlForm}>
                <TextInputFieldFormik
                  label={"Email"}
                  name={"email"}
                  placeHolder={"nhập email"}
                  formik={formik}
                />
              </div>
              <div style={stlForm}>
                <TextInputFieldFormik
                  label={"Tên đăng nhập"}
                  name={"userName"}
                  placeHolder={"Nhập tên đăng nhập"}
                  formik={formik}
                />
              </div>
              <div style={stlForm}>
                <TextInputFieldFormik
                  label={"Tên"}
                  name={"name"}
                  placeHolder={"nhập tên"}
                  formik={formik}
                />
              </div>
              <div style={stlForm}>
                <TextInputFieldFormik
                  label={"Mật khẩu"}
                  name={"password"}
                  placeHolder={"nhập mật khẩu"}
                  type={"password"}
                  formik={formik}
                />
              </div>
              <div style={stlForm}>
                <DatePickerInput
                  label={"Sinh nhật"}
                  name={"birthDay"}
                  placeHolder={"sinh nhật"}
                  formik={formik}
                />
              </div>
              <div style={stlForm}>
                <TextInputFieldFormik
                  label={"Địa chỉ"}
                  name={"address"}
                  placeHolder={"nhập địa chỉ"}
                  type={"text"}
                  formik={formik}
                />
              </div>
              <Button sx={{ background: "skyblue" }} type={"submit"}>
                Đăng Ký
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
