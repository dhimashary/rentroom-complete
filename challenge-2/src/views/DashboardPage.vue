<template>
  <div
    class="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased text-gray-800"
  >
    <Sidebar @changePage="changePage"></Sidebar>
    <AccommodationPage v-if="currentPage === 'AccommodationPage'"></AccommodationPage>
    <CreateAccommodationPage v-else-if="currentPage === 'CreateAccommodationPage'"></CreateAccommodationPage>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import AccommodationPage from "./AccommodationPage";
import CreateAccommodationPage from "./CreateAccommodationPage";

export default {
  name: "DashboardPage",
  props: ["currentPage"],
  components: {
    Sidebar,
    AccommodationPage,
    CreateAccommodationPage
  },
  methods: {
    changePage (page) {
      console.log("page", page)
      this.$emit("changePage", page)
    }
  }
};
</script>

<style>
</style>