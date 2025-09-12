import '@babel/polyfill';
import { handleResolutionChange } from './mediaQueryManager';
// import { createApp } from 'vue';
// import contactFormApp from './contactForm.vue';
// import upperFirst from 'lodash/upperFirst';
// import camelCase from 'lodash/camelCase';
// import router from './router';

// MEDIA QUERY MANAGEMENT FOR MOBILE MENU
const mediaQuery = window.matchMedia('(min-width: 768px)');
mediaQuery.addEventListener('change', handleResolutionChange);
handleResolutionChange(mediaQuery);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const topPosition = targetElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      });
    }
  });
});

// CONTACT FORM VUE APP
// const contactForm = createApp(contactFormApp);
// contactForm.use(router).mount('#app');

// import '../sass/abstracts/_variables.scss'; 
import { createApp } from 'vue';
import App from './vue-contact-form/src/App.vue';
import router from './vue-contact-form/src/router';

createApp(App).use(router).mount('#app');
