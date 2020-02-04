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

const SignUp = props => {
  const classes = useStyles();

  const FormSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    axios
      .post(
        "https://block-party-calendar.herokuapp.com/api/users/register",
        values
      )
      .then(response => {
        console.log(response);
        resetForm({});
      })
      .catch(error => console.log("Data didn't go anywhere", error))
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
          initialValues={{
            username: "",
            password: "",
            email: "",
            streetAddress: "",
            city: "",
            zipcode: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={FormSubmit}
        >
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // component={customInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  // component={customInput}
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
                  // component={customInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="streetAddress"
                  label="Street Address"
                  type="streetAddress"
                  id="streetAddress"
                  // component={customInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  // component={customInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="zipcode"
                  label="Zipcode"
                  type="zipcode"
                  id="zipcode"
                  // component={customInput}
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
              onClick={() => FormSubmit}
            >
              {props.isSubmitting ? "Creating..." : "Sign Up"}
            </Button>
            <Grid container justify="flex-end"></Grid>
          </form>
        </Formik>
      </div>
    </Container>
  );
};

// const customInput = ({ field, form: { touched, errors }, ...props }) => (
//   <div>
//     <TextField
//       invalid={!!(touched[field.name] && errors[field.name])}
//       {...field}
//       {...props}
//     />
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

export default SignUp;
