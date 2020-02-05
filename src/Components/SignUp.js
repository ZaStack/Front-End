import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";

let SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("This field is required."),
  username: yup
    .string()
    .min(4, "Username is too short.")
    .required("This field is required"),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
  streetAddress: yup.string().required("This field is required."),
  city: yup.string().required("This field is required."),
  zipcode: yup.string().required("This field is required."),
  businessName: yup.string()
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 10,
    color: theme.palette.secondary.main
  }
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            streetAddress: "",
            city: "",
            zipcode: "",
            businessName: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log("Values", values);
            axios
              .post(
                "https://block-party-calendar.herokuapp.com/api/users/register",
                values
              )
              .then(response => {
                console.log("POST response", response);
              })
              .catch(err => console.log("Submit failure", err));
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email *"
                    autoFocus
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="username"
                    label="Username *"
                    name="username"
                    autoComplete="lname"
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="password"
                    type="password"
                    label="Password *"
                    name="password"
                    autoComplete="password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.streetAddress && touched.streetAddress}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="streetAddress"
                    label="Street Address *"
                    type="streetAddress"
                    id="streetAddress"
                    autoComplete="current-streetAddress"
                    helperText={
                      errors.streetAddress && touched.streetAddress
                        ? errors.streetAddress
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.city && touched.city}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="city"
                    label="City *"
                    type="city"
                    id="city"
                    autoComplete="current-city"
                    helperText={
                      errors.city && touched.city ? errors.city : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.zipcode && touched.zipcode}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="zipcode"
                    label="Zipcode *"
                    type="zipcode"
                    id="zipcode"
                    autoComplete="current-zipcode"
                    helperText={
                      errors.zipcode && touched.zipcode ? errors.zipcode : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.businessName && touched.businessName}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="businessName"
                    label="Business Name"
                    type="businessName"
                    id="businessName"
                    placeholder="Optional"
                    autoComplete="current-businessName"
                    helperText={
                      errors.businessName && touched.businessName
                        ? errors.businessName
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUp;
