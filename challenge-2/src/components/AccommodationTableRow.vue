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
      <div class="text-sm leading-5 text-blue-900 mb-2">
        {{ accommodation.name }}
      </div>
      <div class="text-sm leading-5 text-blue-900">
        by {{ accommodation.User.email }}
      </div>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ shortFacility }}
    </td>
    <td
      class="text-center py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ accommodation.roomCapacity }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
      v-if="isAdmin"
    >
      <div class="relative inline-flex">
        <svg
          class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#ffff"
            fill-rule="nonzero"
          />
        </svg>
        <select
          @change="updateStatus"
          v-model="newStatus"
          :class="`border border-gray-300 font-bold rounded-full text-white h-10 pl-5 pr-10  hover:border-gray-400 focus:outline-none appearance-none ${getBGColor}`"
        >
          <option v-for="(status, i) in statusOptions" :key="i" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
    </td>
    <td
      v-else
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
      <img :src="accommodation.imgUrl" :alt="accommodation.name" />
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ accommodation.location }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ getFormatedCurrency }}
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
        class="mb-2 w-28 px-5 py-2 border-yellow-700 border text-yellow-600 rounded transition duration-300 hover:bg-yellow-800 hover:text-white focus:outline-none"
        v-if="isAuthorized"
        @click="populateUpdateForm(accommodation.id)"
      >
        Edit
      </button>
      <button
        class="px-5 w-28 py-2 border-red-700 border text-red-600 rounded transition duration-300 hover:bg-red-800 hover:text-white focus:outline-none"
        v-if="isAuthorized"
        @click="deleteAccommodation"
      >
        Delete
      </button>
      <span v-else> - </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "AccommodationTableRow",
  props: ["accommodation", "i", "types"],
  data() {
    return {
      newStatus: this.accommodation.status,
      statusOptions: ["active", "inactive", "archived"],
    };
  },
  computed: {
    shortFacility() {
      return this.accommodation.facility.slice(0, 40) + "...";
    },
    isAuthorized() {
      if (
        localStorage.role === "admin" ||
        localStorage.email === this.accommodation.User.email
      ) {
        return true;
      } else {
        return false;
      }
    },
    isAdmin() {
      if (localStorage.role === "admin") {
        return true;
      } else {
        return false;
      }
    },
    getBGColor() {
      if (this.newStatus === "active") {
        return "bg-green-400";
      } else if (this.newStatus === "inactive") {
        return "bg-red-400";
      } else {
        return "bg-yellow-400";
      }
    },
    getFormatedCurrency () {
      return 'Rp. ' + new Intl.NumberFormat('ID').format(this.accommodation.price)
    }
  },
  methods: {
    deleteAccommodation() {
      this.$emit("deleteAccommodation", this.accommodation.id);
    },
    populateUpdateForm(id) {
      this.$emit("populateUpdateForm", id);
    },
    updateStatus() {
      this.$emit("patchStatus", {
        id: this.accommodation.id,
        status: this.newStatus,
      });
    },
  },
};
</script>

<style>
</style>