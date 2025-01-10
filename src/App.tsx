import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import HomePage from './Components/Pages/HomePage';
import UserOptions from './Components/Pages/UserOptions';
import UserStep1 from './Components/User/UserStep1';
import UserStep2 from './Components/User/UserStep2';
import LowyerStep2 from './Components/Lawyers/LowyerStep2';
import LowyerStep1 from './Components/Lawyers/LawyerStep1';
import UserStep3 from './Components/User/UserStep3';
import LowyerStep3 from './Components/Lawyers/LowyerStep3';

const App: React.FC = () => {
  return (
    <Router>
      {/* Header component */}
      <Header />
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={
          <>
          <HomePage />
          <UserOptions/>
          </>
        } />
        <Route path="/options" element={<UserOptions />} />
        <Route path="/ClientStep1" element={<UserStep1 />} />
        <Route  path="/userstep2" element={<UserStep2/>} />
        <Route  path="/userstep3" element={<UserStep3/> } />
        <Route path="/lowyertStep1" element={<LowyerStep1/> } />
        <Route path='/lowyerstep2'element={<LowyerStep2/> } />
        <Route path='/lowyerstep3'element={<LowyerStep3/> } />
      </Routes>
    </Router>
  );
};

export default App;
