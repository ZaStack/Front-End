import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import EventList from "./Components/EventList";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF7518"
    },
    secondary: {
      main: "#F8F7DC"
    },
    info: {
      main: "#E8E8E8"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/account"></Route>
            <Route path="/eventlist">
              <EventList />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
