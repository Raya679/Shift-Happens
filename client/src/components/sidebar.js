import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const SideBar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const links = [
    {
      name: "Home",
      path: "/home",
      info: "View your overall progress and insights.",
    },
    {
      name: "Personal Goals",
      path: "/goals",
      info: "Set and manage your personal goals.",
    },
    {
      name: "Mood Tracker",
      path: "/moods",
      info: "Track your mood and emotional well-being.",
    },
    {
      name: "Virtual Assistant",
      path: "/chatbot",
      info: "Chat with our virtual assistant for guidance.",
    },
    {
      name: "Meditation",
      path: "/meditate",
      info: "Practice guided meditation to enhance focus and reduce stress.",
    },
    {
      name: "Community Page",
      path: "/posts",
      info: "Connect with others in the community.",
    },
  ];

  return (
    <div className="bg-slate-900 text-white w-64 h-screen fixed left-0 top-0 flex flex-col p-6 shadow-lg transition-transform duration-300 z-50">
      <h1 className="text-2xl font-bold mb-8 text-center">Shift Happens</h1>
      <nav className="flex flex-col flex-grow">
        {links.map((link, index) => (
          <div className="relative group" key={index}>
            <Link
              to={link.path}
              className="py-3 px-4 hover:bg-gray-800 rounded-lg transition duration-150 flex items-center"
            >
              <span className="text-lg">{link.name}</span>
            </Link>
            <span className="absolute left-full ml-2 w-48 bg-gray-700 text-white text-sm rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-60">
              {link.info}
            </span>
          </div>
        ))}
      </nav>
      <button
        onClick={handleClick}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default SideBar;
