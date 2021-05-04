<template>
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="flex items-center">
        <div>
          <div class="text-sm leading-5 text-gray-800">{{ i + 1 }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="text-sm leading-5 text-blue-900">
        {{ accommodation.name }}
      </div>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ shortFacility }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ accommodation.roomCapacity }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      <span
        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        v-if="accommodation.status === 'active'"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
        ></span>
        <span class="relative text-xs">{{ accommodation.status }}</span>
      </span>
      <span
        class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        v-else-if="accommodation.status === 'inactive'"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
        ></span>
        <span class="relative text-xs">{{ accommodation.status }}</span>
      </span>
      <span
        v-else
        class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
        ></span>
        <span class="relative text-xs">{{ accommodation.status }}</span>
      </span>
    </td>
    <td
      class="whitespace-no-wrap py-4 border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      <img :src="accommodation.imgUrl" :alt="accommodation.name">
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ accommodation.User.email }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ accommodation.location }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ accommodation.price }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ accommodation.Type.name }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
    >
      <button
        class="mb-2 px-5 py-2 border-yellow-700 border text-yellow-600 rounded transition duration-300 hover:bg-yellow-800 hover:text-white focus:outline-none"
        v-if="isAuthorized"
        @click="populateUpdateForm(accommodation.id)"
      >
        Edit
      </button>
      <button
        class="px-5 py-2 border-red-700 border text-red-600 rounded transition duration-300 hover:bg-red-800 hover:text-white focus:outline-none"
        v-if="isAuthorized"
        @click="deleteAccommodation"
      >
        Delete
      </button>
      <span v-else>
        -
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "AccommodationTableRow",
  props: ["accommodation", "i"],
  computed: {
    shortFacility() {
      return this.accommodation.facility.slice(0, 80) + "...";
    },
    isAuthorized() {
      if (localStorage.role === 'admin' || localStorage.email === this.accommodation.User.email) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    deleteAccommodation() {
      this.$emit("deleteAccommodation", this.accommodation.id)
    },
    populateUpdateForm(id) {
      console.log(id, "<--")
      this.$emit("populateUpdateForm", id)
    }
  }
};
</script>

<style>
</style>