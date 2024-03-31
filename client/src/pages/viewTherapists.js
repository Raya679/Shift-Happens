import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const ViewTherapists = () => {
  const { user } = useAuthContext();
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      const response = await fetch("/api/user/therapists", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setTherapists(json.therapists);
    };

    if (user) {
      fetchTherapists();
    }
  }, [user]); // Adding user as a dependency to useEffect to avoid unnecessary re-renders

  return (
    <div className="">
      <div className="m-28">
        {therapists.map((therapist) => (
        <div className="flex" key={therapist._id}>
          <p className="m-2">Name: {therapist.name}</p>
          <p className="m-2">Email: {therapist.email}</p>
          <p className="m-2">Specialization: {therapist.specialization}</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Consult</button>
          <Link to="/chatroom">
            <p>Chat</p>
          </Link>
          <hr />
        </div>
      ))}
     
      </div>
    </div>
  );
};

export default ViewTherapists;
