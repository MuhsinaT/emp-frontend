import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './Components/Add'
import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer } from 'react-toastify';




function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
      </Routes>


      <ToastContainer />

    </>
  )
}

export default App
