import React from 'react'
import Aboutus from './components/Pages/about/Aboutus'
import Login from './components/Pages/login/Login'
import Contactus from './components/Pages/contact/Contactus'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from './components/Pages/Home/Home'
import Editor from './components/Pages/editor/Editor'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/contact' element={<Contactus />} />
                    <Route path='/about' element={<Aboutus />} />
                    <Route path='/editor/:RoomId' element={<Editor />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/*' element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </>

    )
}

export default App