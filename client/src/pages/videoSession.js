import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const VideoSession = () => {
    const [value, setValue] = useState('');
    const [inputFilled, setInputFilled] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        setInputFilled(!!inputValue);
    };

    const handleJoinRoom = useCallback(() => {
        if (inputFilled) {
            navigate(`/room/${value}`);
        }
    }, [navigate, value, inputFilled]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJoinRoom();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 py-10 px-6 bg-gray-100 rounded-lg shadow-md -mt-48">
                <input
                    className="w-full px-4 py-2 mb-4 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} 
                    type="text"
                    placeholder="Enter Room Code"
                />
                <div className="flex justify-center">
                    <button
                        className={`w-32 px-4 py-2 bg-sky-950 text-white rounded hover:bg-sky-900 focus:outline-none focus:shadow-outline ${inputFilled ? '' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={handleJoinRoom}
                        disabled={!inputFilled}
                    >
                        JOIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoSession;
