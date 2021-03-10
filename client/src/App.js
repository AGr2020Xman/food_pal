import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./components/Header/Header";
// import Button from "@material-ui/core/Button";
import Navbar from "./components/Navbar/Navbar";
// import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import StoredFoodDash from "./components/StoreFoodDash/StoreFoodDash";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Forgot from "./components/Forgot/Forgot";
import Reset from "./components/Reset/Reset";
import AddDash from "./components/AddFood/AddFood";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContextProvider } from "./store";
import PrivateRoute from "./Auth";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Activate from "./components/Activate/Activate";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div
          className="pl-5 pr-5 m-0 container-fluid"
          style={{
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "blue",
            // color: "whitesmoke",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="p-0 m-0 container-fluid">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/activate" component={Activate} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/forgot" component={Forgot} />
            <PrivateRoute component={Home} path="/home" exact />
            <PrivateRoute
              component={StoredFoodDash}
              path="/foodpal_list"
              exact
            />
            <PrivateRoute component={AddDash} path="/add_food" exact />
          </div>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
