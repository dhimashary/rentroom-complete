<template>
  <div>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-1 sm:px-6 ">
      <!-- <div
        class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
      >
        <div class="flex justify-between">
          <div
            class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent"
          >
            <div
              class="flex flex-wrap items-stretch w-full h-full mb-6 relative"
            >
              <div class="flex">
                <span
                  class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm"
                >
                  <svg
                    width="18"
                    height="18"
                    class="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div> -->
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
              v-for="(accommodation, i) in accommodations"
              :types="types"
              :key="accommodation.id"
              :i="i"
              :accommodation="accommodation"
              @patchStatus="patchStatus"
              @deleteAccommodation="deleteAccommodation"
              @populateUpdateForm="populateUpdateForm"
            ></AccommodationTableRow>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from "../apiConfig";
import AccommodationTableRow from "./AccommodationTableRow";
export default {
  name: "AccommodationTable",
  props: ["accommodations", "types"],
  components: {
    AccommodationTableRow,
  },
  methods: {
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
            this.$toast.clear()
            this.$toast.open({
              message: "Success Delete Accommodation!",
            });
            this.$emit("dataDeleted", id);
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message);
          })
          .finally(_ => {
          this.$toast.clear()
        })
      } else {
        this.$toast.info("Delete data cancelled");
      }
    },
    populateUpdateForm(id) {
      this.$emit("populateUpdateForm", id)
    },
    patchStatus(payload) {
      const { id, status } = payload
      this.$toast.open({
        message: "Updating Accommodation Status, Please Wait",
        type: "info",
        duration: 0,
      });
      apiConfig({
        method: "PATCH",
        url: "/accommodations/status/" + id,
        headers: {
          access_token: localStorage.access_token 
        },
        data: {
          status
        }
      })
        .then(({ data }) => {
          this.$toast.clear()
          this.$emit("dataUpdated", data)
          this.$toast.open({
            message: "Success Update Accommodation Status!",
          });
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(err.response.data.message)
        })
        .finally(_ => {
          setTimeout(() => {
            this.$toast.clear()
          }, 2000)
        })
    }
  }
};
</script>

<style scoped>
</style>