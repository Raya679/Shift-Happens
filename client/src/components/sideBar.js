import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

document.body.style = 'background: #cbd5e1';

const SideBar = () => {

    const { logout } = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => {
        logout();
      };

    return ( 
        <div className="sidebar">
            
              <h1>Shift Happens</h1>
              <Link to="/home" >
                <p>Dashboard</p>
              </Link>
              {/* <NavLink to="/home" activeClassName="active-link">
                <p>Dashboard</p>
              </NavLink> */}
              <Link to="/chatbot">
                <p>ChatBot</p>
              </Link>
              <Link to="/exercise">
                <p>Exercises</p>
              </Link>
              <Link to="/moods">
                <p>Mood Tracker</p>
              </Link>
              <Link to="/goals">
                <p>Goal Setter</p>
              </Link>
              <Link to="/services">
                <p>Services</p>
              </Link>
              <Link to="/">
              <button
                onClick={handleClick}
                // className="mx-10 text-2xl font-bold  transition ease-out duration-500 font-serif"
              >
                Logout
              </button>
            </Link>
          </div>

     );
}
 
export default SideBar;