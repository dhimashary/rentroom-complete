<template>
  <div class="w-5/6 flex flex-col">
    <HistoryHeader></HistoryHeader>
    <HistoryTable></HistoryTable>
  </div>
</template>

<script>
import HistoryHeader from "../components/HistoryHeader";
import HistoryTable from "../components/HistoryTable";
export default {
  name: "HistoryPage",
  components: {
    HistoryTable,
    HistoryHeader,
  },
  methods: {},
};
</script>

<style>
</style>