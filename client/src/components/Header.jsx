// import { useState, useEffect, useContext } from "react";
// import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
// import Logo from "../Logo1.png";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "../css/Header.css";
// import axios from "axios";
// import BASE_URL from "../config";
// import { AuthContext } from "../context/logincontext";

// export default function Header() {
//   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/auth/logout`, {
//         withCredentials: true,
//       });
//       localStorage.setItem("isLoggedIn", "false");
//       setIsLoggedIn(false);
//       navigate("/");
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Navbar
//       fluid
//       className={`navbar-fixed navbar-fixed-height bg-blue-900 px-4 ${
//         isLoggedIn ? "py-2" : "pt-3"
//       } `}
//     >
//       <Navbar.Brand href="/">
//         <img
//           src={Logo}
//           className="mr-3 navbar-brand-logo rounded-full"
//           alt="UniCamp Logo"
//         />
//         <span className="self-center whitespace-nowrap text-xl font-semibold custom-font no-underline">
//           UniCamp
//         </span>
//       </Navbar.Brand>
//       <div className="flex md:order-2 ">
//         {isLoggedIn ? (
//           <>
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={
//                 <Avatar
//                   alt="User Profile"
//                   img={Logo}
//                   rounded
//                   className="hover:shadow-lg shadow-blue-50"
//                 />
//               }
//             >
//               <Dropdown.Header>
//                 <span className="block text-sm">Username</span>
//                 <span className="block truncate text-sm font-medium">
//                   name@flowbite.com
//                 </span>
//               </Dropdown.Header>
//               <Dropdown.Item as={Link} to="/profile" className=" no-underline">
//                 Profile
//               </Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown>
//             <Button className="navbar-custom-button" onClick={handleLogout}>
//               <span className="navbar-custom-button-text">Logout</span>
//             </Button>
//           </>
//         ) : (
//           <Button
//             as={Link}
//             to="/login"
//             className="navbar-custom-button no-underline "
//           >
//             <span className="navbar-custom-button-text">Sign In</span>
//           </Button>
//         )}
//         <Navbar.Toggle />
//       </div>
//       {isLoggedIn && (
//         <Navbar.Collapse className="navbar-collapse-custom">
//           <Navbar.Link as={Link} to="/" className="nav-link ">
//             <span className=" text-lg">Home</span>
//           </Navbar.Link>
//           <Navbar.Link as={Link} to="/dashboard" className="nav-link">
//            <span className=" text-lg">Dashboard</span>
//           </Navbar.Link>
//           <Navbar.Link as={Link} to="/blogs" className="nav-link">
//             <span className=" text-lg">Blogs</span>
//           </Navbar.Link>
//         </Navbar.Collapse>
//       )}
//     </Navbar>
//   );
// }

import { useState, useEffect, useContext } from "react";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Logo from "../assets/images/Logo1.png";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";
import BASE_URL from "../config";
import { AuthContext } from "../context/logincontext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const username = JSON.parse(localStorage.getItem("username"));

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      fluid
      className={`navbar-fixed navbar-fixed-height bg-blue-900 px-4 ${
        isLoggedIn ? "py-2" : "pt-3"
      }`}
    >
      <Navbar.Brand href="/">
        <img
          src={Logo}
          className="mr-3 navbar-brand-logo rounded-full"
          alt="UniCamp Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold custom-font no-underline">
          UniCamp
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {isLoggedIn ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User Profile"
                  
                  rounded
                  className="hover:shadow-lg shadow-blue-50"
                >
                  {/* {username ? username.charAt(0).toUpperCase() : "P"} */}
                </Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{username}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/profile" className="no-underline">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
            <Button
              className="navbar-custom-button text-blue-900 "
              onClick={handleLogout}
            >
              <span className="navbar-custom-button-text">Logout</span>
            </Button>
          </>
        ) : (
          <Button
            as={Link}
            to="/login"
            className="navbar-custom-button no-underline text-black"
          >
            <span className="navbar-custom-button-text">Sign In</span>
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      {isLoggedIn && (
        <Navbar.Collapse className="navbar-collapse-custom">
          <Navbar.Link as={Link} to="/" className="nav-link">
            <span className="text-lg">Home</span>
          </Navbar.Link>
          <Navbar.Link as={Link} to="/dashboard" className="nav-link">
            <span className="text-lg">Dashboard</span>
          </Navbar.Link>
          <Navbar.Link as={Link} to="/blogs" className="nav-link">
            <span className="text-lg">Blogs</span>
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
