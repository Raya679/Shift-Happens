import React, { useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { user, loading } = useAuthContext();
    const { roomId } = useParams();
    const location = useLocation();
    const elementRef = useRef(null);

    useEffect(() => {
        if (!loading && user && user.username) { 
            const myMeeting = async (element) => {
                const appID = 1160337013;
                const serverSecret = "3d3855c9e29ab793ab498eeb066215b1";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), user.username); 
                const zc = ZegoUIKitPrebuilt.create(kitToken);
                
                zc.joinRoom({
                    container: element,
                    sharedLinks: [
                        {
                            name: 'Copy Link',
                            url: window.location.origin + window.location.pathname + '?roomId=' + roomId,
                        }
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.OneONoneCall,
                    },
                });
            };
            myMeeting(elementRef.current);
        }
    }, [roomId, user, loading]);

    return (
        <div>
            <div ref={elementRef}></div>
        </div>
    );
};

export default RoomPage;
