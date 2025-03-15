import React, { useEffect } from "react";
import bg from "../pictures/duplo24.jpeg";
import Navbar from "../components/navbar";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />

      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <div className="h-full w-full overflow-x-hidden overflow-y-hidden flex">
          <div className="w-2/5 mr-24 ml-32 text-3xl mt-20">
            <div className="font-extrabold text-6xl mb-12 text-black">
              <h2>Our Mission</h2>
            </div>
            <div className="text-4xl text-gray-800 font-bold mt-3 ">
              <p className="text-4xl">Physical Activity</p>
            </div>
            <p className="text-xl">
              Emphasize the benefits of regular exercise for mental health,
              including stress reduction, mood enhancement, and improved
              self-esteem. Provide suggestions for incorporating physical
              activity into daily routines.
            </p>
            <br />
            <div className="text-4xl text-gray-800 font-bold mt-3 ">
              <p className="text-4xl">Meditation</p>
            </div>
            <p className="text-xl">
              Introduce mindfulness and meditation practices as tools for
              cultivating present-moment awareness, reducing rumination, and
              enhancing overall wellbeing.
            </p>
            <br />
            <div className="text-4xl text-gray-800 font-bold mt-3">
              <p className="text-4xl">Seeking Help:</p>
            </div>
            <p className="text-xl">
              Encourage visitors to seek professional help if they are
              struggling with mental health challenges. Provide information on
              accessing therapy, counseling services, crisis hotlines, and other
              mental health resources.
            </p>
          </div>

          <div
            className="aboutUsImg mr-auto ml-0"
            style={{
              marginTop: "100px",
              paddingBottom: "100px",
            }}
          >
            <img
              src="./AboutUs.png"
              alt="Our Story"
              style={{ height: "650px", borderRadius: "15px" }}
            />
          </div>
        </div>

        <div className="w-screen">
          <div className="w-full h-2/5 flex-col">
            <div className="flex items-center justify-center text-6xl font-bold w-full">
              Meet Our Team
            </div>
            <div className="flex items-center justify-center w-full">
              <a
                href="https://www.linkedin.com/in/druhi-phutane-5a711829b/"
                className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 hover:bg-gray-400 hover:text-slate-900 hover:border-none"
              >
                <div className="flex items-center justify-center ">
                  <img
                    src="./Maskgroup2.png"
                    alt="Druhi Phutane"
                    style={{ maxWidth: "50%", maxHeight: "50%" }}
                  />
                </div>
                <div className="text-center my-3 font-bold text-2xl">
                  Druhi Phutane
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/raya-chakravarty/"
                className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none"
              >
                <div className="flex items-center justify-center my-5">
                  <img
                    className=""
                    src="./Maskgroup.png"
                    alt="Raya Chakravarty"
                  />
                </div>
                <div className="text-center my-3 font-bold text-2xl">
                  Raya Chakravarty
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/richasawant20/"
                className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none"
              >
                <div className="flex items-center justify-center my-5">
                  <img className="" src="./Maskgroup3.png" alt="Richa Sawant" />
                </div>
                <div className="text-center my-3 font-bold text-2xl">
                  Richa Sawant
                </div>
              </a>
              <a
                href="https://in.linkedin.com/in/siddhi-parekh-04788325a"
                className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none"
              >
                <div className="flex items-center justify-center my-5">
                  <img
                    className=""
                    src="./Maskgroup1.png"
                    alt="Siddhi Parekh"
                  />
                </div>
                <div className="text-center my-3 font-bold text-2xl">
                  Siddhi Parekh
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
