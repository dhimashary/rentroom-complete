<template>
  <!--
  UI Design Prototype
  Link : https://dribbble.com/shots/10452538-React-UI-Components
-->
  <form
    class="flex flex-col justify-center"
    @submit.prevent="updateAccommodation()"
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
              <h2 class="leading-relaxed">Update an Accommodation</h2>
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
                  v-model="updatedAccommodation.name"
                  required
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Room Capacity</label>
                <input
                  type="number"
                  v-model="updatedAccommodation.roomCapacity"
                  required
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Category</label>
                <select
                  id="typeId"
                  v-model="updatedAccommodation.typeId"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  aria-label="Default select example"
                  required
                >
                  <option v-for="type in types" :key="type.id" :value="type.id">
                    {{ type.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Facility</label>
                <textarea
                  v-model="updatedAccommodation.facility"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Write all facility that your accommodation have, such as AC , free internet etc."
                ></textarea>
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Price</label>
                <input
                  type="number"
                  v-model="updatedAccommodation.price"
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
                <img
                  v-else-if="updatedAccommodation.imgUrl"
                  :src="updatedAccommodation.imgUrl"
                  class="mb-3"
                  style="width: 250px; height: 250px"
                />
                <input
                  type="file"
                  accept="image/*"
                  @change="setImage($event)"
                  id="file-input"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Location Address</label>
                <input
                  type="text"
                  v-model="updatedAccommodation.location"
                  class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
              </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
              <button
                class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              >
                Update
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
  props: ["types", "accommodationId"],
  data() {
    return {
      updatedAccommodation: {
        name: "",
        roomCapacity: 1,
        typeId: null,
        facility: "",
        price: 0,
        location: "",
        imgUrl: null,
      },
      previewImage: null,
      requestForm: new FormData(),
    };
  },
  methods: {
    updateAccommodation() {
      for (let key in this.updatedAccommodation) {
        this.requestForm.append(key, this.updatedAccommodation[key]);
      }
      this.$toast.open({
        message: "Uploading Updated Accommodation, Please Wait",
        type: "info",
        duration: 0,
      });
      apiConfig({
        method: "PUT",
        url: "/accommodations/" + this.accommodationId,
        data: this.requestForm,
        headers: {
          access_token: localStorage.access_token,
          "content-type": "multipart/form-data",
        },
      })
        .then(({ data }) => {
          this.$toast.open({
            message: "Success Update Accommodation !",
          });
          this.$emit("dataUpdated", data);
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
          this.$emit("changePage");
        })
        .finally((_) => {
          setTimeout(() => {
            this.$toast.clear();
          }, 3000);
        });
    },
    setImage(event) {
      const file = event.target.files[0];
      this.requestForm = new FormData();
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        this.previewImage = this.updateAccommodation.imgUrl;
        event.target.value = "";
        this.$toast.error("Only jpeg/jpg/png format allowed for image");
      } else {
        if (file.size > 262144) {
          this.previewImage = this.updateAccommodation.imgUrl;
          event.target.value = "";
          this.$toast.error("Maximum file size is 256KB");
        } else {
          this.updateAccommodation.imgUrl = null;
          this.requestForm.append("fileName", file.name);
          this.requestForm.append("accommodationImage", file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            this.previewImage = e.target.result;
          };
        }
      }
    },
    populateForm() {
      this.$toast.open({
        message: "Populating form data, please wait",
        duration: 0,
        type: "info",
      });
      apiConfig({
        methods: "GET",
        url: "/accommodations/" + this.accommodationId,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.$toast.clear();
          this.updatedAccommodation = {
            name: data.name,
            roomCapacity: data.roomCapacity,
            typeId: data.Type.id,
            facility: data.facility,
            price: data.price,
            location: data.location,
            imgUrl: data.imgUrl,
          };
        })
        .catch((err) => {
          this.$toast.open({
            message: err.response.data.message,
            type: "error",
          });
        });
    },
  },
  created() {
    this.populateForm();
    this.requestForm = new FormData();
  },
};
</script>

<style>
</style>