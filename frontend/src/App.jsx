// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ContactUsPage from './pages/ContactUsPage'
import Footer from './components/Footer'

function App() {
  return (
    <>
     <Navbar />

     <Routes>
      <Route path='/login'  element={<LoginPage />} />
      <Route path='/signup'  element={<SignUpPage />} />
      <Route path='/contactus'  element={<ContactUsPage />} />
     </Routes>

     <Footer />
    </>
  )
}

export default App
