// import './App.less'
import React, { useEffect } from 'react'
import '../node_modules/antd/dist/antd.css'
import './assets/css/style.css'
// import '../node_modules/antd/dist/antd.dark.css'
import { routes } from './routes/routes'
import { USER_TYPES } from './util/constants'
import { Route, Routes } from 'react-router-dom'
import BasicLayout from './Layout/BasicLayout'
import PageNotFound from './pages/SystemPages/PageNotFound'
import { getMedicines } from './redux/medicines'
import { useDispatch } from 'react-redux'
import { getTransactions } from './redux/transactions'
import RouteProtection from './routes/RouteProtection'
function App () {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      {/* <BrowserRouter> */}
      <Routes>
        {routes[USER_TYPES.PHARMACIST].map(
          ({ path, component, title }, inx) => {
            return (
              <Route
                key={inx}
                path={path}
                element={
                  <BasicLayout title={title}>
                    <RouteProtection>{component}</RouteProtection>
                  </BasicLayout>
                }
              />
            )
          }
        )}
        {routes[0].map((route, inx) => {
          return <Route key={inx} path={route.path} element={route.component} />
        })}
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </React.Fragment>
  )
}

export default App
