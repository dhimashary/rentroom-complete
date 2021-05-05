<template>
  <header class="flex items-center justify-between py-2 border-b">
    <a href="#" class="px-2 lg:px-0 uppercase font-bold text-purple-800">
      LOGO
    </a>
    <ul class="inline-flex items-center">
      <li class="px-2 md:px-4">
        <a href="" class="text-purple-600 font-semibold hover:text-purple-500">
          Home
        </a>
      </li>
      <li class="px-2 md:px-4">
        <a href="" class="text-gray-500 font-semibold hover:text-purple-500">
          About
        </a>
      </li>
      <li class="px-2 md:px-4">
        <a href="" class="text-gray-500 font-semibold hover:text-purple-500">
          Press
        </a>
      </li>
      <li class="px-2 md:px-4">
        <a href="" class="text-gray-500 font-semibold hover:text-purple-500">
          Contact
        </a>
      </li>
      <li class="px-2 md:px-4 hidden md:block">
        <span @click="$router.push('signin')" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          Sign In
        </span>
      </li>
      <li class="px-2 md:px-4 hidden md:block">
        <span @click="$router.push('signup')" class="cursor-pointer text-gray-500 font-semibold hover:text-purple-500">
          Sign Up
        </span>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style>
</style>
