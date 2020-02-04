import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
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
    color: "#F8F7DC",
    backgroundColor: "#FF7518",
    borderRadius: "10px"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const FormSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    axios
      .post("https://block-party-calendar.herokuapp.com/api/users/register")
      .then(response => {
        console.log(props);
        resetForm({});
      })
      .catch(error => console.log(error.response, "Didn't work"))
      .finally(() => {
        setSubmitting(false);
        props.history.push(`/signin`);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={FormSubmit}
        >
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Userame"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? "Creating..." : "Sign Up"}
            </Button>
            <Grid container justify="flex-end"></Grid>
          </form>
        </Formik>
      </div>
    </Container>
  );
}

// const customInput = ({ field, form: { touched, errors }, ...props }) => (
//   <div>
//     <Input
//       invalid={!!(touched[field.name] && errors[field.name])}
//       {...field}
//       {...props}
//     />
//     {touched[field.name] && errors[field.name] && (
//       <FormFeedback>{errors[field.name]}</FormFeedback>
//     )}
//   </div>
// );

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(14, "Username cannot exceed 14 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is Required")
});
