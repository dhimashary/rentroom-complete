<template>
  <div class="w-5/6 flex flex-col">
    <AccommodationForm @newDataCreated="newDataCreated" :types="types"></AccommodationForm>
  </div>
</template>

<script>
import AccommodationHeader from "../components/AccommodationHeader";
import AccommodationTable from "../components/AccommodationTable";
import AccommodationForm from "../components/AccommodationForm";
export default {
  name: "CreateAccommodationPage",
  props: ["types"],
  components: {
    AccommodationTable,
    AccommodationHeader,
    AccommodationForm
  },
  methods: {
    newDataCreated(data) {
      this.$emit("newDataCreated", data)
    }
  }
};
</script>

<style>
</style>