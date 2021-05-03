<template>
  <div
    class="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased text-gray-800"
  >
    <Sidebar @changePage="changePage"></Sidebar>
    <AccommodationPage
      v-if="currentPage === 'AccommodationPage'"
      :accommodations="accommodations"
      @dataDeleted="dataDeleted"
    ></AccommodationPage>
    <CreateAccommodationPage
      v-else-if="currentPage === 'CreateAccommodationPage'"
      @newDataCreated="newDataCreated"
      :types="types"
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
      types: [],
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
          this.accommodations = data;
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        });
    },
    findAccommodationTypes() {
      apiConfig({
        method: "GET",
        url: "/types",
      })
        .then(({ data }) => {
          this.types = data;
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        });
    },
    newDataCreated(data) {
      this.accommodations.unshift(data)
      this.$emit("changePage", "AccommodationPage")
      console.log("YOOP")
    },
    dataDeleted(id) {
      console.log(id)
      this.accommodations = this.accommodations.filter(accommodation => accommodation.id != id)
    }
  },
  created() {
    this.findAllAccommodations();
    this.findAccommodationTypes();
  },
};
</script>

<style>
</style>