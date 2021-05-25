<template>
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="flex items-center">
        <div>
          <div class="text-sm leading-5 text-gray-800">{{ i + 1 }}</div>
        </div>
      </div>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ history.title }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ history.description }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ history.updatedBy }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ formatedDate }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "historyTableRow",
  props: ["history", "i"],
  computed: {
    formatedDate () {
      return new Date(this.history.createdAt).toLocaleString('en-US')
    }
  },
  methods: {},
};
</script>

<style>
</style>