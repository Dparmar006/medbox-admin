import { removeUser } from '../redux/auth'
import { removeMedicines } from '../redux/medicines'
import { removeStore } from '../redux/store/index'
import { store } from '../redux/store'
import { removeTransactions } from '../redux/transactions'
import dayjs from 'dayjs'

export const displayDate = (date = new Date(), format = "DD MMM YYYY") => {
  return dayjs(date).format(format)
}

export const logout = () => {
  localStorage.removeItem('medbox-token')
  store.dispatch(removeUser())
  store.dispatch(removeMedicines())
  store.dispatch(removeStore())
  store.dispatch(removeTransactions())
  window.location.href = '/login'
}
