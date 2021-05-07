<template>
  <div class="flex min-h-screen bg-white">
    <div
      class="w-1/2 bg-cover md:block hidden"
      style="
        background-image: url(https://images.pexels.com/photos/751266/pexels-photo-751266.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500);
      "
    ></div>
    <div class="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
      <div class="text-left p-0 font-sans">
        <h1 class="text-gray-800 text-3xl font-medium">Sign In</h1>
        <h3 class="p-1 text-gray-700">Welcome Back !</h3>
      </div>
      <form @submit.prevent="$store.dispatch('login', { email, password })" class="p-0">
        <div class="mt-5">
          <!-- <label for="email" class="sc-bqyKva ePvcBv">Email</label> -->
          <input
            type="text"
            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div class="mt-5">
          <input
            type="password"
            class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>

        <div class="mt-10">
          <button
            type="submit"
            class="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
          >
          Sign In
          </button>
        </div>
      </form>
      <span class="block p-5 text-center text-gray-800 text-md"
        >Don't have an account?
        <a class="text-blue-500 cursor-pointer" @click="$router.push('signup')"
          >Register here</a
        ></span
      >
      <span class="block p-5 text-center text-gray-800 text-md"
        >Want to search the accommodation first?
        <a class="text-blue-500 cursor-pointer" @click="$router.push('/')"
          >Back To Home</a
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style>
</style>
