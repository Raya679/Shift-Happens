import { Link } from "react-router-dom";
import logo from "../pictures/logo.png";
//to identufy that the user is logged in
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useDataContext } from '../hooks/useDataContext';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  // const {data} = useDataContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="sticky z-10 w-full top-0 bg-slate-300 shadow-xl flex p-6  justify-between items-center">
      <div className="logo ml-7 ">
        <img src={logo} width={50} height={50} />
      </div>

      <div className="my-3 ">
        {user && (
          <>
            <Link
              to="/profile"
              className="mx-10 text-2xl font-bold  transition ease-out duration-500 font-serif mr-18"
            >
              <span>Welcome {user.username}</span>
            </Link>
            <Link
              to="/home"
              className="mx-10 text-2xl font-bold  transition ease-out duration-500 font-serif"
            >
              Home
            </Link>
            {/* <a href = "/signup">Sign Up</a> */}
            <a
              href="/chatbot"
              className="mx-10 text-2xl font-bold  transition ease-out duration-500 font-serif"
            >
              Chatbot
            </a>
            {/* <a href = "/contactus">Contact Us</a> */}
            <Link to="/">
              <button
                onClick={handleClick}
                className="mx-10 text-2xl font-bold  transition ease-out duration-500 font-serif"
              >
                Logout
              </button>
            </Link>
            {/* <Link to = "/mainform">
            <button onClick={handleClick}>F</button>
            </Link> */}
          </>
        )}

        {!user && (
          <>
            <a
              href="/"
              className="mx-10 text-2xl font-bold  transition ease-out duration-500 font-serif"
            >
              Home
            </a>
            <a
              href="/aboutus"
              className="mx-10 text-2xl font-bold transition ease-out duration-500 font-serif"
            >
              About Us
            </a>
            <a
              href="/contactus"
              className="mx-10 text-2xl font-bold transition ease-out duration-500 font-serif"
            >
              Contact Us
            </a>
            <a
              href="/signup"
              className="mx-10 text-2xl font-bold transition ease-out duration-500 font-serif"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
