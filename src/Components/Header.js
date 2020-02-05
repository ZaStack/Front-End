import React from "react";
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";

const styles = {
    root: 
}
const Header = () => {
  return (
    <React.Fragment>
      <AppBar >
        <Toolbar component="AppBar">
          <Typography variant="h6">BlockClub Calendar</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
