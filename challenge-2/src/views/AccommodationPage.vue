<template>
  <div class="w-5/6 flex flex-col">
    <AccommodationHeader></AccommodationHeader>
    <AccommodationTable
      @dataDeleted="dataDeleted"
      :accommodations="accommodations"
    ></AccommodationTable>
  </div>
</template>

<script>
import AccommodationHeader from "../components/AccommodationHeader";
import AccommodationTable from "../components/AccommodationTable";
export default {
  name: "AccommodationPage",
  props: ["accommodations"],
  components: {
    AccommodationTable,
    AccommodationHeader,
  },
  methods: {
    dataDeleted(id) {
      this.$emit("dataDeleted", id);
    },
  },
};
</script>

<style>
</style>