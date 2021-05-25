<template>
  <div class="w-full flex mr-4 mb-2 h-14">
    <ul class="flex pl-0 list-none rounded my-2 ml-auto">
      <button
        :class="
          currentPage - 1 < 1
            ? `relative block py-2 px-3 cursor-not-allowed leading-tight border border-gray-300 text-white-700 border-r-0 ml-0 rounded-l bg-gray-300`
            : `relative block py-2 px-3 cursor-pointer leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-gray-200`
        "
        @click="changePage(currentPage - 1)"
        :disabled="currentPage - 1 < 1"
      >
        Previous
      </button>
      <button
        v-for="num in totalPage"
        :key="num"
        class="relative block py-2 px-3 leading-tight border border-gray-300 border-r-0"
        :class="
          num === currentPage
            ? 'bg-blue-700 text-white cursor-not-allowed'
            : 'bg-white text-blue-700 cursor-pointer hover:bg-gray-200'
        "
        @click="changePage(num)"
        :disabled="num === currentPage"
      >
        {{ num }}
      </button>
      <button
        :class="
          currentPage + 1 > totalPage
            ? `cursor-not-allowed relative block py-2 px-3 leading-tight border border-gray-300 text-white-700 border-r-1 ml-0 rounded-l bg-gray-300`
            : `cursor-pointer relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-1 ml-0 rounded-l hover:bg-gray-200`
        "
        @click="changePage(currentPage + 1)"
        :disabled="currentPage + 1 > totalPage"
      >
        Next
      </button>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  computed: {
    totalPage() {
      return this.$store.state.totalPage;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
  },
  methods: {
    changePage(page) {
      console.log(page);
      this.$store.commit('SET_CURRENT_PAGE', { page });
    },
  },
};
</script>

<style>
</style>
