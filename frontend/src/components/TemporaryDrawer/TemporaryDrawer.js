import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { useAppContext } from "../../store";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });
  const [authState, dispatch] = useAppContext();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ [anchor]: open });
  };

  const locationList1 = [
    { text: "Home", icon: <HomeIcon />, onClick: () => history.push("/") },
    {
      text: "Sign in",
      icon: <LockOpenIcon />,
      onClick: () => history.push("/signin"),
    },
    {
      text: "Sign up",
      icon: <VpnKeyIcon />,
      onClick: () => history.push("/signup"),
    },
    {
      text: "My lists",
      icon: <CreateNewFolderIcon />,
      onClick: () => history.push("/foodpal_list"),
    },
  ];
  const noAuth = (
    <List>
      {locationList1.map((item, index) => {
        const { text, icon, onClick } = item;

        return (
          <ListItem button key={text} onClick={onClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={`${text}`} />
          </ListItem>
        );
      })}
    </List>
  );

  const locationList2 = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      onClick: () => history.push("/home"),
    },
    {
      text: "My lists",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/foodpal_list"),
    },
  ];
  const authed = (
    <List>
      {locationList2.map((item, index) => {
        const { text, icon, onClick } = item;
        return (
          <ListItem button key={text} onClick={onClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={`${text}`} />
          </ListItem>
        );
      })}
    </List>
  );

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {authState.isAuthenticated ? authed : noAuth}
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton edge="start" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon color="inherit" />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
