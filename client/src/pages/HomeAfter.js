import { useAuthContext } from "../hooks/useAuthContext";
// import { Link } from "react-router-dom";
// import goalspg from "../pictures/goals.jpg";
// import mind from "../pictures/mind.png";
// import mood from "../pictures/moodTracker.png";
// import { useLogout } from "../hooks/useLogout";
import { useGoalContext } from "../hooks/useGoalContext";
// import GoalDetails from "../components/goalDetails";
import { useEffect } from "react";
// import { NavLink } from 'react-router-dom';
import MoodGraph from "./moodGraph";
import img1 from "../pictures/img1.png";
import SideBar from "../components/sideBar";
import bg from "../pictures/duplo24.jpeg"


document.body.style = 'background: #cbd5e1';
const HomeAfter = () => {
  const { user } = useAuthContext();
  // const { logout } = useLogout();
  const { goals, dispatch } = useGoalContext();

  // const handleClick = () => {
  //   logout();
  // };


  useEffect(() => {
    const fetchGoals = async () => {
        const response = await fetch('/api/goals', {
            headers: {'Authorization': `Bearer ${user.token}`},
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_GOALS', payload: json });
        }
    }

    if(user){
    fetchGoals()
    }
}, [dispatch, user]);


  return (
    <div >
      {user && (
        // <div className="pt-24 flex justify-center m-14">
        //   <h1>WELCOME {user.username}</h1>
        //   <h5>Your Path to Prosperity Starts Here </h5>
        //   <div className="h-full w-5/6 bg-white rounded-3xl p-10">
        //     <div className="h-full">
        //       <div className="flex justify-center w-full">
        //         <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
        //           <img src={mood}></img>
        //         </div>
        //         <div className="h-1/3 w-1/3 pt-20 ">
        //           <p className="font-bold">Mood Tracking</p>
        //           <p>Track your Moods, emotions and stress Levels</p>
        //         </div>
        //       </div>

        //       <a href="/exercise">
        //         <div className="flex justify-center w-full">
        //           <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
        //             <img src={mind}></img>
        //           </div>
        //           <div className="h-1/3 w-1/3 pt-20 ">
        //             <p className="font-bold">Mindfulness Exercise</p>
        //             <p>
        //               View the Relaxation exercises to help teenagers manage
        //               stress and anixety
        //             </p>
        //           </div>
        //         </div>
        //       </a>
        //       <a href="/goals">
        //         <div className="flex justify-center w-full">
        //           <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
        //             <img src={goalspg}></img>
        //           </div>
        //           <div className="h-1/3 w-1/3 pt-20 ">
        //             <p className="font-bold">Goal Setting</p>
        //             <p>Set and Track Personal wellness Goals</p>
        //           </div>
        //         </div>
        //       </a>
        //     </div>
        //   </div>
        // </div>
        <div >
        <div className="homeAfter">
          
          <SideBar/>
          <div >
          <div className="content" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
            <h2>Welcome to Shift Happens, {user.username}</h2>
            <div className="image-quote">
              <img src={img1} alt="Image" className="center-image"></img>
              <div className="quote">
              {/* <h4>Quote of the Day</h4> */}
              <h4>"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time"</h4>
              {/* <br></br> */}
              <h4>~Thomas Edison</h4>
              </div>
            </div>
            
            <h3>MY GOALS</h3>

            
            {/* {goals && goals.map(goal => (
                    // <GoalDetails goal={goal} key={goal._id} />
                


              <div className="card"
                <div className='bg-slate-100 p-2 w-1/2 rounded-xl'>
                  <h4><strong>Activity name: </strong>{goal.activities}</h4>
                  <p><strong>Duration (in mins): </strong>{goal.duration}</p>
                  <p><strong>Prerequisites: </strong>{goal.requirements}</p>
                </div>
            </div>
            ))}

            {!goals && (
              <div className="no-goal">
                <p>No Goals added yet</p>
              </div>
            )} */}
            <div className="cards">
              {goals && goals.length > 0 ? (
                goals.map(goal => (
                  <div className="card" key={goal._id}>
                    <div className='bg-slate-100 p-2 w-1/2 rounded-xl'>
                      <p>Activity name: {goal.activities}</p>
                      <p>Duration (in mins): {goal.duration}</p>
                      <p>Prerequisites: {goal.requirements}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-goal">
                  <p>No Goals added yet</p>
                </div>
              )}
             </div>

             <div className="moodgraph">
              <p>MY MOOD STATS</p>
                <MoodGraph />
             </div>
           
          </div>

        </div>
        </div>
        </div>
      )}
    </div>
    
  );
};

export default HomeAfter;