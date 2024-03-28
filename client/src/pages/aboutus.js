
import React, { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (


        <>
            <div className="h-full w-full bg-gray-300 overflow-x-hidden ">
                <div className="w-screen flex justify-center align-middle">
                    <div className="font-extrabold text-8xl w-1/2 h-1/4 text-black-300 flex items-center justify-center mt-32 ">About Us.</div>
                </div>
                <div className="w-screen h-1/2 flex items-center justify-center bg-gray-300">
                    <img className="h-2/3 w-2/3" src="./office.png" alt="sorry" />
                </div>
                <div className="w-screen h-3/4 flex bg-gray-300 ">
                    <div className="w-2/5 mr-32 ml-24 text-3xl mt-32">
                        <div className="font-extrabold text-6xl mb-12 text-black"><h2>Our Mission</h2></div>
                        <div className="text-4xl text-gray-800 font-bold mt-5 mb-2"><p>Academic Performance and overall Productivity Improvement: </p></div>
                        <p>A well-designed website which helps students to manage their time and combat drowsiness, leading to improved academic performance.</p>
                        <div className="text-4xl text-gray-800 font-bold mt-5 mb-2"><p>Health and Wellbeing: </p></div>
                        <p>A website which helps to contribute to students' overall health and well-being. Reduced stress and improved sleep patterns can lead to better mental and physical health.</p>
                        <div className="text-4xl text-gray-800 font-bold mt-5 mb-2"><p>Drowsiness Detection: </p></div>
                        <p>This is the main feature of the website. The drowsiness detection technology being accurate and effective, can potentially be used in other places as well, such as to save lives by preventing accidents caused by drowsy driving or other hazardous situations.</p>
                    </div>
                    <div className="w-2/3 h-2/3 mt-12">
                        <img src="./entrepreneurs.png" alt="business" />
                    </div>
                </div>
                <div className="w-screen h-3/4 flex bg-gray-300 mt-24 mb-40">
                    <div className="w-2/3 h-2/3">
                        <img src="./discussion.png" alt="group" />
                    </div>
                    <div className="w-2/5 mr-24 ml-24 text-3xl mt-60">
                        <div className="font-extrabold text-6xl mb-20 text-black"><h2>Our Story</h2></div>
                        <p>Meeting deadlines is crucial for students as well as working  professionals, but sometimes we may push ourselves too hard to complete the work on time and end up pulling all-nighters. The lack of sleep can lead to drowsiness, which can affect our productivity and focus. 4 students from SY Btech VJTI successfully developed a modern day solution to this problem. Advait, Raya, Richa and Anushka of the CS department along with their mentors Kedar and Dhruv under COC's Inheritance program brought "WAKEFUL WORKFORCE" into a reality.</p>
                    </div>
                </div>
                <div className="w-full h-2/5 bg-gray-300 flex-col">
                    <div className="flex items-center justify-center text-6xl font-bold w-full mb-12">Meet Our Team</div>
                    <div className="flex items-center justify-center w-full">
                        <a href="https://www.linkedin.com/in/advait-yadav-231154271/" className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none">
                            <div className="flex items-center justify-center my-5">
                                <img className="" src="./Maskgroup3.png" alt="" />
                            </div>
                            <div className="text-center my-3 font-bold text-2xl">Advait Yadav</div>
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
                        <a href="https://www.linkedin.com/in/anushka-yadav-356b20276/" className="w-80 h-1/2 rounded-lg border-1 border-black mx-14 my-24 hover:bg-gray-400 hover:text-slate-900 hover:border-none">
                            <div className="flex items-center justify-center my-5">
                                <img className="" src="./Maskgroup1.png" alt="" />
                            </div>
                            <div className="text-center my-3 font-bold text-2xl">Anushka Yadav</div>
                            <div className="p-3 text-1xl text-center"><p>Cursus sit amet dictum sit amet justo. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.</p></div>
                        </a>
                    </div>

                </div>
            </div>
            {/* <Footer /> */}
        </>

    );
}

export default AboutUs;