<template>
  <main class="mt-10">
    <AccommodationHeader />
    <!-- post cards -->
    <div class="w-full flex flex-row flex-wrap">
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
  </main>
</template>

<script>
import AccommodationHeader from '../components/AccommodationHeader';
import AccommodationCard from '../components/AccommodationCard';

export default {
  name: 'BookmarkList',
  components: {
    AccommodationHeader,
    AccommodationCard,
  }
};
</script>

<style>
</style>