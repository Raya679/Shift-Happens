import React, { useState } from "react";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";

document.body.style = "background: #e2e8f0";

function ReduceAnxiety() {
  return (
    <div>
      <div className="text-base font-light pt-3">
        Eagle Pose – beneficial for quieting the mind and bringing the attention
        to the body.
      </div>
      <div>
        <img className="h-44 w-56" src="./eaglepose.png" alt="Eagle Pose" />
      </div>
      <div className="text-base font-light pt-3">
        Legs Up The Wall Pose – a simple but effective anxiety-busting posture
        that calms the chatter in our minds.
      </div>
      <div>
        <img
          className="h-44 w-56"
          src="./legup.png"
          alt="Legs Up The Wall Pose"
        />
      </div>
      <div className="text-base font-light pt-3">
        Fish Pose – can be used for fatigue and anxiety relief, as well as
        gentle back and shoulder stretching.
      </div>
      <div>
        <img className="h-48 w-56" src="./fishpose.png" alt="Fish Pose" />
      </div>
    </div>
  );
}

function Energized() {
  return (
    <div>
      <div className="text-base font-light pt-3">
        Child’s Pose – stimulates your nervous system and helps reenergize your
        body.
      </div>
      <div>
        <img className="h-44 w-56" src="./childpose.png" alt="Child's Pose" />
      </div>
      <div className="text-base font-light pt-3">
        Warrior II – awakens and energizes the body and empowers strength.
      </div>
      <div>
        <img className="h-44 w-56" src="./warrior.png" alt="Warrior II" />
      </div>
      <div className="text-base font-light pt-3">
        Chair Pose – awakens and energizes the body and empowers strength.
      </div>
      <div>
        <img className="h-44 w-56" src="./chairpose.png" alt="Chair Pose" />
      </div>
    </div>
  );
}

function Sleep() {
  return (
    <div>
      <div className="text-base font-light pt-3">
        Easy Forward Bend – creates an overall sense of ease in the body while
        opening the hips.
      </div>
      <div>
        <img
          className="h-44 w-64"
          src="./easybend.png"
          alt="Easy Forward Bend"
        />
      </div>
      <div className="text-base font-light pt-3">
        Plow Pose – turning the blood flow around can bring the body a calming
        sense of vitality.
      </div>
      <div>
        <img className="h-44 w-64" src="./plowpose.png" alt="Plow Pose" />
      </div>
      <div className="text-base font-light pt-3">
        Corpse Pose – gets the body into a relaxed state to focus the attention
        on the breath.
      </div>
      <div>
        <img className="h-44 w-64" src="./corpsepose.png" alt="Corpse Pose" />
      </div>
    </div>
  );
}

const Exercise = () => {
  const [showReduceAnxiety, setShowReduceAnxiety] = useState(false);
  const [showCalm, setShowCalm] = useState(false);
  const [showEnergized, setShowEnergized] = useState(false);
  const [showSleep, setShowSleep] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-slate-800 shadow-lg">
        <SideBar />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow ml-64 p-6 text-black"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl mt-10 font-bold mb-6">Mindful Exercises</h1>
          <p className="max-w-3xl mx-auto text-lg">
            Practicing mindful movement can help us in our everyday lives. There
            are movements that calm, movements that energize, movements that
            help with sleep, movements that ignite gratitude, and movements that
            improve athletic performance.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <div className="w-full max-w-6xl mt-7 bg-white rounded-xl p-6 shadow-lg">
            {[
              {
                label: "To Reduce Anxiety",
                state: showReduceAnxiety,
                setter: setShowReduceAnxiety,
                component: <ReduceAnxiety />,
              },
              {
                label: "To Energize Yourself",
                state: showEnergized,
                setter: setShowEnergized,
                component: <Energized />,
              },
              {
                label: "To Sleep Well",
                state: showSleep,
                setter: setShowSleep,
                component: <Sleep />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-100 p-4 font-serif text-xl font-extrabold mb-4 rounded-lg"
              >
                <button
                  className="w-full text-left hover:text-slate-700 transition duration-300"
                  onClick={() => item.setter(!item.state)}
                >
                  {item.state ? "−" : "+"} {item.label}
                </button>
                {item.state && <div className="mt-2">{item.component}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
