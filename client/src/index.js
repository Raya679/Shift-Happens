import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { AuthContextProvider } from './context/Authcontext';
import { DataContextProvider } from './context/DataContext';
import { GoalContextProvider } from './context/goalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>
      <DataContextProvider>
      <GoalContextProvider>
          <App />    
      </GoalContextProvider>
      </DataContextProvider>
    </AuthContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

