import Vue from 'vue';
import App from './App.vue';
// import VueToastify from "vue-toastify";
// Vue.use(VueToastify);
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {
  position: "top-right"
});

new Vue({
  render: h => h(App),
}).$mount('#app');