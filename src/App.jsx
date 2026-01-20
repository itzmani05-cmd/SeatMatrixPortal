import React from 'react'
import "./App.css";
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Instructions from './components/instructions';
import Footer from './components/Footer';

const Protected= ({children})=>{
  const isLoggedIn= !!localStorage.getItem("college");
  return isLoggedIn? children: <Navigate to='/login' replace />;
};

function App(){
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace/>} />
          <Route path='/login' element={
            localStorage.getItem("college")? <Navigate to="/home" replace/>:<Login/>}/>
          <Route path='/home' element={
            <Protected>
              <Home/>
            </Protected>
          }
          />
          <Route path='/instruction' element={<Instructions/>}/>
          <Route path='*' element={<ErrorPage/>} />
          
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App