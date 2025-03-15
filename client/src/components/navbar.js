import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="sticky z-10 w-full top-0 bg-slate-900 shadow-xl flex p-3 py-3 justify-between items-center">
      <div className="flex items-center m-0">
        <img src="brain.png" alt="Logo" className="h-16" />
      </div>

      <div className="flex-grow flex justify-center">
        <div className="flex space-x-10">
          <a
            href="/"
            className="text-xl font-bold transition ease-out duration-500 text-white"
            aria-label="Home"
          >
            Home
          </a>
          <a
            href="/aboutus"
            className="text-xl font-bold transition ease-out duration-500 text-white"
            aria-label="About Us"
          >
            About Us
          </a>
          <a
            href="/contactus"
            className="text-xl font-bold transition ease-out duration-500 text-white"
            aria-label="Contact Us"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="flex items-center text-white">
        {user ? (
          <>
            <Link
              to="/profile"
              className="mx-10 text-xl font-bold transition ease-out duration-500"
              aria-label="Go to Profile"
            >
              Welcome {user.username}
            </Link>
            <a
              href="/chatbot"
              className="mx-10 text-xl font-bold transition ease-out duration-500"
              aria-label="Open Chatbot"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              Chatbot
            </a>
            <button
              onClick={handleClick}
              className="mx-10 text-xl font-bold transition ease-out duration-500 text-white"
              aria-label="Logout"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/signup">
            <button className="bg-slate-700 hover:bg-slate-600 mr-7 text-white font-bold py-2 px-4 rounded transition ease-out duration-500">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
