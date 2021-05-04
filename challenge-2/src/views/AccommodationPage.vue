<template>
  <div class="w-5/6 flex flex-col">
    <AccommodationHeader></AccommodationHeader>
    <AccommodationTable
      @populateUpdateForm="populateUpdateForm"
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
    populateUpdateForm(id) {
      this.$emit("populateUpdateForm", id)
    }
  },
};
</script>

<style>
</style>