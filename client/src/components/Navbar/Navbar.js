import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../store";
import { setUserLogout } from "../../actions";
import { List } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useAppContext();

  const handleLogOut = (e) => {
    e.preventDefault();
    setUserLogout(dispatch);
    localStorage.clear();
    history.push("/");
  };

  // console.log({ state });

  const loginRegLink = (
    <List className={`${classes.menuButton} ${classes.navbarDisplayFlex}`}>
      <Button color="primary" variant="contained" href="/">
        Dashboard
      </Button>
      <Button color="secondary" variant="contained" href="/signin">
        Sign in
      </Button>
      <Button color="secondary" variant="contained" href="/signup">
        Sign up
      </Button>
    </List>
  );
  const userLink = (
    <List className={`${classes.menuButton} ${classes.navbarDisplayFlex}`}>
      <Button color="primary" variant="contained" href="/">
        Home
      </Button>
      <Button color="secondary" variant="contained" onClick={handleLogOut}>
        Sign out
      </Button>
    </List>
  );

  return (
    <AppBar position="relative" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          {/* <MenuIcon /> */}
          <TemporaryDrawer />
        </IconButton>
        <Typography variant="h6" className={classes.title} nowrap>
          FoodPal
        </Typography>
        {state.isAuthenticated ? userLink : loginRegLink}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
