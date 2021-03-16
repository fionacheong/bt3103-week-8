<template>
  <div>
      <div class="navbar">
    <nav>
      <ul id="mynav">
        <li id="navHome"><router-link to="/" exact>Home</router-link></li>
        <li id="navOrders"><router-link to="/orders" exact>Orders</router-link></li>
        <li id="navDash"><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
    </nav>
    </div>
    <bar></bar>
    <linechart></linechart>
  </div>
</template>

<script>
import Chart from './Charts/BarChart.vue'
import LineChart from './CallAPI.vue'
export default {
  components: {
    bar: Chart,
    linechart: LineChart
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#mynav {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>