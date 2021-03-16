<template>
  <div class="linechart">
    <h1>Line Chart</h1>
    <linechart></linechart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    linechart: Chart
  }
};
</script>

<style>
</style>
