import ContentHome from "./pages/content_home";
import Navbar from "./pages/navbar";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { BrowserRouter , Route, Routes, Navigate } from "react-router-dom";
import About from "./pages/aboutus";
import Contact from "./pages/contactus";
import HomeAfter from "./pages/HomeAfter";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/profile";
// import News from "./pages/news";
// import ImageSliding from "./pages/imageSliding";
import MainForm from "./pages/mainform";
// import DataDetails from "./pages/DataDetails";
import { useDataContext } from "./hooks/useDataContext";
// import CompanyDetails from "./pages/getstock";
import Goals from "./pages/getgoal";

import ChatBotPage from "./pages/chatbot";
import Exercise from "./pages/exercise.js";
import Footer from "./pages/footer.js";
import Mood from "./pages/moodpage.js";
// function App() {
//   return (
//   //  <Router>
//   //   <div className="App">
//   //     <Navbar/>              

//   //     <div className="content">
        
//   //       <Switch>

//   //         <Route exact path ="/">
//   //           <ContentHome/>
//   //         </Route>

//   //         <Route path = "/login">
//   //           <Login/>
//   //         </Route>
//   //       </Switch>
//   //     </div>
//   //   </div>
//   //   </Router> 

//   <BrowserRouter>
//     <div className="App">
      
//         <Routes>
          
//             <Route
//                exact path ="/"
               
//                element={<Navbar/>}
//                element1={<ContentHome/>}
               
//             />
          
         
//             {/* <Route path = "/signup">
//               <div className="signuppage">
//                  <Navbar/>
//               </div>

//               <div className="signuppg">
//                  <Signup/>
//               </div>
              
//             </Route>

//             <Route path = "/login">
//               <div className="loginpage">
//                  <Navbar/>
//               </div>

//               <div className="loginpg">
//                  <Login/>
//               </div>
              
//             </Route>

//             <Route path = "/aboutus">
//               <div className="aboutpage">
//                  <Navbar/>
//               </div>

//               <div className="aboutpg">
//                  <About/>
//               </div>
              
//             </Route>

//             <Route path = "/contactus">
//               <div className="contactpage">
//                  <Navbar/>
//               </div>

//               <div className="contactpg">
//                  <Contact/>
//               </div>
              
//         </Route>*/}
          
//         </Routes> 
//     </div>
//     </BrowserRouter> 
//   );
// }

function App() {
  const {user} = useAuthContext();
  const {data} = useDataContext();

   return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={!user ?<HomePage /> : <Navigate to ="/home"/>} />
         <Route path="/home" element={<HomeAfterPage />} />
         <Route path="/signup"element={!user ? <Signuppage /> : <Navigate to="/home" />}/>
         <Route path="/login" element={!user ?<LoginPage /> : <Navigate to="/home" /> } />
         <Route path="/aboutus" element={<AboutUsPage />} />
         <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/signup"/>} />
         <Route path="/contactus" element={<ContactUsPage />} />
         <Route path="/mainform" element={!data ?<Mainform/> : <Navigate to ="/results"/>}/>
         <Route path="/moods" element={<GetMood/>}/>
         <Route path="/goals" element={<GetGoal/>}/>
         <Route path="/exercise" element={<GetExercise/>}/>
         <Route path="/chatbot" element={<ChatBot/>}/>

       </Routes>
     </BrowserRouter>
   );
 }
 
 function HomePage() {
   return (
     <div className="homepage">
       <Navbar />
       <ContentHome />
       <Footer/>
     </div>
   );
 }
function ChatBot() 
{
   return (
      <div>
         <ChatBotPage/>
      </div>
   )
}
function GetMood(){
   return (
      <>
      <div className="goalspage">
         <Navbar/>
         {/* <Goals/> */}
      </div>

      <div className="goalspg">
         <Mood/>
      </div>

      </>
   )
}
 function Signuppage() {
   return (
      <div>
      <div className="signuppage">
            <Navbar/>
       </div>

      <div className="signuppg">
            <Signup/>
      </div>
      </div>
   )
 }

 function HomeAfterPage() {
  return (
     <div className="main">
     <div className="homeafterpage">
           <Navbar/>
      </div>

     <div className="homeafterpg">
           <HomeAfter/>
           {/* <ImageSliding/> */}
           {/* <News/> */}
     </div>
     </div>
  )
}

function GetGoal() {
   return (
      <>
      <div className="goalspage">
         <Navbar/>
         {/* <Goals/> */}
      </div>

      <div className="goalspg">
         <Goals/>
      </div>

      </>
   )
}

function GetExercise() {
   return (
      <>
      <div className="exercisepage">
         <Navbar/>
      </div>

      <div className="goalspg">
         <Exercise/>
      </div>

      </>
   )
}



function ProfilePage() {
  return (
     <div>
     <div className="signuppage">
           <Navbar/>
      </div>

     <div className="signuppg">
           <Profile/>
     </div>
     </div>
  )
}

 
 function LoginPage() {
   return (
      <div>
      <div className="loginpage">
                  <Navbar/>
               </div>

              <div className="loginpg">
                 <Login/>
              </div>
      </div>
   );
 }

 function AboutUsPage() {
   return (
      <div>
         <div className="aboutpage">
                  <Navbar/>
               </div>

               <div className="aboutpg">
                  <About/>
               </div>
      </div>
   );
 }

 function ContactUsPage() {
   return (
      <div>
         <div className="contactpage">
                <Navbar/>
         </div>

               <div className="contactpg">
                  <Contact/>
               </div>
      </div>
   );
}

function Mainform() {
  return (
     <div>
        <div className="mainformpage">
               <Navbar/>
        </div>

              <div className="mainformpg">
                 <MainForm/>
              </div>
     </div>
  );
}

// function DataDetail() {
//    return (
//       <div>
//          <div className="datadetailpage">
//                 <Navbar/>
//          </div>
 
//                <div className="datadetailpg">
//                   <DataDetails/>
//                </div>
//       </div>
//    );
//  }


export default App;
