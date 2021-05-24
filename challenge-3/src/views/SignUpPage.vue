<template>
  <div class="flex min-h-screen bg-white">
    <div
      class="w-1/2 bg-cover md:block hidden"
      style="
        background-image: url(https://images.pexels.com/photos/4058916/pexels-photo-4058916.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500);
      "
    ></div>
    <div class="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
      <div class="text-left p-0 font-sans">
        <h1 class="text-gray-800 text-3xl font-medium">
          Create an account for free
        </h1>
        <h3 class="p-1 text-gray-700">Free forever. No payment needed.</h3>
      </div>
      <form
        @submit.prevent="$store.dispatch('register', { email, password })"
        class="p-0"
      >
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
          />
        </div>

        <div class="mt-6 block p-5 text-sm md:font-sans text-xs text-gray-800">
          <input type="checkbox" class="inline-block border-0" required />
          <span display="inline" class=""
            >By creating an account you are agreeing to our
            <a class="" href="/s/terms" target="_blank" data-test="Link">
              <span class="underline">Terms and Conditions</span>
            </a>
            and
            <a class="" href="/s/privacy" target="_blank" data-test="Link">
              <span class="underline">Privacy Policy</span>
            </a>
          </span>
        </div>

        <div class="mt-10">
          <button
            type="submit"
            class="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
          >
            Sign up with email
          </button>
        </div>
      </form>
      <div class="text-sm md:font-sans text-sm text-gray-800 text-center my-2">
        or
      </div>
      <GoogleLogin
        :params="params"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        class="bg-white text-gray-500 shadow cursor-pointer w-full rounded border-2"
        style="height: 50px"
      >
        <div class="h-full w-full flex">
          <div class="p-4">
            <div
              style="width: 18px; height: 18px"
              class="abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 48 48"
                class="abcRioButtonSvg"
              >
                <g>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </g>
              </svg>
            </div>
          </div>
          <span class="w-full text-center" style="line-height: 48px">Sign In with Google</span>
        </div>
      </GoogleLogin>
      <span class="" data-test="Link"
        ><span class="block p-5 text-center text-gray-800 text-md"
          >Already have an account?
          <a
            class="text-blue-500 cursor-pointer"
            @click="$router.push('signin')"
            >Sign In Here</a
          ></span
        ></span
      >
      <span class="block text-center text-gray-800 text-md"
        >Want to search the accommodation first?
        <a class="text-blue-500 cursor-pointer" @click="$router.push('/')"
          >Back To Home</a
        ></span
      >
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  name: 'SignUpPage',
  data() {
    return {
      email: '',
      password: '',
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      renderParams: {
        width: 475,
        height: 50,
        longtitle: true,
      },
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    onSuccess(googleUser) {
      const googleToken = googleUser.getAuthResponse().id_token;
      this.$store.dispatch('googleSignIn', googleToken);
    },
    onFailure() {
      this.$toast.error('Oops something wrong');
    },
  },
};
</script>

<style>
</style>
