<template>
  <header class="flex items-center justify-between py-2 border-b">
    <span
      @click="$router.push('/')"
      class="px-2 lg:px-0 uppercase font-bold text-purple-800"
    >
      <img src="../assets/rent-logo.png" alt="" />
    </span>
    <ul class="inline-flex items-center">
      <li class="px-2 md:px-4">
        <span
          @click="$router.push('/').catch(() => {})"
          class="cursor-pointer font-semibold hover:text-indigo-700"
          :class="
            $route.name === 'Accommodations'
              ? 'text-indigo-700'
              : 'text-gray-500'
          "
        >
          Home
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="isLogin">
        <span
          @click="$router.push('/bookmarks').catch(() => {})"
          class="cursor-pointer font-semibold hover:text-indigo-700"
          :class="
            $route.name === 'Bookmarks' ? 'text-indigo-700' : 'text-gray-500'
          "
        >
          My Bookmark
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="!isLogin">
        <span
          @click="$router.push('/signin')"
          class="cursor-pointer text-gray-500 font-semibold hover:text-indigo-700"
        >
          Sign In
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="!isLogin">
        <span
          @click="$router.push('/signup')"
          class="cursor-pointer text-gray-500 font-semibold hover:text-indigo-700"
        >
          Sign Up
        </span>
      </li>
      <li v-else>
        <img
          :src="avatar"
          class="h-8 w-8 rounded-full object-cover"
        />
      </li>
      <GoogleLogin :params="params" :logoutButton="true" v-if="isLogin">
        <li class="px-2 md:px-4 flex">
          <span
            @click="signOut"
            class="cursor-pointer text-gray-500 font-semibold hover:text-yellow-500"
          >
            Sign Out
          </span>
        </li>
      </GoogleLogin>
    </ul>
  </header>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  name: 'Navbar',
  data() {
    return {
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      avatar: '',
    };
  },
  components: {
    GoogleLogin,
  },
  computed: {
    isLogin() {
      return localStorage.access_token;
    },
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push('/signin');
    },
  },
  created() {
    if (localStorage.avatar) {
      this.avatar = localStorage.avatar;
    }
  },
};
</script>

<style>
</style>
