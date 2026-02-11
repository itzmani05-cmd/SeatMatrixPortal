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

import {Modal} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';


const Protected= ({children})=>{
  const isLoggedIn= !!localStorage.getItem("college");
  return isLoggedIn? children: <Navigate to='/login' replace />;
};

function App(){
  const [ready, setReady]= React.useState(false);

  React.useEffect(()=>{
    
    Modal.info({
      title: (
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-800">
            Information
          </span>
        </div>
      ),
      content: (
        <div className="mt-4 space-y-4 text-gray-700">
          <p className="text-sm leading-relaxed">
            Declaration and document upload will be opened soon. Please complete all other steps within the deadline.
          </p>
        </div>
      ),
      okText: "Ok",
      centered: true,
      maskClosable: false,
    });
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