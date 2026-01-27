import React from 'react'
import "./App.css";
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Instructions from './components/Instructions';
import DeclarationPDFPreview from './pages/DeclarationPDFPreview';

import {MainLayout} from './components/MainLayout';

const Protected= ({children})=>{
  const isLoggedIn= !!localStorage.getItem("college");
  return isLoggedIn? children: <Navigate to='/login' replace />;
};

function App(){
  const [ready, setReady]= React.useState(false);
  React.useEffect(()=>{
    setReady(true);
  },[]);

  if(!ready){
    return null;
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={
              <Navigate to="/login" replace/>
            } 
          />

          <Route path='/login' element={
              localStorage.getItem("college")? 
                <Navigate to="/home" replace/>:
                <Login/>
            }
          />

          <Route path='/home' element={
            <Protected>
              <MainLayout>
                <Home/>
              </MainLayout>
            </Protected>
          }
          />
          
          <Route path='/declaration-preview' element={
              <Protected>
                <MainLayout>
                  <DeclarationPDFPreview/>
                </MainLayout>
              </Protected>
            } 
          />

          <Route path='/instruction' element={<Instructions/>}/>
          <Route path='*' element={<ErrorPage/>} />
          
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App