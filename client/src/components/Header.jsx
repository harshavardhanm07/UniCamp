// import { Navbar, Dropdown, Avatar,Button, Flowbite } from "flowbite-react";
// import Logo from "../Logo1.png";
// import { Link } from "react-router-dom";
// export default function Header() {

//   return (
//     <Navbar fluid className=" bg-blue-900">
//       <Navbar.Brand href="/">
//         <img src={Logo} className="mr-3 h-6 sm:h-9 rounded-full" alt="UniCampLogo" />
//         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//           UniCamp
//         </span>
//       </Navbar.Brand>
//       <div className="flex md:order-2">
//         <Dropdown
//           arrowIcon={false}
//           inline
//           label={<Avatar alt="User Profile" img={Logo} rounded />}
//         >
//           <Dropdown.Header>
//             <span className="block text-sm">Username</span>
//             <span className="block truncate text-sm font-medium">
//               name@flowbite.com
//             </span>
//           </Dropdown.Header>
//           <Dropdown.Item>Profile</Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item>Logout</Dropdown.Item>
//         </Dropdown>
//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link href="/" active>
//           Home
//         </Navbar.Link>
//         <Navbar.Link href="/dashboard" active>
//           dashboard
//         </Navbar.Link>
//         <Navbar.Link href="/blogs" active>
//           Blogs
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }


import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Logo from "../Logo1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";
import BASE_URL from "../config";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(BASE_URL + "/auth/logout", {
      withCredentials: true,

    }).then((response) => {
          localStorage.setItem("isLoggedIn", false);
          navigate("/");
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });

  };

  return (
    <Navbar fluid className="bg-blue-900 py-4">
      <Navbar.Brand href="/">
        <img
          src={Logo}
          className="mr-3 h-8 sm:h-10 rounded-full"
          alt="UniCamp Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white custom-font">
          UniCamp
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User Profile" img={Logo} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Username</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="items-center justify-between">
        <Navbar.Link as={Link} to="/" className="nav-link" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/dashboard" className="nav-link">
          Dashboard
        </Navbar.Link>
        <Navbar.Link as={Link} to="/blogs" className="nav-link">
          Blogs
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
