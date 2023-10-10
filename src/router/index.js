import { createRouter, createWebHistory } from 'vue-router';

import error from './routes/error';
import home from './routes/home';
import about from './routes/about';
import signup from './routes/signup';
import login from './routes/login';
import dashboard from './routes/dashboard';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...error,
    ...home,
    ...about,
    ...signup,
    ...login,
    ...dashboard
  ]
});

export default router;