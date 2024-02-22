import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from '@/router';
import { _store } from '@/store';

async function boostrap() {
  console.log('__MICRO_APP_PUBLIC_PATH__', window.__MICRO_APP_PUBLIC_PATH__);
  console.log('__MICRO_APP_NAME__', window.__MICRO_APP_NAME__);
  console.log('__MICRO_APP_ENVIRONMENT__', window.__MICRO_APP_ENVIRONMENT__);
  console.log('__MICRO_APP_BASE_ROUTE__', window.__MICRO_APP_BASE_ROUTE__);

  const app = createApp(App);
  app.use(router);
  app.use(_store);
  app.mount('#car-app');
}

boostrap();
