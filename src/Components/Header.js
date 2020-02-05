import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    margin: 0
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    color: theme.palette.secondary.main
  },
  hamburger: {
    color: theme.palette.secondary.main
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            BlockClub Calendar
          </Typography>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            onClick={handleClick}
          >
            <MenuIcon className={classes.hamburger} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Sign In</MenuItem>
            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
            <MenuItem onClick={handleClose}>Sign Out</MenuItem>
            <MenuItem onClick={handleClose}>Account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
