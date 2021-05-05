<template>
  <main class="mt-10">
    <AccommodationHeader />
    <div class="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
      <FilterAccommodationBar />
      <!-- post cards -->
      <div class="w-full lg:w-3/4 flex flex-row flex-wrap">
        <Pagination />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
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
};
</script>

<style>
</style>
