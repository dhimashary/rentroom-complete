<template>
  <div
    class="mx-auto px-4 w-2/4 lg:w-1/3 pb-6"
  >
    <div
      @click="goDetail"
      class="cursor-pointer hover:bg-blue-100 bg-white shadow-xl rounded-lg h-full flex flex-col tracking-wide"
    >
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
            v-if="isLogin && !alreadyBookmarked"
            @click="
              $store.dispatch('createBookmarks', { id: accommodation.id })
            "
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
        return 'bg-blue-500';
      }
      if (this.accommodation.Type.name === 'Apartment') {
        return 'bg-yellow-500';
      }
      if (this.accommodation.Type.name === 'Hostel') {
        return 'bg-indigo-500';
      }
      return 'bg-green-500';
    },
    isLogin() {
      return localStorage.access_token;
    },
    alreadyBookmarked() {
      const bookmarked = this.$store.state.bookmarks.filter(
        (item) => item.accommodationId === this.accommodation.id,
      );
      if (bookmarked.length === 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    goDetail() {
      this.$router.push({ name: 'Accommodation Detail', params: { id: this.accommodation.id } });
    },
  },
};
</script>

<style>
</style>
