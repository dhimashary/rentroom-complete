<template>
  <main class="mt-10">
    <AccommodationHeader />
    <!-- post cards -->
    <h1 class="block mt-10 mb-5 text-4xl font-bold ml-3">My Bookmark List</h1>
    <div class="w-full flex flex-row flex-wrap">
      <AccommodationCard
        v-for="bookmark in bookmarks"
        :key="`${bookmark.accommodationId}${bookmark.customerId}`"
        :accommodation="bookmark.Accommodation"
      />
    </div>
  </main>
</template>

<script>
import AccommodationHeader from '../components/AccommodationHeader.vue';
import AccommodationCard from '../components/AccommodationCard.vue';

export default {
  name: 'BookmarkList',
  components: {
    AccommodationHeader,
    AccommodationCard,
  },
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks;
    },
  },
  created() {
    this.$toast.open({
      message: 'Loading Your Bookmark, Please Wait',
      type: 'info',
      duration: 0,
      position: 'top-right',
    });
    this.$store.dispatch('fetchBookmarks');
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('access_token')) {
      next();
    } else {
      next('/signin');
    }
  },
};
</script>

<style>
</style>
