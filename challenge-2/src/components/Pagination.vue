<template>
  <div class="w-full flex pr-6 mb-2 h-14">
    <ul class="flex pl-0 list-none rounded my-2 ml-auto">
      <button
        :class="
          tablePage - 1 < 1
            ? `relative block py-2 px-3 cursor-not-allowed leading-tight border border-gray-300 text-white-700 border-r-0 ml-0 rounded-l bg-gray-300`
            : `relative block py-2 px-3 cursor-pointer leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-gray-200`
        "
        @click="changePage(tablePage - 1)"
        :disabled="tablePage - 1 < 1"
      >
        Previous
      </button>
      <button
        v-for="num in totalPage"
        :key="num"
        class="relative block py-2 px-3 leading-tight border border-gray-300 border-r-0"
        :class="
          num === tablePage
            ? 'bg-blue-700 text-white cursor-not-allowed'
            : 'bg-white text-blue-700 cursor-pointer hover:bg-gray-200'
        "
        @click="changePage(num)"
        :disabled="num === tablePage"
      >
        {{ num }}
      </button>
      <button
        :class="
          tablePage + 1 > totalPage
            ? `cursor-not-allowed relative block py-2 px-3 leading-tight border border-gray-300 text-white-700 border-r-1 ml-0 rounded-l bg-gray-300`
            : `cursor-pointer relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-1 ml-0 rounded-l hover:bg-gray-200`
        "
        @click="changePage(tablePage + 1)"
        :disabled="tablePage + 1 > totalPage"
      >
        Next
      </button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["totalPage", "tablePage"],
  methods: {
    changePage(page) {
      this.$emit("changeTablePage", page);
    },
  },
};
</script>

<style>
</style>
