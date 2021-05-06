<template>
  <div class="mx-auto px-4 w-2/4 lg:w-1/3 pb-6">
    <div class="bg-white shadow-xl rounded-lg h-full flex flex-col tracking-wide">
      <img
        :src="accommodation.imgUrl"
        class="w-full h-2/5 rounded-lg rounded-b-none"
      />
      <div class="px-4 py-2 mt-2 flex flex-col h-3/5 justify-between">
        <span class="flex flex-row">
          <span
            :class="`inline-block rounded-full text-white py-1 px-4 py-1 font-bold mr-3 text-white text-sm mb-2 ${getTypeBGColor}`"
          >
            {{ accommodation.Type.name }}
          </span>
          <font-awesome-icon
            class="ml-auto text-gray-500 cursor-pointer mt-1"
            :icon="['far', 'bookmark']"
          />
        </span>
        <h2 class="font-bold text-lg text-gray-800 tracking-normal mb-1">
          {{ accommodation.name }}
        </h2>
        <p class="text-sm text-gray-700 mr-1 mb-2">
          {{ getFormatedFacility }}
        </p>
        <p class="text-xs text-gray-700 mr-1 mb-2">
          {{ accommodation.location }}
        </p>
        <p class="text-blue-700 mr-1 mb-2 font-bold">
          {{ getFormatedCurrency }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccommodationCard',
  props: ['accommodation'],
  // data() {
  //   return {
  //     accommodation: {
  //       name: 'The Trans Luxury Hotel',
  //       location: 'Jl. Gatot Subroto No. 289, Buahbatu, Bandung, Jawa Barat, Indonesia, 40273',
  //       imgUrl: 'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10002404-2060x1247-FIT_AND_TRIM-9ddbe436b041daf5b4d3138950821434.jpeg?tr=q-40,c-at_max,w-740,h-500&_src=imagekit',
  //       Type: {
  //         id: 1,
  //         name: 'Hotel',
  //       },
  //       facility: 'AC, Restaurant, Swimming Pool, Parking, Wi-Fi',
  //       price: 1900000,
  //     },
  //   };
  // },
  computed: {
    getFormatedCurrency() {
      return `Rp. ${new Intl.NumberFormat('ID').format(
        this.accommodation.price,
      )} / day`;
    },
    getFormatedFacility() {
      if (this.accommodation.facility.length > 50) {
        return `${this.accommodation.facility.slice(0, 50)}...`;
      }
      return this.accommodation.facility;
    },
    getTypeBGColor() {
      if (this.accommodation.Type.name === 'Hotel') {
        return 'bg-purple-500';
      } if (this.accommodation.Type.name === 'Apartment') {
        return 'bg-yellow-500';
      } if (this.accommodation.Type.name === 'Hostel') {
        return 'bg-indigo-500';
      }
      return 'bg-green-500';
    },
  },
};
</script>

<style>
</style>
