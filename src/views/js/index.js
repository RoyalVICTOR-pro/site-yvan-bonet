import '@babel/polyfill';
import { handleResolutionChange } from './mediaQueryManager';
import { createApp } from 'vue';
import contactFormApp from './contactForm.vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// MEDIA QUERY MANAGEMENT FOR MOBILE MENU
const mediaQuery = window.matchMedia('(min-width: 768px)');
mediaQuery.addEventListener('change', handleResolutionChange);
handleResolutionChange(mediaQuery);

// CONTACT FORM VUE APP
const contactForm = createApp(contactFormApp);

// // Components Auto Import 
// const requireComponent = require.context(
//   './components',
//   false,
//   /Base[A-Z]\w+\.(vue|js)$/
// );

// requireComponent.keys().forEach(fileName => {
//   const componentConfig = requireComponent(fileName);

//   const componentName = upperFirst(
//     camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
//   );

//   contactForm.component(componentName, componentConfig.default || componentConfig);
// });

contactForm.mount('#app'); 