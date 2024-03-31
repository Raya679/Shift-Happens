import React, { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="h-full w-full bg-gray-300 overflow-x-hidden overflow-y-hidden flex">
                <div className="w-2/5 mr-24 ml-32 text-3xl mt-32">
                    <div className="font-extrabold text-6xl mb-12 text-black"><h2>Our Mission</h2></div>
                    <div className="text-4xl text-gray-800 font-bold mt-5 mb-2"><p className="text-2]4xl">Physical Activity </p></div>
                    <p className="text-xl">Emphasize the benefits of regular exercise for mental health, including stress reduction, mood enhancement, and improved self-esteem. Provide suggestions for incorporating physical activity into daily routines.</p><br></br>
                    <div className="text-4xl text-gray-800 font-bold mt-5 mb-2"><p className="text-4xl">Meditation </p></div>
                    <p className="text-xl">Introduce mindfulness and meditation practices as tools for cultivating present-moment awareness, reducing rumination, and enhancing overall wellbeing.</p><br></br>
                    <div className="text-4xl text-gray-800 font-bold mt-5 mb-2"><p className="text-4xl">Seeking Help: </p></div>
                    <p className="text-xl">Encourage visitors to seek professional help if they are struggling with mental health challenges. Provide information on accessing therapy, counseling services, crisis hotlines, and other mental health resources.</p>
                </div>

                <div className="aboutUsImg ml-auto" style={{ marginTop: '90px', marginRight: '100px' }}>
                    <img src="./aboutUs.png" alt="sorry" style={{ height: '700px', borderRadius:'15px'}} />
                </div>
            </div>
            <div className="w-full bg-gray-300 flex">
                <div className="aboutUsImg mr-auto ml-0" style={{ marginTop: '180px', marginLeft: '120px', paddingBottom:'200px'}}>
                    <img src="./story.png" alt="sorry" style={{ height: '650px', borderRadius: '15px' }} />
                </div>
                <div className="w-2/5 ml-auto mr-24 text-3xl mt-32">
                    <div className="font-extrabold text-6xl mb-20 text-black" style={{paddingTop:'45px'}}><h2>Our Story</h2></div>
                    <p className="text-xl">In today's times, the culture of hustle and hard work has led to people not prioritizing their mental health. Moreover, the stigma associated with seeking help for mental ailments led us to create this website which serves as a platform where individuals who are facing issues related to their mental health and well-being can seek help and track their progress and activities. We, Druhi Phutane, Raya Chakravarty, Richa Sawant, and Siddhi Parekh, students in the second year of computer engineering at Veermata Jijabai Technological Institute, Mumbai developed this website to serve as the ultimate mental health tracking and help-seeking platform.</p>
                </div>
            </div>

            <div className="w-screen bg-gray-300">
                <div className="w-full h-2/5 flex-col">
                    <div className="flex items-center justify-center text-6xl font-bold w-full mb-12">Meet Our Team</div>
                    <div className="flex items-center justify-center w-full">
                        <a href="https://www.linkedin.com/in/druhi-phutane-5a711829b/" className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none">
                            <div className="flex items-center justify-center my-5">
                                <img src="./Maskgroup2.png" alt="" style={{ maxWidth: '50%', maxHeight: '50%' }} /> {/* Adjust max-width and max-height as needed */}
                            </div>
                            <div className="text-center my-3 font-bold text-2xl">Druhi Phutane</div>
                            <div className="p-3 text-1xl text-center"><p>Cursus sit amet dictum sit amet justo. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.</p></div>
                        </a>
                        <a href="https://www.linkedin.com/in/raya-chakravarty/" className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none">
                            <div className="flex items-center justify-center my-5">
                                <img className="" src="./Maskgroup.png" alt="" />
                            </div>
                            <div className="text-center my-3 font-bold text-2xl">Raya Chakravarty</div>
                            <div className="p-3 text-1xl text-center"><p>Cursus sit amet dictum sit amet justo. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.</p></div>
                        </a>
                        <a href="https://www.linkedin.com/in/richasawant20/" className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none">
                            <div className="flex items-center justify-center my-5">
                                <img className="" src="./Maskgroup3.png" alt="" />
                            </div>
                            <div className="text-center my-3 font-bold text-2xl">Richa Sawant</div>
                            <div className="p-3 text-1xl text-center"><p>Cursus sit amet dictum sit amet justo. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.</p></div>
                        </a>
                        <a href="https://in.linkedin.com/in/siddhi-parekh-04788325a" className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none">
                            <div className="flex items-center justify-center my-5">
                                <img className="" src="./Maskgroup1.png" alt="" />
                            </div>
                            <div className="text-center my-3 font-bold text-2xl">Siddhi Parekh</div>
                            <div className="p-3 text-1xl text-center"><p>Cursus sit amet dictum sit amet justo. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
