<template>
  <div>
    <LoginPage
      v-if="currentPage === 'LoginPage'"
      @changePage="changePage"
    ></LoginPage>

    <RegisterPage
      v-if="currentPage === 'RegisterPage'"
      @changePage="changePage"
    ></RegisterPage>

    <DashboardPage
      v-else-if="currentPage === 'AccommodationPage'"
      :currentPage="currentPage"
      @changePage="changePage"
    ></DashboardPage>
  </div>
</template>

<script>
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import DashboardPage from "./views/DashboardPage";

export default {
  name: "app",
  data() {
    return {
      message: "Hello world",
      currentPage: "AccommodationPage",
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
  },
};
</script>

<style scoped>
</style>