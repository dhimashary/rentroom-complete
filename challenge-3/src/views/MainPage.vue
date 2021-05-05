<template>
  <div class="bg-gray-100 min-w-screen">
    <div class="max-w-screen-xl mx-auto">
      <!-- header -->
      <Navbar />
      <AccommodationList />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AccommodationList from './AccommodationList.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'MainPage',
  components: {
    Navbar,
    AccommodationList,
    Footer,
  },
};
</script>

<style scoped>
</style>
