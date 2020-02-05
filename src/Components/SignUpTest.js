import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  username: yup.string().required("This field is required."),
  email: yup
    .string()
    .email()
    .required("This field is required."),
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   console.log("status has changed!", props.status);
  //   props.status && setUsers(users => [...users, props.status]);
  // }, [props.status]);
  const FormSubmit = (
    values,
    { setSubmitting, resetForm, setStatus, status }
  ) => {
    console.log(values);
    axios
      .post(
        "https://block-party-calendar.herokuapp.com/api/users/register",
        values
      )
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        // localStorage.setItem(res.data.token)  // Store Access Token
        //this.props.history.push('/dashboard') // Redirect to Dashboard
        setUsers(users => [...users, status]);
        console.log("these are the users", users);
        resetForm();
      })
      .catch(error => console.log(error.response, "Didn't work"));
    // .finally(() => {
    //   setSubmitting(false);
    //props.history.push(`/signin`);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={FormSubmit}
          // setUsers(users => [...users, values]);
          // setStatus(res.data);
          // localStorage.setItem(res.data.token)  // Store Access Token
          // this.props.history.push('/dashboard') // Redirect to Dashboard
          //setStatus(res.data);
          //resetForm();
          // console.log("These are the users", users);
        >
          {({ errors, handleChange, touched, status }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errors.name && touched.name}
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="name"
                    label="Name"
                    autoFocus
                    helperText={
                      errors.name && touched.name ? errors.name : null
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
                    label="username"
                    name="username"
                    autoComplete="uname"
                    // value= "username"
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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