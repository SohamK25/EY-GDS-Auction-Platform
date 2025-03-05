// import { useState } from 'react'
import './App.css'
import { Navigate ,Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ContactUsPage from './pages/ContactUsPage'
import Footer from './components/Footer'
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';

function App() {
  const {isCheckingAuth, authUser } = useAuthStore();

  // if (isCheckingAuth && !authUser) 
  //   return (
  //   <div className="flex items-center justify-center h-screen">
  //     <Loader className="size-10 animate-spin" />
  //   </div>
  // );
  return (
    <>
     <Navbar />

     <Routes>
      <Route path='/login'  element={!authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
      
      <Route path='/signup'  element={!authUser ? <SignUpPage /> : <Navigate to={"/login"} />} />
      <Route path='/contactus'  element={<ContactUsPage />} />
     </Routes>

     <Footer />
    </>
  )
}

export default App
