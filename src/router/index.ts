import {
  Router,
  getRouter,
  RouteRecordRaw,
  useBeforeEach,
  useAfterEach,
  createWebHistory,
  createWebHashHistory,
} from 'block-libs/dist/router';

const routes: RouteRecordRaw[] = [
  {
    path: window.__MICRO_APP_ENVIRONMENT__ ? window.__MICRO_APP_BASE_ROUTE__ : '/',
    children: [
      // home
      {
        path: '',
        redirect() {
          return 'home';
        },
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about.vue'),
      },
    ],
  },
];
console.log('routes', routes);
const router: Router = getRouter({
  history: createWebHashHistory(
    window.__MICRO_APP_ENVIRONMENT__ ? window.__MICRO_APP_BASE_ROUTE__ : '/',
  ),
  routes,
});

// before each
// useBeforeEach(router);

router.beforeEach((to, from, next) => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    console.log('to', to.path);
    if (!to.path.includes(window.__MICRO_APP_BASE_ROUTE__)) {
      next({
        path: window.__MICRO_APP_BASE_ROUTE__ + to.path,
      });
    }
  }
  next();
});
// after each
useAfterEach(router);

export { router };
