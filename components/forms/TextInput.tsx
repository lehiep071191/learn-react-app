import React from "react";
import TextField from "@mui/material/TextField";
import { Grid, SxProps, Theme, Typography } from "@mui/material";
import * as _ from "lodash";

interface FieldProps {
  label: string;
  name: string;
  placeHolder: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  value?: string;
  formik: any;
}
const stylesLabel: SxProps<Theme> = {
  fontSize: "14px",
  fontWeight: "bold",
  mt: "5px",
};

const TextInputFieldFormik = function (props: FieldProps) {
  const { label, name, placeHolder, type, formik } = props;
  return (
    <>
      <Grid item={true} xs={3} sx={stylesLabel}>
        <Typography variant="caption">{label}</Typography>
      </Grid>
      <Grid item={true} xs={7}>
        <TextField
          fullWidth
          type={type}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={_.get(formik.values, name) || ""}
          placeholder={placeHolder}
          variant="standard"
        />
      </Grid>
    </>
  );
};

export default React.memo(TextInputFieldFormik);
