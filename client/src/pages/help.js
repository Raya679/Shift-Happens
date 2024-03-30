import { useAuthContext } from "../hooks/useAuthContext";
import goalspg from '../pictures/goals.jpg'
import mind from '../pictures/mind.png'
import mood from '../pictures/moodTracker.png'
import vcall from '../pictures/vc.png'
import chat from '../pictures/chat.png'
document.body.style = "background: #e2e8f0";
const HomeAfter = () => {
    const { user } = useAuthContext();

    return (
        <div>
            {user && (
                <div className="pt-24 flex justify-center m-14">
                    {/* <h1>WELCOME {user.username}</h1> */}
                    {/* <h5>Your Path to Prosperity Starts Here </h5> */}
                    <div className="h-full w-5/6 bg-white rounded-3xl p-10">
                        <div className="h-full">
                            <a href="/lvc">
                                <div className="flex justify-center w-full">
                                    <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
                                        <img src={vcall}></img>
                                    </div>
                                    <div className="h-1/3 w-1/3 pt-20 ">
                                        <p className='font-bold'>Live One on One video Call with Therapist</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nihil veritatis cumque sequi illo? Ex voluptates quisquam fuga dignissimos molestiae magnam placeat illo? Reprehenderit, voluptates?</p>
                                    </div>
                                </div>
                            </a>
                            <a href="/meditate">
                                <div className="flex justify-center w-full">
                                    <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
                                        <img src={mind}></img>
                                    </div>
                                    <div className="h-1/3 w-1/3 pt-20 ">
                                        <p className='font-bold'>Mindfulness Exercise</p>
                                        <p>
                                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptatum iure obcaecati nobis vero repudiandae ducimus maxime aspernatur distinctio. Unde quasi dolores aliquam expedita totam?
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a href="/">
                                <div className="flex justify-center w-full">
                                    <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
                                        <img src={chat} className=" w-3/4"></img>
                                    </div>
                                    <div className="h-1/3 w-1/3 pt-20 ">
                                        <p className='font-bold'>Chat with Therapist</p>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, voluptatem!</p>
                                    </div>
                                </div>
                            </a>
                            <a href="/">
                                <div className="flex justify-center w-full">
                                    <div className="bg-slate-100 h-1/3 w-1/3 flex justify-center p-20 rounded-2xl m-10">
                                        <img src={goalspg} className=" w-3/4"></img>
                                    </div>
                                    <div className="h-1/3 w-1/3 pt-20 ">
                                        <p className='font-bold'>Blog</p>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, minus!</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeAfter;