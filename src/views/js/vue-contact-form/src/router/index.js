import { createRouter, createWebHistory } from 'vue-router';
import ContactForm from '../views/contactForm.vue';
import ContactConfirm from '../views/contactConfirm.vue';

const routes = [
  {
    path: '/contact',
    name: 'contactForm',
    component: ContactForm,
  },
  {
    path: '/confirmation',
    name: 'contactConfirm',
    component: ContactConfirm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/* let firstTime = true;
router.beforeEach(async (to, from) => {
  if (firstTime === true) {
    firstTime = false;
    return { name: 'home' };
  }
}); */

export default router;
