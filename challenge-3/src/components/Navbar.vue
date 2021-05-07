<template>
  <header class="flex items-center justify-between py-2 border-b">
    <span @click="$router.push('accommodations')" class="px-2 lg:px-0 uppercase font-bold text-purple-800">
      <img src="../assets/rent-logo.png" alt="" />
    </span>
    <ul class="inline-flex items-center">
      <li class="px-2 md:px-4">
        <span @click="$router.push('/').catch(()=>{})" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          Home
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="isLogin">
        <span @click="$router.push('bookmarks').catch(()=>{})" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          My Bookmark
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="!isLogin">
        <span @click="$router.push('signin')" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          Sign In
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="!isLogin">
        <span @click="$router.push('signup')" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          Sign Up
        </span>
      </li>
      <li class="px-2 md:px-4" v-if="isLogin">
        <span @click="signOut" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          Sign Out
        </span>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
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
};
</script>

<style>
</style>
