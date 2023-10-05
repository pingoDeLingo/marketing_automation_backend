import { createRouter, createWebHistory } from 'vue-router';

import error from './routes/error';
import home from './routes/home';
import about from './routes/about';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...error,
    ...home,
    ...about
  ]
});

export default router;