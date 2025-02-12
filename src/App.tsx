import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Pages/Home";
import UserOptions from "./Components/Pages/UserOptions";
import Login from "./Components/Login/Login";
import UserOptionGetStart from "./Components/Pages/UserOptionGetStart";
import RegisterClient from "./Components/User/RegisterClient";
import ConfirmDetailsClient from "./Components/User/ConfirmDetailsClient";
import RegisterLawyer from "./Components/Lawyers/RegisterLowyer";
import ConfirmDetailsLawyer from "./Components/Lawyers/ConfirmDetailsLawyer";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FireBase/firebaseLowyerRegister';
import HomePage from "./Components/Pages/HomePage";
import HeaderWithLogin from "./Components/Header/HeaderWithLogin";
import UserProfile from "./Components/Pages/UserProfile";
import { ToastContainer } from "react-toastify";
import LawyerProfile from "./Components/Pages/LawyerProfile";
import EditProfile from "./Components/Pages/EditProfile";

const App: React.FC = () => {
  
  useEffect(() => {
    // متابعة حالة المستخدم عند فتح التطبيق
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
      } else {
        console.log("No user is logged in.");
      }
    });
  }, []);

  return (
    <Router>
      {/* Header Component */}
      {/* <Header /> */}
      {/* <HeaderWithLogin/> */}
      <ToastContainer />
      {/* Application Routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Header/>
              <Home />
              <UserOptions />
            </>
          }
        />

        {/* User Get Started */}
        <Route path="/getstart" element={
        <>
          <Header/>
          <UserOptionGetStart />
        </>
        } />

        {/* Client Registration Steps */}
        <Route
          path="/ClientStep1"
          element={
            <>
            <Header/>
             <RegisterClient/> 
             </>
            }
        />
        <Route
          path="/clientstep2"
          element={
            <>
            <Header/>
          <ConfirmDetailsClient/>
          </>
         }
        />

        {/* Lawyer Registration Steps */}
         <Route
          path="/lowyerStep1"
          element={
            <>
            <Header/>
          <RegisterLawyer/> 
          </>
        }
        />
        <Route path="/lowyerstep2" element={
          <>
            <Header/>
        <ConfirmDetailsLawyer/> 
        </>
        } />

        <Route path="/login" element={
          <>
            <Header/>
        <Login />
        </>
        } />
        <Route path="/HomePage" element={<HomePage/> } />
        <Route path="/profile" element={<>
        <HeaderWithLogin/>
        <UserProfile/>
        </> } />

        <Route path="/lawyer/:id" element={
          <>
          <HeaderWithLogin/>
          <LawyerProfile />
          </>
        } />
        
      </Routes>

    </Router>
  );
};

export default App;
