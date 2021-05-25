<template>
  <!--
  UI Design Prototype
  Link : https://dribbble.com/shots/10452538-React-UI-Components
-->
  <form
    class="flex flex-col justify-center"
    @submit.prevent="createAccommodation()"
  >
    <div class="relative">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0">
        <div class="mx-5">
          <div class="flex items-center space-x-5">
            <div
              class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono"
            >
              i
            </div>
            <div
              class="block pl-2 font-semibold text-xl self-start text-gray-700"
            >
              <h2 class="leading-relaxed">Create an Accommodation</h2>
              <p class="text-sm text-gray-500 font-normal leading-relaxed">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
            <div
              class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <div class="flex flex-col">
                <label class="leading-loose">Name</label>
                <input
                  type="text"
                  v-model="newAccommodation.name"
                  required
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Room Capacity</label>
                <input
                  type="number"
                  v-model="newAccommodation.roomCapacity"
                  required
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Category</label>
                <select
                  id="typeId"
                  v-model="newAccommodation.typeId"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  aria-label="Default select example"
                  required
                >
                  <option disabled>Please Choose Accommodation Type</option>
                  <option v-for="type in types" :key="type.id" :value="type.id">
                    {{ type.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Facility</label>
                <textarea
                  v-model="newAccommodation.facility"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Write all facility that your accommodation have, such as AC , free internet etc."
                ></textarea>
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Price</label>
                <input
                  type="number"
                  v-model="newAccommodation.price"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
                <span class="text-sm text-gray-500"
                  >Write price for this accommodation for one day.</span
                >
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Image Link</label>
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  class="mb-3"
                  style="width: 250px; height: 250px"
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  required
                  @change="setImage($event)"
                  id="file-input"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Location Address</label>
                <input
                  type="text"
                  v-model="newAccommodation.location"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
              <button
                @click="previewImage = null"
                type="reset"
                class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
              >
                <svg
                  class="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Cancel
              </button>
              <button
                class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import apiConfig from "../apiConfig";

export default {
  name: "AccommodationForm",
  props: ["types"],
  data() {
    return {
      newAccommodation: {
        name: "",
        roomCapacity: 1,
        typeId: null,
        facility: "",
        price: 0,
        location: "",
      },
      previewImage: null,
      requestForm: new FormData(),
    };
  },
  methods: {
    createAccommodation() {
      for (let key in this.newAccommodation) {
        this.requestForm.append(key, this.newAccommodation[key]);
      }
      this.$toast.open({
        message: "Uploading New Accommodation, Please Wait",
        type: "info",
        duration: 0,
      });
      apiConfig({
        method: "POST",
        url: "/accommodations",
        data: this.requestForm,
        headers: {
          access_token: localStorage.access_token,
          "content-type": "multipart/form-data",
        },
      })
        .then(({ data }) => {
          this.$toast.clear();
          this.$toast.open({
            message: "Success Create new Accommodation !",
          });
          this.$emit("newDataCreated", data);
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$toast.clear();
          }, 2000);
          this.requestForm = new FormData();
          this.previewImage = null;
          this.newAccommodation = {
            name: "",
            roomCapacity: 1,
            typeId: 2,
            facility: "",
            price: 0,
            location: "",
          };
        });
    },
    setImage(event) {
      const file = event.target.files[0];
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        event.target.value = ""
        this.$toast.error("Only jpeg/jpg/png format allowed for image")
      } else {
        if (file.size > 262144) {
          event.target.value = ""
          this.$toast.error("Maximum file size is 256KB")
        } else {
          this.requestForm.append("fileName", event.target.files[0].name);
          this.requestForm.append("accommodationImage", event.target.files[0]);
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e) => {
            this.previewImage = e.target.result;
          };
        }
      }
    },
  },
};
</script>

<style>
</style>