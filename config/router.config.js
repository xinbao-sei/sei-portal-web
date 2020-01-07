const routes = [
  {
    path: '/user',
    component: '../layouts/LoginLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/DashBoard',
      },
      {
        path: '/DashBoard',
        name: 'DashBoard',
        component: './DashBoard',
      },
      {
        component: './DashBoard',
        // component: './404',
      },
    ],
  },
  {
    component: './DashBoard',
    // component: './404',
  },
];

export default routes;