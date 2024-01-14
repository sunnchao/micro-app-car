import {
  Router,
  getRouter,
  RouteRecordRaw,
  useBeforeEach,
  useAfterEach,
  createWebHistory,
  createWebHashHistory,
} from '@shared/router';

const routes: RouteRecordRaw[] = [
  // home
  {
    path: '/',
    redirect() {
      return '/home';
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue'),
  },
];
const router: Router = getRouter({
  history: createWebHashHistory('/' + window.__MICRO_APP_NAME__ || '/'),
  routes,
});

// before each
// useBeforeEach(router);

router.beforeEach((to, from, next) => {
  next();
});
// after each
useAfterEach(router);

export { router };
