import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import meditate from "../pictures/medi.gif";
import sleep from "../pictures/sleep.gif";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";

const MeditationTimer = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [showEndSessionOptions, setShowEndSessionOptions] = useState(false);
  const [sessionType, setSessionType] = useState(false);
  const meditationTimeRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && remainingTime > 0 && !isPaused) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
        setTotalTime((prevTotalTime) => prevTotalTime + 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsTimerRunning(false);
      setShowEndSessionOptions(true);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, remainingTime, isPaused]);

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

  const handlePauseSession = () => setIsPaused(true);
  const handleResumeSession = () => setIsPaused(false);
  const handleSessionType = () => setSessionType(true);
  const handleEndSession = () => {
    setIsTimerRunning(false);
    setShowEndSessionOptions(false);
    setSessionType(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 left-0 z-50">
        <SideBar />
      </div>

      <div className="flex-grow ml-64">
        <div className="container mx-3 flex flex-col justify-center items-center h-screen mt-36 bg-zinc-800 rounded-3xl">
          {!isTimerRunning && (
            <div className="flex">
              <div className="form w-3/5 mt-36">
                <p className="text-[40px] ml-52 font-semibold mb-4 text-white">
                  Set Meditation Time
                </p>
                <input
                  ref={meditationTimeRef}
                  type="text"
                  placeholder="Enter time in minutes"
                  className="ml-48 mt-16 w-1/2 px-4 py-2 mb-4 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  onClick={handleStartTimer}
                  className="ml-10 rounded-xl bg-lime-900 hover:bg-lime-700 text-white font-bold py-3 px-6 focus:outline-none focus:shadow-outline"
                >
                  Start
                </button>
                <div className="flex mt-9 ml-40">
                  <button
                    onClick={handleSessionType}
                    className="ml-10 rounded-xl bg-lime-700 text-white font-bold py-3 px-6 focus:outline-none focus:shadow-outline"
                  >
                    Sleep Better
                  </button>
                  <button className="ml-10 rounded-xl bg-lime-700 text-white font-bold py-3 px-6 focus:outline-none focus:shadow-outline">
                    Reduce Anxiety
                  </button>
                </div>
              </div>

              <div className="w-2/5 mt-12 ml-20 mr-20">
                <img src="meditate.png" alt="" />
              </div>
            </div>
          )}

          {isTimerRunning && (
            <div className="text-center mt-4">
              <div className="text-4xl font-bold mb-9 text-white font-serif">
                Remaining Time - {formatTime(remainingTime)}
              </div>

              <div>
                {!isPaused && !sessionType && <img src={meditate} alt="" />}
                {!isPaused && sessionType && (
                  <img src={sleep} alt="" className="w-2/4 ml-52" />
                )}
              </div>

              <div>
                {!isPaused && (
                  <button
                    onClick={handlePauseSession}
                    className="bg-red-500 hover:bg-red-700 mt-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Pause Session
                  </button>
                )}
                {isPaused && (
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

          <div className="mt-32 text-center">
            <p className="text-lg text-slate-900 font-semibold">
              Want to feel even better?
            </p>
            <Link
              to="/exercise"
              className="text-blue-700 underline hover:text-blue-600"
            >
              Click here for relaxation exercises
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;
