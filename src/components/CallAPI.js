import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label: "north",
                borderColor: "#3e95cd",
                data: [],
                fill: false
            }, {
                label: "south",
                borderColor: "#8e5ea2",
                data: [],
                fill: false
            }, {
                label: "east",
                borderColor: "#3cba9f",
                data: [],
                fill: false
            }, {
                label: "west",
                borderColor: "#e8c3b9",
                data: [],
                fill: false
            }, {
                label: "central",
                borderColor: "#c45850",
                data: [],
                fill: false
            }, {
                label: "national",
                borderColor: "#2c3e50",
                data: [],
                fill: false
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty-Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => { 
            var items = response.data["items"]
            //alert(times[0].timestamp)
            items.forEach(data => { 

                this.datacollection.labels.push(data.timestamp)

                var curr_reading = data.readings
                var psi = curr_reading.psi_twenty_four_hourly
                var north_psi = psi.north
                var south_psi = psi.south
                var east_psi = psi.east
                var west_psi = psi.west
                var central_psi = psi.central
                var national_psi = psi.national

                this.datacollection.datasets[0].data.push(north_psi)
                this.datacollection.datasets[1].data.push(south_psi)
                this.datacollection.datasets[2].data.push(east_psi)
                this.datacollection.datasets[3].data.push(west_psi)
                this.datacollection.datasets[4].data.push(central_psi)
                this.datacollection.datasets[5].data.push(national_psi)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}