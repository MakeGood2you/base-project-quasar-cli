
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name:'Login', path: '/', component: () => import('pages/Login.vue') },
      {name:'Home', path: '/home', component: () => import('pages/Index.vue') },
      {name:'ForgotPassword', path: '/forgot-password', component: () => import('pages/ForgotPassword.vue') },
      {name:'ResetPassword', path: '/ResetPassword', component: () => import('pages/ResetPassword.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
