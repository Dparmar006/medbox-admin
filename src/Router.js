import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import Medicines from './pages/Medicines'
import Stores from './pages/Stores'
import RegisterStores from './pages/Stores/RegisterStores'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/medicines' element={<Medicines />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/stores/register-store' element={<RegisterStores />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
