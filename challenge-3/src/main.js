import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faStar, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faBookmark);
library.add(faStar);
library.add(faGift);
Vue.use(VueToast);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
