import Vue from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {
  position: "top-right"
});

new Vue({
  render: h => h(App),
}).$mount('#app');