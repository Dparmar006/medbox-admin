// import './App.less'
import React from 'react'
import '../node_modules/antd/dist/antd.css'
import { Button } from 'antd'
import { routes } from './routes'
import { USER_TYPES } from './util/constants'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BasicLayout from './Layout/BasicLayout'
import PageNotFound from './pages/SystemPages/PageNotFound'
function App () {
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
