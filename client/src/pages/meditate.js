import React, { useState, useEffect, useRef } from 'react';
import meditate from '../pictures/medi.gif';
document.body.style = "background: #e2e8f0";
const MeditationTimer = () => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // New state for pausing the session
    const [totalTime, setTotalTime] = useState(0); 
    const [showEndSessionOptions, setShowEndSessionOptions] = useState(false);

    const meditationTimeRef = useRef(null);

    useEffect(() => {
        let intervalId;

        if (isTimerRunning && remainingTime > 0 && !isPaused) { // Check if the timer is running and not paused
            intervalId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
                setTotalTime(prevTotalTime => prevTotalTime + 1); 
            }, 1000);
        } else if (remainingTime === 0) {
            setIsTimerRunning(false);
            setShowEndSessionOptions(true);
        }

        return () => clearInterval(intervalId);
    }, [isTimerRunning, remainingTime, isPaused]); // Add isPaused to the dependencies array

    const handleStartTimer = () => {
        const parsedTime = parseInt(meditationTimeRef.current.value);

        if (!isNaN(parsedTime) && parsedTime > 0) {
            setRemainingTime(parsedTime * 60);
            setIsTimerRunning(true);
            setShowEndSessionOptions(false); 
        } else {
            console.error("Invalid input. Please enter a valid number of minutes.");
        }
    };

    const handlePauseSession = () => {
        setIsPaused(true); // Set isPaused to true when pause button is clicked
    };

    const handleResumeSession = () => {
        setIsPaused(false); // Set isPaused to false when resume button is clicked
    };

    const handleEndSession = () => {
        setIsTimerRunning(false);
        setShowEndSessionOptions(false);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="container mx-auto flex flex-col justify-center items-center h-screen mt-36 bg-zinc-800 rounded-3xl">
             {!isTimerRunning && (
                <div className="flex">
                    <div className='form w-3/5 mt-48 '>
                        <p className="text-[40px] ml-52 font-semibold mb-4 text-white">Set Meditation Time</p>
                        <input
                            ref={meditationTimeRef}
                            type="text"
                            placeholder="Enter time in minutes"
                            className=" ml-48 mt-16 w-1/2 px-4 py-2 mb-4 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
                        />
                        <button
                            onClick={handleStartTimer}
                            className=" ml-10 rounded-xl bg-lime-900 hover:bg-lime-800 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                            Start
                        </button>
                    </div>
                    
                    <div className=' w-2/5 mt-12 ml-20 mr-20'>
                        <img src="meditate.png" alt="" />
                    </div>
                </div>
            )}
            {isTimerRunning && (
                <div className="text-center mt-4">
                    <div className="text-4xl font-bold mb-9 text-white font-serif">Remaining Time - {formatTime(remainingTime)}</div>
                    
                    <div>
                        {!isPaused && ( // Show GIF if session is not paused
                            <img src={meditate} alt="" />
                        )}
                    </div>
                    <div>
                        {!isPaused && ( // Show pause button if session is not paused
                            <button
                                onClick={handlePauseSession}
                                className="bg-red-500 hover:bg-red-700 mt-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Pause Session
                            </button>
                        )}
                        {isPaused && ( // Show resume button if session is paused
                            <button
                                onClick={handleResumeSession}
                                className="bg-green-500 hover:bg-green-700 mt-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Resume Session
                            </button>
                        )}
                        <button
                            onClick={handleEndSession}
                            className="bg-red-500 hover:bg-red-700 mt-10 ml-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            End Session
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeditationTimer;
