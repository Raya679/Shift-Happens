import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Footer from "./components/footer";

import ContentHome from "./pages/home";
import About from "./pages/aboutUs";
import Contact from "./pages/contactUs";
import Signup from "./pages/signup";
import Login from "./pages/login";
import HomeAfter from "./pages/homeAfter";
import Goals from "./pages/getGoal";
import Mood from "./pages/moodPage";
import ChatBotPage from "./pages/chatbot";
import MeditationTimer from "./pages/meditate";
import Posts from "./pages/getPost";
import Exercise from "./pages/exercise";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Layout component={ContentHome} footer /> : <Navigate to="/home" />} />
        <Route path="/aboutus" element={<Layout component={About} footer />} />
        <Route path="/contactus" element={<Layout component={Contact} />} />
        <Route path="/signup" element={!user ? <Layout component={Signup} /> : <Navigate to="/home" />} />
        <Route path="/login" element={!user ? <Layout component={Login} /> : <Navigate to="/home" />} />
        <Route path="/home" element={<Layout component={HomeAfter} footer />} />
        <Route path="/goals" element={<PageWrapper component={Goals} />} />
        <Route path="/moods" element={<PageWrapper component={Mood} />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/meditate" element={<PageWrapper component={MeditationTimer} />} />
        <Route path="/posts" element={<PageWrapper component={Posts} />} />
        <Route path="/exercise" element={<PageWrapper component={Exercise} />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout({ component: Component, footer }) {
  return (
    <div>
      <Component />
      {footer && <Footer />}
    </div>
  );
}

function PageWrapper({ component: Component }) {
  return (
    <div >
      <Component />
    </div>
  );
}

export default App;
