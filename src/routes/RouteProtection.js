import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteProtection = ({ path, title, children, inx, ...rest }) => {
  let isAuthenticated = false
  if (localStorage.getItem('medbox-token')) {
    isAuthenticated = true
  }
  return isAuthenticated ? children : <Navigate to='/login' replace />
}

export default RouteProtection
