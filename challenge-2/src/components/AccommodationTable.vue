<template>
  <div>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-1 sm:px-6">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard pt-3 rounded-bl-lg rounded-br-lg"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                No
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Facility
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Capacity
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Accommodation Image
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Location
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <AccommodationTableRow
              v-for="(accommodation, i) in filteredAccommodation"
              :types="types"
              :key="accommodation.id"
              :i="i + (tablePage * 6 - 6)"
              :accommodation="accommodation"
              @patchStatus="patchStatus"
              @deleteAccommodation="deleteAccommodation"
              @populateUpdateForm="populateUpdateForm"
            ></AccommodationTableRow>
          </tbody>
        </table>
        <Pagination
          :tablePage="tablePage"
          :totalPage="totalPage"
          @changeTablePage="changeTablePage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from "../apiConfig";
import AccommodationTableRow from "./AccommodationTableRow";
import Pagination from "./Pagination";

export default {
  name: "AccommodationTable",
  props: ["accommodations", "types"],
  data() {
    return {
      tablePage: 1,
    };
  },
  components: {
    AccommodationTableRow,
    Pagination,
  },
  computed: {
    filteredAccommodation() {
      let endIndex = this.tablePage * 6;
      let startIndex = this.tablePage * 6 - 6;
      return this.accommodations.slice(startIndex, endIndex);
    },
    totalPage() {
      return Math.ceil(this.accommodations.length / 6);
    },
  },
  methods: {
    changeTablePage(page) {
      this.tablePage = page;
    },
    deleteAccommodation(id) {
      const isConfirmed = confirm("Are you sure want to delete this data?");
      if (isConfirmed) {
        this.$toast.open({
          message: "Deleting Accommodation, Please Wait",
          type: "info",
          duration: 0,
        });
        apiConfig({
          method: "DELETE",
          url: "/accommodations/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then(({ data }) => {
            this.$toast.clear();
            this.$toast.open({
              message: "Success Delete Accommodation!",
            });
            this.$emit("dataDeleted", id);
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message);
          })
          .finally((_) => {
            this.$toast.clear();
          });
      } else {
        this.$toast.info("Delete data cancelled");
      }
    },
    populateUpdateForm(id) {
      this.$emit("populateUpdateForm", id);
    },
    patchStatus(payload) {
      const { id, status } = payload;
      this.$toast.open({
        message: "Updating Accommodation Status, Please Wait",
        type: "info",
        duration: 0,
      });
      apiConfig({
        method: "PATCH",
        url: "/accommodations/status/" + id,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          status,
        },
      })
        .then(({ data }) => {
          this.$toast.clear();
          this.$emit("dataUpdated", data);
          this.$toast.open({
            message: "Success Update Accommodation Status!",
          });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        })
        .finally((_) => {
          setTimeout(() => {
            this.$toast.clear();
          }, 2000);
        });
    },
  },
};
</script>

<style scoped>
</style>