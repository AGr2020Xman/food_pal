import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";

import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../../store";
import { setUserLogout } from "../../actions";

// function Navbar() {

//   return (
//     <nav className="navbar navbar-expand-lg">
//       <div
//         className="collapse navbar-collapse d-flex justify-content-end"
//         id="navbar1"
//       >
//         {state.isAuthenticated ? userLink : loginRegLink}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

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
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useAppContext();

  const handleLogOut = (e) => {
    e.preventDefault();
    console.log("dispatch in handleLogout", dispatch);
    console.log(state);
    setUserLogout(dispatch);
    setTimeout(() => {
      history.push("/");
    }, 2500);
  };

  console.log({ state });

  const loginRegLink = (
    <ul className="navbar-nav list-group list-group-horizontal">
      <li>
        <Button color="secondary" variant="contained" href="/">
          Home
        </Button>
      </li>
      <li>
        <Button color="inherit" variant="contained" href="/signin">
          Sign in
        </Button>

        {/* <Link className="mb-1 mr-1 btn btn-sm active" to="/signin">
                    Sign in
                </Link> */}
      </li>
      <li>
        <Button color="inherit" variant="contained" href="/signup">
          Sign up
        </Button>

        {/* <Link className="btn btn-sm active" to="/signup">
                    Sign Up
                </Link> */}
      </li>
    </ul>
  );
  const userLink = (
    <ul
      className={`navbar-nav list-group list-group-horizontal ${classes.menuButton}`}
    >
      <li>
        <Button color="inherit" variant="contained" href="/">
          Home
        </Button>
        {/* 
                <Link className="mb-1 mr-1 btn btn-sm active" to="/">
                    Home
                </Link> */}
      </li>
      <li>
        <button
          className="btn btn-sm active"
          id="logoutBtn"
          data-toggle="modal"
          data-target="#logoutModal"
          onClick={handleLogOut}
        >
          <div>Sign out</div>
        </button>
      </li>
    </ul>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          <Typography variant="h6" className={classes.title}>
            FoodPal
          </Typography>
          {state.isAuthenticated ? userLink : loginRegLink}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="container">
//         <h2>FoodPal</h2>
//       </div>
//     </div>
//   );
// };

// import React from "react";
// // import Navbar from "react-bootstrap/Navbar";
// import { Link } from 'react-router-dom';

// const Nav = () => {
//   return (
//     <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
//       <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse className="justify-content-end">
//         <Navbar.Text>
//           Signed in as: <a href="#login">Mark Otto</a>
//         </Navbar.Text>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// import { Link, useHistory } from 'react-router-dom';
// import { useAppContext } from '../../store';
// import { useLoginCheck, logout } from '../../utils/setAuthToken';
// // import './style.css';

// function Navbar() {
//     const history = useHistory();
//     const [state, dispatch] = useAppContext();

//     useLoginCheck(dispatch);

//     const handleLogOut = (e) => {
//         e.preventDefault();
//         logout(dispatch);
//         history.push('/');
//     };

//     const loginRegLink = (
//         <ul className="navbar-nav list-group list-group-horizontal">
//             <li>
//                 <Link className="mb-1 mr-1 btn btn-sm active" to="/login">
//                     Login
//                 </Link>
//             </li>
//             <li>
//                 <Link className="btn btn-sm active" to="/register">
//                     Register
//                 </Link>
//             </li>
//         </ul>
//     );
//     const userLink = (
//         <ul className="navbar-nav list-group list-group-horizontal">
//             <li>
//                 <Link className="mb-1 mr-1 btn btn-sm active" to="/">
//                     Home
//                 </Link>
//             </li>
//             <li>
//                 <Link className="mb-1 mr-1 btn btn-sm active" to="/dashboard">
//                     Dashboard
//                 </Link>
//             </li>
//             <li>
//                 <button
//                     className="btn btn-sm active"
//                     id="logoutBtn"
//                     data-toggle="modal"
//                     data-target="#logoutModal"
//                     onClick={handleLogOut}
//                 >
//                     <div>Logout</div>
//                 </button>
//             </li>
//         </ul>
//     );
//     return (
//         <nav className="navbar navbar-expand-lg">
//             <div className="collapse navbar-collapse d-flex justify-content-end" id="navbar1">
//                 {state.isAuthenticated ? userLink : loginRegLink}
//             </div>
//         </nav>
//     );
// }
