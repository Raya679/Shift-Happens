import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
    const {user} = useAuthContext();
    // console.log(user);
    return ( 
        <div>
        <h2>Profile</h2>
        {user && (
            <div className="profile">
                <p>Name: {user.username}</p> 
                <p>Email: {user.email}</p>
                {/* <p>Password: {user.password}</p>  */}
                              
            </div>
        )}
        </div>
     );
}
 
export default Profile;