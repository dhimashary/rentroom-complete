<template>
  <div class="w-5/6 flex flex-col">
    <UpdateAccommodationForm
      @dataUpdated="dataUpdated"
      :accommodationId="accommodationId"
      :types="types"
    ></UpdateAccommodationForm>
  </div>
</template>

<script>
import UpdateAccommodationForm from "../components/UpdateAccommodationForm";
export default {
  name: "UpdateAccommodationPage",
  props: ["types", "accommodationId"],
  components: {
    UpdateAccommodationForm,
  },
  methods: {
    dataUpdated(data) {
      this.$emit("dataUpdated", data);
    },
  },
};
</script>

<style>
</style>