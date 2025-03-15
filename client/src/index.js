import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { AuthContextProvider } from "./context/Authcontext";
import { GoalContextProvider } from "./context/goalContext";
import { PostContextProvider } from "./context/postContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <GoalContextProvider>
          <App />
        </GoalContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
