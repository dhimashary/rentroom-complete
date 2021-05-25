import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../views/MainPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'Accommodations',
        component: () => import(/* webpackChunkName: "Accommodations" */ '../views/AccommodationList.vue'),
      },
      {
        path: 'bookmarks',
        name: 'Bookmarks',
        component: () => import(/* webpackChunkName: "Bookmarks" */ '../views/BookmarkList.vue'),
      },
    ],
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "SignIn" */ '../views/SignInPage.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUpPage.vue'),
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
