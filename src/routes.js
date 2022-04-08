import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Billing from './pages/Billing'
import Dashboard from './pages/Dashboard'
import Medicines from './pages/Medicines'
import AddMedicines from './pages/Medicines/AddMedicines'
import UsersMedicines from './pages/Medicines/PharmacistsMedicines'
import MyStore from './pages/MyStore/MyStore'
import Stores from './pages/Stores'
import RegisterStores from './pages/Stores/RegisterStores'
import { USER_TYPES } from './util/constants'

export const routes = {
  // common
  0: [
    // auth
    {
      path: '/login',
      component: <Login />,
      title: 'Login'
    },
    {
      path: '/register',
      component: <Register />,
      title: 'Register'
    }
  ],
  [USER_TYPES.ADMIN]: [
    {
      path: '/admin/dahsboard',
      component: Dashboard,
      title: 'Dashboard'
    },
    {
      path: '/admin/stores',
      component: Stores,
      title: 'Stores'
    },
    {
      path: '/admin/medicines',
      component: Medicines,
      title: 'Medicines'
    }
  ],
  [USER_TYPES.PHARMACIST]: [
    {
      path: '/',
      component: <Dashboard />,
      title: 'Dashboard'
    },

    // stores
    {
      path: '/stores',
      component: <Stores />,
      title: 'Stores'
    },
    {
      path: '/my-store',
      component: <MyStore />,
      title: 'My store'
    },
    {
      path: '/register-store',
      component: <RegisterStores />,
      title: 'Register store'
    },

    // medicines
    {
      path: '/medicines',
      component: <Medicines />,
      title: 'Medicines'
    },
    {
      path: '/add-medicines',
      component: <AddMedicines />,
      title: 'Add medicines'
    },
    {
      path: '/my-medicines',
      component: <UsersMedicines />,
      title: 'Add medicines'
    },

    // billing
    {
      path: '/billing',
      component: <Billing />,
      title: 'Billing'
    }
  ]
}
