import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import App from './App';
import PageNotFound from './components/PageNotFound';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import SharePage from './components/SharePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
          <Route path="/:listid" element={<SharePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
