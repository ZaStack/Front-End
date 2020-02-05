import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const axios = require("axios");

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#F8F7DC",
    backgroundColor: "#FF7518",
    borderRadius: "10px"
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  console.log("entryHandler", creds);

  const entryHandler = e => {
    let value = e.target.value;
    setCreds({
      ...creds,
      [e.target.name]: value
    });
  };

  const FormSubmit = e => {
    e.preventdefault();
    axios
      .post("https://block-party-calendar.herokuapp.com/api/users/login")
      .then(response => {
        console.log("login", response);
      })
      .catch(error => {
        console.log("login Error", error);
        return <h3>Username/Password Incorrect</h3>;
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={FormSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={creds.username}
            onChange={entryHandler}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={creds.password}
            onChange={entryHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
