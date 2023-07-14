// import logo from './logo.svg';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Campaigns from 'src/pages/Campaigns/Campaigns';
import Header from 'src/components/Header/Header';
import Home from 'src/pages/Home/Home';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PageLayout from './pages/PageLayout/PageLayout';
import DetailFetch from './components/Detail/DetailFetch';
import DonationSuccess from './pages/DonationSuccess/DonationSuccess';




function App() {
  let apiURL = '';
   if (process.env.NODE_ENV === 'production'){
      apiURL = process.env.REACT_APP_PROD_API_URL;
   } else {
      apiURL = process.env.REACT_APP_DEV_API_URL;
   }
   console.log(apiURL);
  
  return (
    <div className="App">
        <Routes>
          <Route path = '/' element={<><Header /><PageLayout apiURL={apiURL}/></>}>
            <Route index element= {<LoginPage apiURL={apiURL}/>} />
            <Route path = "Profile" element = {<ProfilePage apiURL={apiURL}/>} />
          </Route>
          <Route path = '/Home' element={<Home apiURL={apiURL}/>} />
          <Route path = '/Campaigns' element={<><Header /><Campaigns apiURL={apiURL} /></>}/>
          <Route path="/LoginPage" element={<><Header /><LoginPage apiURL={apiURL}/></>} />
          <Route path="/Details/:_id" element = {<><Header /><DetailFetch apiURL={apiURL}/></>} />
          <Route path = "/donations/donation_success/" element = {<DonationSuccess />} />
        </Routes>
    </div>
  );
}

export default App;
