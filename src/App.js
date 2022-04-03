// import './App.less'
import React, { useEffect } from 'react'
import '../node_modules/antd/dist/antd.css'
import { Button, message } from 'antd'
import { routes } from './routes'
import { USER_TYPES } from './util/constants'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BasicLayout from './Layout/BasicLayout'
import PageNotFound from './pages/SystemPages/PageNotFound'
import { getMedicines } from './redux/medicines'
import { useDispatch } from 'react-redux'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMedicines())
  }, [])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {routes[USER_TYPES.PHARMACIST].map(route => {
            return (
              <Route
                path={route.path}
                element={
                  <BasicLayout title={route.title}>
                    {route.component}
                  </BasicLayout>
                }
              />
            )
          })}
          {routes[0].map(route => {
            return <Route path={route.path} element={route.component} />
          })}
          <Route path='/404' component={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
