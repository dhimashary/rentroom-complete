<template>
  <!-- 
    =======================================================================
    Name    :   Simple Sign In
    Author  :   Surjith S M
    Twitter :   @surjithctly

    Get more components here 👉 https://web3templates.com/components

    Copyright © 2021
    =======================================================================
  -->
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Sign Up
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Sign Up to access your account
          </p>
        </div>
        <div class="m-7">
          <form @submit.prevent="signUp">
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Email Address</label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                placeholder="you@company.com"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Password</label
                >
              </div>
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Your Password"
                autocomplete="off"
                pattern=".{6,13}"
                required
                title="6 to 13 characters minimum"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
            <p class="text-sm text-center text-gray-400">
              Already have an account yet?
              <button
                type="button"
                @click="$emit('changePage', 'LoginPage')"
                class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >
                Sign In</button
              >.
            </p>
            <p class="text-sm text-center text-gray-400 mb-3">
              Or Sign In with Google
            </p>

            <GoogleLogin
              :params="params"
              :renderParams="renderParams"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
              >LOGIN</GoogleLogin
            >
            <GoogleLogin :params="params" :logoutButton="true"
              >NANTI APUS</GoogleLogin
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import apiConfig from "../apiConfig/index";

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 380,
        height: 50,
        margin: "auto",
        longtitle: true,
      },
    };
  },
  methods: {
    signUp() {
      apiConfig({
        method: "POST",
        url: "/users/register",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(({ data }) => {
          this.$toast.open("Sign Up Success !");
          this.$emit("setLocalStorage", data);
          this.$emit("changePage", "AccommodationPage")
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        });
    },
    onSuccess(googleUser) {
      const googleToken = googleUser.getAuthResponse().id_token;
      this.$emit("googleSignIn", googleToken);
    },
    onFailure() {
      this.$toast.error("Oops something wrong");
    },
  },
  components: {
    GoogleLogin,
  },
};
</script>

<style>
</style>