<template>
  <div>
    <div v-if="currentPage === 'LoginPage'" class="hidden">
      <LoginPage  @changePage="changePage"/>
    </div>
    <div v-if="currentPage === 'RegisterPage'" class="hidden">
      <RegisterPage @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

export default {
  name: "app",
  data() {
    return {
      message: "Hello world",
      currentPage: "LoginPage"
    };
  },
  components: {
    LoginPage,
    RegisterPage
  },
  methods: {
    changePage(page) {
      console.log(page, "called")
      this.currentPage = page
    }
  }
};
</script>

<style scoped>
</style>