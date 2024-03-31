import { useEffect } from "react";
import { useGoalContext } from "../hooks/useGoalContext";
import GoalDetails from "../components/goalDetails";
import GoalForm from "../components/goalform";
import { useAuthContext } from "../hooks/useAuthContext";
// import { Link } from "react-router-dom";
import SideBar from "../components/sideBar";
import bg from "../pictures/duplo24.jpeg"


const Goals = () => {
    const { goals, dispatch } = useGoalContext();
    const {user} = useAuthContext();

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
        // <div className="fetchgoals">
        
        //     <SideBar/>
        //     <div className='pt-32 flex'>
        //         <div className="w-1/2 pr-4">
                    
        //                 <GoalForm />
        //         </div>

        //         <div className="w-1/2 pl-4>
        //             <div className="w-full max-w-lg">
        //                 {goals && goals.map(goal => (
        //                     <GoalDetails goal={goal} key={goal._id} />
        //                 ))}
        //             </div>
                
        //         </div>
        //     </div>
        // </div>

        // <div className="fetchgoals">
        //     <SideBar />

        //     <div className="pt-32 flex">
        //         <div className="w-1/2 pr-4">
        //             <GoalForm />
        //         </div>

        //         <div className="w-1/2 pl-4">
        //             <div className="w-full max-w-lg">
        //             {goals && goals.map(goal => (
        //                 <GoalDetails goal={goal} key={goal._id} />
        //             ))}
        //         </div>
        //     </div>
        // </div>

        <div className="fetchgoals">
            <SideBar />

            <div className="form-goal" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <div className="form">
                    <GoalForm />
                </div>

        {/* <div className="w-1/2 pl-4">
          <div className="w-full max-w-lg">
            {goals && goals.map(goal => (
              <GoalDetails goal={goal} key={goal._id} />
            ))}
          </div>
        </div> */}

            <div className="goals-container">
                <h3>My Goals</h3>
                {goals && goals.map(goal => (
                    <GoalDetails goal={goal} key={goal._id} />
                ))}
            </div>
      </div>
    </div>


    );
};

export default Goals;
