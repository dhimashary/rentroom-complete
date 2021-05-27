<template>
  <div
    class="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased text-gray-800"
  >
    <Sidebar @changePage="changePage"></Sidebar>
    <AccommodationPage
      v-if="currentPage === 'AccommodationPage'"
      :accommodations="accommodations"
      @populateUpdateForm="setPopulateFormId"
      @dataDeleted="dataDeleted"
      @dataUpdated="dataUpdated"
      :types="types"
    ></AccommodationPage>
    <CreateAccommodationPage
      v-else-if="currentPage === 'CreateAccommodationPage'"
      @newDataCreated="newDataCreated"
      :types="types"
    ></CreateAccommodationPage>
    <UpdateAccommodationPage
      v-else-if="currentPage === 'UpdateAccommodationPage'"
      @dataUpdated="dataUpdated"
      @changePage="changePage"
      :accommodationId="populateUpdateId"
      :types="types"
    >
    </UpdateAccommodationPage>
    <HistoryPage
      v-else-if="currentPage === 'HistoryPage'"
    ></HistoryPage>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import AccommodationPage from "./AccommodationPage";
import CreateAccommodationPage from "./CreateAccommodationPage";
import UpdateAccommodationPage from "./UpdateAccommodationPage";
import HistoryPage from "./HistoryPage";
import apiConfig from "../apiConfig/index";

export default {
  name: "DashboardPage",
  props: ["currentPage"],
  data() {
    return {
      accommodations: [],
      accommodationDetail: {},
      types: [],
      populateUpdateId: null,
    };
  },
  components: {
    Sidebar,
    AccommodationPage,
    CreateAccommodationPage,
    UpdateAccommodationPage,
    HistoryPage
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    findAllAccommodations() {
      this.$toast.open({
        message: "Find All Accommodation, Please Wait",
        type: "info",
        duration: 0,
      });
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
        })
        .finally(_ => {
          setTimeout(() => {
            this.$toast.clear()
          }, 2000)
        })
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
        })
        .finally(_ => {
          setTimeout(() => {
            this.$toast.clear()
          }, 2000)
        })
    },
    newDataCreated(data) {
      this.accommodations.unshift(data);
      this.changePage("AccommodationPage");
    },
    dataDeleted(id) {
      this.accommodations = this.accommodations.filter(
        (accommodation) => accommodation.id != id
      );
    },
    dataUpdated(data) {
      for (let i = 0; i < this.accommodations.length; i++) {
        if (this.accommodations[i].id === data.id) {
          this.accommodations[i] = data;
          break;
        }
      }
      this.changePage("AccommodationPage");
    },
    setPopulateFormId(id) {
      this.populateUpdateId = id;
      this.changePage("UpdateAccommodationPage");
    },
  },
  created() {
    this.findAllAccommodations();
    this.findAccommodationTypes();
  },
};
</script>

<style>
</style>