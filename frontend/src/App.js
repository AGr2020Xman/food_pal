import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FoodList from "./components/FoodList/FoodList";
// import Header from "./components/Header/Header";
// import Button from "@material-ui/core/Button";
import Navbar from "./components/Navbar/Navbar";
// import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Hero from "./components/Hero/Hero";
import "./App.css";

import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Forgot from "./components/Forgot/Forgot";
import Reset from "./components/Reset/Reset";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContextProvider } from "./store";
import Auth from "./Auth";

import "./App.css";
import Activate from "./components/Activate/Activate";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="pl-0 pr-0 m-0 container-fluid">
          <Navbar />
          <Route exact path="/" component={Home} />
          <div className="p-0 m-0 container-fluid">
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/activate" component={Activate} />
            {/* <Route exact path="/reset" component={Reset} /> */}
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/home" component={Auth(Home)} />
            {/* <Route exact path="/startUp" component={StartUp} /> */}
          </div>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;

// const App = () => {
//   return (
//     <main className="App">
//       <Router>
//         <Navbar />
//         {/* <Landing /> */}
//       </Router>
//     </main>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navigation />
//         <div className="container">
//           <Main />
//         </div>
//       </Router>
//     </div>
//   );
// }

// function Navigation() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
//       <div className="container">
//         <ul className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <NavLink exact className="nav-link" activeClassName="active" to="/">
//               Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               exact
//               className="nav-link"
//               activeClassName="active"
//               to="/articles"
//             >
//               Articles
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// function Main() {
//   return (
//     <Switch>
//       <Route exact path="/" component={Home} />
//       <Route exact path="/foodlist" component={FoodList} />
//       {/* <Route exact path="/articles/new" component={ArticleAdd} /> */}
//       {/* <Route exact path="/articles/:_id" component={ArticleInfo} /> */}
//       {/* <Route exact path="/articles/:_id/edit" component={ArticleEdit} /> */}
//     </Switch>
//   );
// }
