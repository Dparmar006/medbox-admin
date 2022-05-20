// import './App.less'
import React, { useEffect } from 'react'
import '../node_modules/antd/dist/antd.css'
import styles from './App.less'
import './assets/css/style.css'
// import '../node_modules/antd/dist/antd.dark.css'
import { message } from 'antd'
import { routes } from './routes'
import { USER_TYPES } from './util/constants'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import BasicLayout from './Layout/BasicLayout'
import PageNotFound from './pages/SystemPages/PageNotFound'
import { getMedicines } from './redux/medicines'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import api from './util/api'
import { setUser } from './redux/auth'
import { setStore } from './redux/store/index'
import { getTransactions } from './redux/transactions'
function App () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const nevigate = useNavigate()
  const getUser = async () => {
    if (!user.token) {
      message.info('Good to see you, Please login.')
      return nevigate('/login')
    }
    const decoded = jwtDecode(user.token)
    try {
      const res = await api.get(`/pharmacists/${decoded?.pharmacistId}`)
      // setMedicines(res.data.medicines)
      dispatch(setUser(res?.data?.pharmacist))
      dispatch(setStore(res?.data?.store))
    } catch (err) {
      message.error(err.message)
    }
  }

  useEffect(() => {
    if (!user?.email) {
      getUser()
    } else {
      dispatch(getMedicines())
      dispatch(getTransactions())
    }
  }, [user?.email])

  return (
    <React.Fragment>
      {/* <BrowserRouter> */}
      <Routes>
        {routes[USER_TYPES.PHARMACIST].map(route => {
          return (
            <Route
              path={route.path}
              element={
                <BasicLayout title={route.title}>{route.component}</BasicLayout>
              }
            />
          )
        })}
        {routes[0].map(route => {
          return <Route path={route.path} element={route.component} />
        })}
        <Route path='/404' component={<PageNotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </React.Fragment>
  )
}

export default App
