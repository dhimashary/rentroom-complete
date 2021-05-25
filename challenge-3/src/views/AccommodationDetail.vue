<template>
  <main class="mt-10">
    <div>
      <div
        class="flex flex-col bg-gray-100 md:flex-row md:space-x-2 px-2 lg:p-0"
      >
        <span
          class="mb-4 md:mb-0 w-full md:w-2/3 relative rounded inline-block"
          style="height: 24em"
        >
          <div
            class="absolute left-0 bottom-0 w-full h-full z-10 image-shadow"
          ></div>
          <img
            :src="accommodationDetail.imgUrl"
            class="absolute left-0 top-0 w-full h-full rounded z-0 object-cover"
          />
          <div class="p-4 absolute bottom-0 left-0 z-20">
            <span
              class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
              >{{ accommodationDetail.Type.name }}</span
            >
            <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
              {{ accommodationDetail.name }}
            </h2>
            <div class="flex mt-3">
              <img
                src="https://images-na.ssl-images-amazon.com/images/M/MV5BODFjZTkwMjItYzRhMS00OWYxLWI3YTUtNWIzOWQ4Yjg4NGZiXkEyXkFqcGdeQXVyMTQ0ODAxNzE@._V1_UX172_CR0,0,172,256_AL_.jpg"
                class="h-10 w-10 rounded-full mr-2 object-cover"
              />
              <div>
                <p class="font-semibold text-gray-200 text-sm">
                  Chrishell Staus
                </p>
                <p class="font-semibold text-gray-400 text-xs">15 Aug</p>
              </div>
            </div>
          </div>
        </span>
        <span
          class="w-full md:w-1/3 relative rounded bg-blue-100"
          style="height: 24em"
        >
          <div class="mapouter h-full">
            <div class="gmap_canvas h-full">
              <iframe
                width="100%"
                class="h-full"
                id="gmap_canvas"
                :src="`https://maps.google.com/maps?q=${accommodationDetail.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div class="bg-white p-4 shadow mb-4 flex">
      <div class="w-full md:w-2/3">
        <div class="text-xl mb-2">
          RentRoom
        </div>
        <div class="text-yellow-500 font-bold text-xl mb-1">
          <font-awesome-icon
            class="cursor-pointer"
            :icon="['fas', 'star']"
          />
          9.8 Impressive
        </div>
        <div class="text-gray-700">
          From 593 Users
        </div>
      </div>
      <div class="w-full md:1/3">
        <div class="flex justify-end mb-2">
          <div class="text-2xl text-yellow-500 font-bold ml-auto">
            {{ getFormatedCurrency }}
          </div>
        </div>
        <div class="flex mb-2 justify-end">
          <button
            class="inline-block font-bold text-lg px-6 py-3 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-500 rounded shadow ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
    <div class="block flex flex-col md:flex-row md:space-x-2 px-2 lg:p-0">
      <div
        class="mb-4 md:mb-0 w-full md:w-2/3 relative rounded inline-block p-3"
      >
      <div class="mb-6">
          <h1 class="text-lg text-indigo-700 font-semibold mb-2">Room Capacity</h1>
          <p class="text-gray-700">
            {{ accommodationDetail.roomCapacity }} person
          </p>
        </div>
        <div class="mb-6">
          <h1 class="text-lg text-indigo-700 font-semibold mb-2">Facility</h1>
          <p class="text-gray-700">
            {{ accommodationDetail.facility }}
          </p>
        </div>
        <div class="mb-6">
          <h1 class="text-lg text-indigo-700 font-semibold mb-2">Location</h1>
          <p class="text-gray-700">
            {{ accommodationDetail.location }}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/3 relative rounded">
        <div class="bg-white shadow-lg p-3">
          <div class="mb-2">
            <font-awesome-icon
              class="cursor-pointer text-gray-700"
              :icon="['fas', 'gift']"
            />
          </div>
          <div class="text-lg font-bold text-gray-800 mb-2">
            FREE DISCOUNT VOUCHER !
          </div>
          <div class="text-gray-500 text-sm mb-2">
            Special Discount Rp80.000* type RENTROOMSPECIAL | *limited quota
          </div>
          <div class="text-gray-700 text-xs font-bold mb-2">
            19 May 2021 - 20 April 2022
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AccommodationDetail',
  computed: {
    isLoading() {
      return this.$store.state.loadingAccommodationDetail;
    },
    accommodationDetail() {
      return this.$store.state.accommodationDetail;
    },
    getFormatedCurrency() {
      return `Rp. ${new Intl.NumberFormat('ID').format(
        this.accommodationDetail.price,
      )} / day`;
    },
  },
  created() {
    this.$store.dispatch('fetchAccommodationDetail', this.$route.params.id);
  },
};
</script>

<style scoped>
.image-shadow {
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(0, 0, 0, 0.7)
  ) !important;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
}
.mapouter {
  position: relative;
  text-align: right;
}
</style>
