import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import AddMedicines from './pages/Medicines/AddMedicines'
import Medicines from './pages/Medicines/index'
import Stores from './pages/Stores'
import RegisterStores from './pages/Stores/RegisterStores'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/medicines' element={<Medicines />} />
        <Route path='/add-medicines' element={<AddMedicines />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/register-store' element={<RegisterStores />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
