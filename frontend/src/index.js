import React from 'react';
import ReactDOM from 'react-dom/client';
//import './simple.css';
import './index.css';
import Login from './components/Login';
import App from './App';
import PageNotFound from './components/PageNotFound';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
/* root.render(
  <React.StrictMode>
    <App /> 
    <Login />
  </React.StrictMode>
); */

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
