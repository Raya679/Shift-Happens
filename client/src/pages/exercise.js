import React, { useState } from "react";
document.body.style = "background: #e2e8f0";
function ReduceAnxiety() {
  return (
    <>
      <div>
        <div className="text-base font-light pt-3">
          Eagle Pose – beneficial for quieting the mind and bringing the
          attention to the body.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Eagle-Pose-450x270.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Legs Up The Wall Pose – a simple but effective anxiety-busting posture
          that calms the chatter in our minds.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2016/11/Legs-up-wall.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Fish Pose – can be used for fatigue and anxiety relief, as well as
          gentle back and shoulder stretching. Beginners may want to place a
          thickly-folded blanket beneath the head for neck support if they are
          experiencing any discomfort.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Fish-Pose-450x270.png"
          ></img>
        </div>
      </div>
    </>
  );
}

function Calm() {
  return (
    <>
      <div>
        <div className="text-base font-light pt-3">
          Standing Forward Bend – forward bends are excellent for calming our
          nervous system, providing a release of the upper body and soothes the
          mind through gentle inversion.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Standing-forward-bend-option-2-450x270.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Balancing Poses – quiet the mind and cultivate focused awareness.
        </div>
        <div>
          <p className="text-base font-light pt-3">Half moon pose</p>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Half-moon-pose-450x270.png"
          ></img>
        </div>
        <div>
          <p className="text-base font-light pt-3">Tree</p>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Tree-450x270.png"
          ></img>
        </div>
        <div>
          <p className="text-base font-light pt-3">Airplane</p>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Airplane-450x270.png"
          ></img>
        </div>
      </div>
    </>
  );
}

function Energized() {
  return (
    <>
      <div>
        <div className="text-base font-light pt-3">
          Childs Pose – stimulates your nervous system and helps reenergize your
          body..
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Childs-Pose-option-1-450x270.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Warrior II – awakens and energizes the body and empowers strength.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Warrior-II-450x270.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Chair Pose – awakens and energizes the body and empowers strength.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2016/11/Chair-450x270.png"
          ></img>
        </div>
      </div>
    </>
  );
}

function Sleep() {
  return (
    <>
      <div>
        <div className="text-base font-light pt-3">
          Easy Forward Bend – creates an overall sense of ease in the body while
          opening the hips.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Easy-Forward-Bend-450x270.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Plow Pose – turning the blood flow around can bring the body a calming
          sense of vitality, great for sleep
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Plow-450x270.png"
          ></img>
        </div>
        <div className="text-base font-light pt-3">
          Corpse Pose – gets the body into a relaxed state to focus the
          attention on the breath and calming.
        </div>
        <div>
          <img
            className="h-44 w-64"
            src="https://www.changetochill.org/wp-content/uploads/2018/08/Corpse-450x270.png"
          ></img>
        </div>
      </div>
    </>
  );
}

function Exercise() {
  const [showReduceAnxiety, setShowReduceAnxiety] = useState(false);
  const [showCalm, setShowCalm] = useState(false);
  const [showEnergized, setShowEnergized] = useState(false);
  const [showSleep, setShowSleep] = useState(false);
  return (
    <div>
      <div className="p-10 pt-36">
        <div className="flex justify-center">
          <h1 className="font-extrabold text-4xl font-serif color">
            Mindful Exercises
          </h1>
        </div>
        <p className="flex pl-60 pr-60">
          Practicing mindful movement can help us in our everyday lives. There
          are movements that calm, movements that energize, movements that help
          with sleep, movements that ignite gratitude, and movements that
          improve athletic performance.
        </p>
      </div>

      <div className="flex justify-center m-10">
        <div className="h-full w-3/4 bg-white rounded-3xl p-20">
          <div className="bg-slate-100 p-2 font-serif text-xl font-extrabold">
            <button
              onClick={() => {
                setShowReduceAnxiety(!showReduceAnxiety);
              }}
            >
              + To Reduce Anxiety
            </button>
            <br />
            {showReduceAnxiety && <ReduceAnxiety />}
          </div>

          <div className="bg-slate-100 p-2 font-serif text-xl font-extrabold">
            <button
              onClick={() => {
                setShowCalm(!showCalm);
              }}
            >
              + To Calm Yourself
            </button>
            <br />
            {showCalm && <Calm />}
          </div>

          <div className="bg-slate-100 p-2 font-serif text-xl font-extrabold">
            <button
              onClick={() => {
                setShowEnergized(!showEnergized);
              }}
            >
              + To Energize Yourself
            </button>
            <br />
            {showEnergized && <Energized />}
          </div>
          <div className="bg-slate-100 p-2 font-serif text-xl font-extrabold">
            <button
              onClick={() => {
                setShowSleep(!showSleep);
              }}
            >
              + To Sleep Well
            </button>
            <br />
            {showSleep && <Sleep />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
