import { useState, useEffect } from 'react'
import './App.css'
import { Navigate ,Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ContactUsPage from './pages/ContactUsPage'
import Footer from './components/Footer'
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import AddAuctionPage from './pages/AddAuctionPage'
import AuctionsPage from './pages/AuctionsPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const {isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); 
  }, []);

  if (isCheckingAuth && !authUser) 
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  // console.log(authUser);
  return (
    <>
     <Navbar />

     <Routes>
     <Route path='/' element={<HomePage />} />
     <Route path='/auctions' element={<AuctionsPage />} />
      <Route path='/login'  element={!authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
      <Route path='/profile'  element={authUser ? <ProfilePage /> : <Navigate to={"/login"} /> } />
      
      <Route path='/signup'  element={!authUser ? <SignUpPage /> : <Navigate to={"/login"} />} />
      <Route path='/add-auction'  element={authUser ? <AddAuctionPage /> : <Navigate to={"/login"} />} />
      <Route path='/contactus'  element={<ContactUsPage />} />
     </Routes>

     <Footer />

     <Toaster />
    </>
  )
}

export default App
