import React,{lazy,Suspense} from 'react'
import "./App.css";
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import { useAuth } from "./context/AuthContext";
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ErrorPage from './pages/ErrorPage';

import {MainLayout} from './components/MainLayout';

const Home= lazy(()=> import('./pages/Home'));
const Instructions= lazy(()=>import('./components/Instructions'));
const DeclarationPDFPreview= lazy(()=>import('./pages/DeclarationPDFPreview'));

const Protected = ({ children }) => {
  const {auth} = useAuth();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (!auth.isPasswordChanged){
    return <Navigate to="/change-password" replace />;
  }
  return children;
};

const InstructionPage = () => {
  const navigate = useNavigate();
  return <Instructions onClose={() => navigate('/home')} />;
};

function App(){
  const {auth}=useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={
              <Navigate to="/login" replace/>
            } 
          />

          <Route
            path="/login"
            element={
              auth.isLoggedIn?(
                auth.isPasswordChanged?(
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/change-password" replace />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/change-password"
            element={
              auth.isLoggedIn ? (
                auth.isPasswordChanged ? (
                  <Navigate to="/home" replace />
                ) : (
                  <ChangePassword />
                )
              ) : (
                <Navigate to="/login" replace />
              )
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

          <Route path='/instruction' element={
            <Protected>
              <MainLayout>
                <InstructionPage />
              </MainLayout>
            </Protected>
          } />
          <Route path='*' element={<ErrorPage/>} />
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App