import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Button
} from "@material-ui/core";

import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";

let SigninSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username is too short.")
    .required("This field is required"),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required.")
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
    margin: theme.spacing(1)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.secondary.main,
    borderRadius: 10
  },
  input: {
    backgroundColor: theme.palette.info.main
  },
  pageTitle: {
    marginTop: 16
  }
}));

const SignIn = () => {
  const classes = useStyles();
  const [toNext, setToNext] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h4" className={classes.pageTitle}>
        Login Page
      </Typography>
      <div className={classes.paper}>
        <Typography>Please enter your information below to login.</Typography>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={SigninSchema}
          onSubmit={values => {
            console.log("Values", values);
            axios
              .post(
                "https://block-party-calendar.herokuapp.com/api/users/login",
                values
              )
              .then(response => {
                console.log("POST response", response);
                setToNext(true);
              })
              .catch(err => console.log("Submit failure", err));
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              {toNext ? <Redirect to="/eventlist" /> : null}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="username"
                    label="Username"
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
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
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
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignIn;
