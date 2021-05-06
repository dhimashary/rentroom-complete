<template>
  <div class="w-full lg:w-1/4 px-3">
    <!-- topics -->
    <div class="mb-4">
      <h5 class="font-bold uppercase text-gray-700 px-1 mb-2">
        Accommodation Type
      </h5>
      <ul>
        <li
          class="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
        >
          <div class="flex items-center text-gray-600 cursor-pointer">
            <span class="inline-block h-4 w-4 bg-green-300 mr-3"></span>
            <span>Guest House</span>
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-gray-600 ml-auto"
            />
          </div>
        </li>
        <li
          class="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
        >
          <div class="flex items-center text-gray-600 cursor-pointer">
            <span class="inline-block h-4 w-4 bg-indigo-300 mr-3"></span>
            <span>Hotel</span>
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-gray-600 ml-auto"
            />
          </div>
        </li>
        <li
          class="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
        >
          <div class="flex items-center text-gray-600 cursor-pointer">
            <span class="inline-block h-4 w-4 bg-yellow-300 mr-3"></span>
            <span>Apartment</span>
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-gray-600 ml-auto"
            />
          </div>
        </li>
        <li
          class="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
        >
          <div class="flex items-center text-gray-600 cursor-pointer">
            <span class="inline-block h-4 w-4 bg-blue-300 mr-3"></span>
            <span>Hostel</span>
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-gray-600 ml-auto"
            />
          </div>
        </li>
      </ul>
    </div>

    <!-- divider -->

    <!-- price filter -->
    <div class="p-1 my-2">
      <h5 class="font-bold uppercase text-gray-700 mb-2">Price</h5>
      <div class="flex">
        <span
          class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap"
          >Rp.</span
        >
        <input
          class="border border-2 rounded-r px-4 py-2 w-full"
          type="number"
          placeholder="minimum price"
          v-model="minprice"
        />
      </div>
      <div class="flex mb-2">
        <span
          class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap"
          >Rp.</span
        >
        <input
          class="border border-2 rounded-r px-4 py-2 w-full"
          type="number"
          placeholder="maximum price"
          v-model="maxprice"
        />
      </div>
    </div>

    <!-- divider -->

    <!-- price filter -->
    <div class="p-1 my-2">
      <h5 class="font-bold uppercase text-gray-700 mb-2">City Location</h5>
      <div class="flex mb-2">
        <input
          class="border border-2 rounded-r px-4 py-2 w-full"
          type="text"
          placeholder="e.g. Jakarta"
          v-model="location"
        />
      </div>
    </div>

    <!-- divider -->

    <div class="p-1 my-2">
      <h5 class="font-bold uppercase text-gray-700 mb-2">Accommodation Name</h5>
      <div class="flex mb-4">
        <input
          class="border border-2 rounded-r px-4 py-2 w-full"
          type="text"
          placeholder="e.g. Hotel Jaya Wijaya"
          v-model="name"
        />
      </div>
      <button
        class="px-4 py-2 bg-indigo-600 text-gray-200 rounded-b w-full capitalize tracking-wide"
      >
        Search
      </button>
    </div>

    <div class="border border-dotted"></div>
  </div>
</template>

<script>
export default {
  name: 'FilterAccommodationBar',
  computed: {
    location: {
      get() {
        return this.$store.state.filterOptions.location;
      },
      set(value) {
        this.$store.commit('UPDATE_FILTER_OPTIONS', { location: value });
      },
    },
    name: {
      get() {
        return this.$store.state.filterOptions.name;
      },
      set(value) {
        this.$store.commit('UPDATE_FILTER_OPTIONS', { name: value });
      },
    },
    minprice: {
      get() {
        return this.$store.state.filterOptions.minprice;
      },
      set(value) {
        this.$store.commit('UPDATE_FILTER_OPTIONS', { minprice: value });
      },
    },
    maxprice: {
      get() {
        return this.$store.state.filterOptions.maxprice;
      },
      set(value) {
        this.$store.commit('UPDATE_FILTER_OPTIONS', { maxprice: value });
      },
    },
  },
  created() {
    console.log(this.$store.state.filterOptions);
  },
};
</script>

<style>
</style>
