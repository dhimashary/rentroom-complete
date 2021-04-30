<template>
  <div class="w-5/6 flex flex-col">
    <AccommodationForm></AccommodationForm>
  </div>
</template>

<script>
import AccommodationHeader from "../components/AccommodationHeader";
import AccommodationTable from "../components/AccommodationTable";
import AccommodationForm from "../components/AccommodationForm";
export default {
  name: "CreateAccommodationPage",
  components: {
    AccommodationTable,
    AccommodationHeader,
    AccommodationForm
  }
};
</script>

<style>
</style>