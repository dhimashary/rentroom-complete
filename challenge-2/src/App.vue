<template>
  <div>
    <LoginPage
      v-if="currentPage === 'LoginPage'"
      @setLocalStorage="setLocalStorage"
      @googleSignIn="googleSignIn"
      @changePage="changePage"
    ></LoginPage>

    <RegisterPage
      v-else-if="currentPage === 'RegisterPage'"
      @setLocalStorage="setLocalStorage"
      @googleSignIn="googleSignIn"
      @changePage="changePage"
    ></RegisterPage>

    <DashboardPage
      v-else
      :currentPage="currentPage"
      @changePage="changePage"
    ></DashboardPage>
  </div>
</template>

<script>
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import DashboardPage from "./views/DashboardPage";
import apiConfig from "./apiConfig/index";

export default {
  name: "app",
  data() {
    return {
      message: "Hello world",
      currentPage: "LoginPage",
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    DashboardPage,
  },
  methods: {
    changePage(page) {
      console.log(page, "called");
      this.currentPage = page;
    },
    googleSignIn(googleToken) {
      apiConfig({
        method: "POST",
        url: "/users/googlelogin",
        data: {
          googleToken,
        },
      })
        .then(({ data }) => {
          this.$toast.open("Sign In Success !");
          this.setLocalStorage(data);
          this.changePage("AccommodationPage")
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        });
    },
    setLocalStorage(data) {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
    },
  },
  created () {
    if (localStorage.getItem("access_token")) {
      this.changePage("AccommodationPage")
    } else {
      this.changePage("LoginPage")
    }
  }
};
</script>

<style scoped>
</style>