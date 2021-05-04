<template>
  <div class="w-5/6 flex flex-col">
    <AccommodationHeader></AccommodationHeader>
    <AccommodationTable
      :types="types"
      @populateUpdateForm="populateUpdateForm"
      @dataDeleted="dataDeleted"
      @dataUpdated="dataUpdated"
      :accommodations="accommodations"
    ></AccommodationTable>
  </div>
</template>

<script>
import AccommodationHeader from "../components/AccommodationHeader";
import AccommodationTable from "../components/AccommodationTable";
export default {
  name: "AccommodationPage",
  props: ["accommodations", "types"],
  components: {
    AccommodationTable,
    AccommodationHeader,
  },
  methods: {
    dataDeleted(id) {
      this.$emit("dataDeleted", id);
    },
    dataUpdated(data) {
      this.$emit("dataUpdated", data);
    },
    populateUpdateForm(id) {
      this.$emit("populateUpdateForm", id);
    },
  },
};
</script>

<style>
</style>