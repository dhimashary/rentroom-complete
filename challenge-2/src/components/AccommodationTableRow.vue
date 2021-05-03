<template>
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="flex items-center">
        <div>
          <div class="text-sm leading-5 text-gray-800">#1</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      damilareanjorin1@gmail.com
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      +2348106420637
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      <span
        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
        ></span>
        <span class="relative text-xs">active</span>
      </span>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      September 12
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
    >
      <button
        class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
      >
        View Details
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "AccommodationTableRow",
  props: ["accommodation"],
};
</script>

<style>
</style>