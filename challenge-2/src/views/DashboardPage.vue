<template>
  <div
    class="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased text-gray-800"
  >
    <Sidebar @changePage="changePage"></Sidebar>
    <AccommodationPage
      v-if="currentPage === 'AccommodationPage'"
      :accommodations="accommodations"
    ></AccommodationPage>
    <CreateAccommodationPage
      v-else-if="currentPage === 'CreateAccommodationPage'"
    ></CreateAccommodationPage>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import AccommodationPage from "./AccommodationPage";
import CreateAccommodationPage from "./CreateAccommodationPage";
import apiConfig from "../apiConfig/index";

export default {
  name: "DashboardPage",
  props: ["currentPage"],
  data() {
    return {
      accommodations: [],
      accommodationDetail: {},
    };
  },
  components: {
    Sidebar,
    AccommodationPage,
    CreateAccommodationPage,
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    findAllAccommodations() {
      apiConfig({
        method: "GET",
        url: "/accommodations",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.accommodations = data
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        });
    },
  },
  created() {
    this.findAllAccommodations();
  },
};
</script>

<style>
</style>