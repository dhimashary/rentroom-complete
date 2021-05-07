<template>
  <main class="mt-10">
    <AccommodationHeader />
    <div class="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
      <FilterAccommodationBar />
      <!-- post cards -->
      <div class="w-full lg:w-3/4 flex flex-row flex-wrap" v-if="!isLoading">
        <AccommodationCard
          v-for="accommodation in accommodations"
          :key="accommodation.id"
          :accommodation="accommodation"
        />
        <Pagination v-if="accommodations.length"/>
      </div>
      <div class="w-full lg:w-3/4 flex flex-row flex-wrap justify-center items-center" v-else>
        <iframe src="https://giphy.com/embed/5AtXMjjrTMwvK" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </div>
  </main>
</template>

<script>
import AccommodationHeader from '../components/AccommodationHeader.vue';
import AccommodationCard from '../components/AccommodationCard.vue';
import FilterAccommodationBar from '../components/FilterAccommodationBar.vue';
import Pagination from '../components/Pagination.vue';

export default {
  name: 'AccommodationList',
  components: {
    AccommodationCard,
    FilterAccommodationBar,
    AccommodationHeader,
    Pagination,
  },
  computed: {
    accommodations() {
      return this.$store.state.accommodations;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    isLoading() {
      return this.$store.state.loadingAccommodation;
    },
  },
  created() {
    this.$store.dispatch('fetchAccommodations');
    this.$store.dispatch('fetchBookmarks');
  },
  watch: {
    currentPage() {
      this.$store.dispatch('fetchAccommodations');
    },
  },
};
</script>

<style>
</style>
