import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  }
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
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
                    error={errors.username && touched.username}
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
