import { removeUser } from '../redux/auth'
import { removeMedicines } from '../redux/medicines'
import { removeStore } from '../redux/store/index'
import { store } from '../redux/store'
import { removeTransactions } from '../redux/transactions'

export const displayDate = (date = new Date(), separator = '/') => {
  return `${date.getDate()} ${separator} ${date.getMonth() + 1} ${separator} 
  ${date.getFullYear()}`
}

export const logout = () => {
  localStorage.removeItem('medbox-token')
  store.dispatch(removeUser())
  store.dispatch(removeMedicines())
  store.dispatch(removeStore())
  store.dispatch(removeTransactions())
  window.location.href = '/login'
}
