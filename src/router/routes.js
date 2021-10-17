
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageHome.vue'),
        name: 'Home'
    },
      { path: '/about', component: () => import('src/pages/PageLog.vue'),
        name: 'Devitter Patch log'
    },
      { path: '/contect', component: () => import('src/pages/PageContect.vue'),
        name: 'Send DM'
    },
      { path: '/signs', component: () => import('src/pages/PageSignin.vue'),
        name: 'Sign In'
    },
      { path: '/signup', component: () => import('src/pages/PageSignup.vue'),
        name: 'Sign Up'
    },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
