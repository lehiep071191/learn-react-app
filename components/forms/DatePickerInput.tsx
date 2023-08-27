import React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, SxProps, Theme, Typography } from "@mui/material";
import * as _ from "lodash";
import { FormikProps, useField } from "formik";

const stylesLabel: SxProps<Theme> = {
  fontSize: "14px",
  fontWeight: "bold",
  mt: "5px",
};

interface FieldProps {
  label: string;
  name: string;
  placeHolder: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  value?: string;
  formik: any;
}

const DatePickerInput = (props: FieldProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { label, name, placeHolder, formik } = props;
  return (
    <>
      <Grid item={true} xs={3} sx={stylesLabel}>
        <Typography variant="caption">{label}</Typography>
      </Grid>
      <Grid item={true} xs={7}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              formik.setFieldValue(name, newValue);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                placeholder={placeHolder}
                name={name}
                value={params.value}
                variant="standard"
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default React.memo(DatePickerInput);
