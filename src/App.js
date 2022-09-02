// import './App.less'
import React, { useEffect } from 'react'
import '../node_modules/antd/dist/antd.css'
import './assets/css/style.css'
// import '../node_modules/antd/dist/antd.dark.css'
import { routes } from './routes/routes'
import { BACKEND_BASE_URL, SOCKET, USER_TYPES } from './util/constants'
import { Route, Routes } from 'react-router-dom'
import BasicLayout from './Layout/BasicLayout'
import PageNotFound from './pages/SystemPages/PageNotFound'
import { useDispatch } from 'react-redux'
import RouteProtection from './routes/RouteProtection'
import { io } from 'socket.io-client'
import { setMessage, setSocket } from './redux/chat'
import { message, notification } from 'antd'

const socket = io(BACKEND_BASE_URL)
function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSocket(socket))
    socket.on(SOCKET.RECIEVE_MESSAGE, data => {
      notification.info({
        message: `Message from ${data.firstName}`,
        description: data.message
      })
      dispatch(setMessage(data))
      console.log(data)
    })
  }, [])
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
