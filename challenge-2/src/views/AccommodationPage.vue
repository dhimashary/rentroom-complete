<template>
  <div class="w-5/6 flex flex-col">
    <AccommodationHeader></AccommodationHeader>
    <AccommodationTable></AccommodationTable>
  </div>
</template>

<script>
import AccommodationHeader from "../components/AccommodationHeader";
import AccommodationTable from "../components/AccommodationTable";
export default {
  name: "AccommodationPage",
  components: {
    AccommodationTable,
    AccommodationHeader
  }
};
</script>

<style>
</style>