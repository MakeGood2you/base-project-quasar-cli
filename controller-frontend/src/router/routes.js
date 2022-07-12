import jwt_decode from 'jwt-decode'
import pages from '../services/pages'

const isLoggedIn = (to, from, next) => {
  if (sessionStorage.has('accessToken')) {
    return next({ name: 'Dashboard', params: to.params })
  }
  next()
}

const isAuth = (to, from, next) => {
  if (!sessionStorage.has('accessToken')) {
    return next({ name: 'Login', params: to.params })
  }
  next()
}

const checkAuth = (to, from, next) => {
  const decoded = jwt_decode(sessionStorage.get('accessToken'))
  if (decoded.user.roles.length > 0) {
    for (const key in pages) {
      if (pages[key] === to.name && !decoded.user.roles.includes(key)) {
        return next({ name: pages[decoded.user.roles[0]], params: to.params })
      }
    }
  }
  next()
}
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "backOffice" */ '../layouts/AuthLayout'),
    children: [
      {
        name: 'Login', path: '/', component: () => import('../pages/Auth/Login'),
        beforeEnter: isLoggedIn
      },

      {
        name: 'ForgotPassword', path: '/forgot-password', component: () => import('../pages/Auth/ForgotPassword'),
        beforeEnter: isLoggedIn
      },

      {
        name: 'ResetPassword', path: '/ResetPassword', component: () => import('../pages/Auth/ResetPassword'),
        beforeEnter: isLoggedIn
      },
    ],
  }, {
    path: '/Dashboard', name: 'Dashboard', component: () => import('../layouts/MainLayout'),
    beforeEnter: isAuth,
    children: [
      {
        path: '/UsersTab', name: 'UsersTab', component: () => import('../pages/DashBoard/UsersTab'),
        beforeEnter: checkAuth
      },

      {
        path: '/ChangePassword', name: 'ChangePassword', component: () => import('../pages/Auth/ChangePassword'),
        beforeEnter: checkAuth
      },

      {
        path: '/logout', name: 'Logout',
        beforeEnter: async (to, from, next) => {
          sessionStorage.remove('accessToken')
          next({ name: 'Login' })
        }
      },
    ],
  },
  {
    path: '*',
    redirect: { name: 'Login' }
  },


  {
    path: '*',
    redirect: '/'
  }
]

export default routes
