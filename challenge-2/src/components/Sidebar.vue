<template>
  <div class="w-1/6">
    <div
      class="fixed flex flex-col w-1/6 top-0 left-0 bg-gray-900 h-full shadow-lg"
      id="sidebar"
    >
      <div class="flex items-center pl-6 h-20 border-b border-gray-800">
        <img
          src="https://i.kym-cdn.com/photos/images/original/000/830/702/db2.jpg"
          alt=""
          class="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500"
        />
        <div class="ml-1">
          <p
            style="overflow-wrap: break-word !important;"
            class="ml-1 text-md font-medium tracking-wide overflow-clip text-gray-100 font-sans"
          >
            {{ username }}
          </p>
          <div class="badge">
            <span
              class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full"
              >{{ role }}</span
            >
          </div>
        </div>
      </div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-6 space-y-1">
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div
                class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase"
              >
                Dashboard
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              @click="$emit('changePage', 'AccommodationPage')"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
              <button
                class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
              >
                Accommodation List
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="$emit('changePage', 'HistoryPage')"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                  <path
                    d="M16 2l5 5v13.993c0 .556-.445 1.007-.993 1.007H3.993C3.445 22 3 21.545 3 21.008V2.992C3 2.444 3.447 2 3.999 2H16zm-1 2H5v16h14V8h-4V4zm-2 5v4h3v2h-5V9h2z"
                    fill="#000"
                  />
                </svg>
              </span>
              <button
                class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
              >
                Accommodation History
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="$emit('changePage', 'CreateAccommodationPage')"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  id="Layer_1"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>writter, writte, content, create, text</title>
                  <path
                    d="M9,15h3.81l8.7-8.69a2.7,2.7,0,0,0,0-3.82,2.77,2.77,0,0,0-3.82,0L9,11.19Zm2-3,8.11-8.1a.69.69,0,0,1,1,0h0a.68.68,0,0,1,0,1L12,13H11Z"
                  />
                  <path
                    d="M20,19.07a.93.93,0,0,1-.93.93H4.93A.93.93,0,0,1,4,19.07V4.93A.93.93,0,0,1,4.93,4H15V2H4.93A2.93,2.93,0,0,0,2,4.93V19.07A2.93,2.93,0,0,0,4.93,22H19.07A2.93,2.93,0,0,0,22,19.07V10H20Z"
                  />
                </svg>
              </span>
              <span
                class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                >Create Accommodation</span
              >
            </a>
          </li>
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div
                class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase"
              >
                Settings
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </span>
              <span
                class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                >Profile</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </span>
              <span
                class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                >Settings</span
              >
            </a>
          </li>
          <li @click="logout">
            <GoogleLogin
              :params="params"
              :logoutButton="true"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6 w-full"
            >
              <span
                class="inline-flex justify-center items-center ml-4 text-red-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
              <span
                class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                >Logout</span
              >
            </GoogleLogin>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "Sidebar",
  data() {
    return {
      email: "",
      role: "",
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
    };
  },
  methods: {
    logout() {
      this.$emit("changePage", "LoginPage");
      localStorage.clear();
    },
  },
  computed: {
    username () {
      return this.email.split("@")[0]
    }
  },
  components: {
    GoogleLogin,
  },
  created() {
    this.email = localStorage.email;
    this.role = localStorage.role;
  },
};
</script>

<style>
</style>