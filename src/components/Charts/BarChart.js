import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [], //"Cereal Prawn", "Dry Beef Hor Fun", "Mapo Tofu", "Pork Fried Rice", "Prawn omelette", "Sambal KangKung"
            datasets: [{
                label: "",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#2c3e50"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }
                 }]  
              }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.docs.forEach(doc => { 
            const thisdoc = doc.data()

            for (const key in thisdoc) {
                
                var dish_name = key
                var dish_qty = thisdoc[key]

                if (!(this.datacollection.labels.includes(key))) {
                    this.datacollection.labels.push(dish_name)
                    this.datacollection.datasets[0].data.push(dish_qty)
                } else {
                    var dish_index = this.datacollection.labels.indexOf(dish_name)
                    var curr_qty = this.datacollection.datasets[0].data[dish_index]
                    var new_qty = dish_qty + curr_qty
                    this.datacollection.datasets[0].data.splice(dish_index,1,new_qty)
                }
                
            } 

        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}