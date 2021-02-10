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

import React from "react";
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

const Navbar = () => {
  return (
    <div className="nav">
      <div className="container">
        <h2>FoodPal</h2>
      </div>
    </div>
  );
};

export default Navbar;
