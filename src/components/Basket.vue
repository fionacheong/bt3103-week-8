<template>
  <div>
      <ul>
          <li id= "totalItems" v-for= "item in itemsSelected" :key= "item[0]">
              {{ item[0] }} x {{ item[1] }} <br>
          </li>
      </ul>
      <button id= "total" v-on:click= "findTotal(); sendOrder()">Total Amount</button>
      <p v-show= "this.sub>0">Subtotal: ${{sub}}</p>
      <p v-show= "this.grandTotal>0">Grand Total (w/ GST): ${{grandTotal}}</p>
  </div>
</template>

<script>

import database from '../firebase.js'

export default {
    props: {
     itemsSelected: {
         type: Array
     }
    },

    data() {
        return {
            sub:0
        }
    },

    methods: {
        findTotal : function() {
            this.sub = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const item_obj = this.itemsSelected[i];
                const item_price = item_obj[2];
                const item_qty = item_obj[1];
                this.sub += item_price*item_qty;
            }
        },
        /* sendOrder: function() {
            var curr_bskt = [];

            for (var i=0; i<this.itemsSelected.length; i++) {
                const item_obj = this.itemsSelected[i];
                //const item_name = item_obj[0];
                //const item_qty = item_obj[1];

                database.collection('orders').add({
                    item_obj
                    //name: item_name,
                    //quantity: item_qty
                }).then(() => {location.reload()});
            }
        } */
        sendOrder: function() {
            var curr_bskt = {
                'Prawn omelette':0,
                'Dry Beef Hor Fun':0,
                'Sambal KangKung':0,
                'Pork Fried Rice':0,
                'Mapo Tofu':0,
                'Cereal Prawn':0,
            };

            for (let i=0; i<this.itemsSelected.length; i++) {
                const item_obj = this.itemsSelected[i];
                const item_name = item_obj[0];
                const item_qty = item_obj[1];

                curr_bskt[item_name] = item_qty;
            }
            
            database.collection('orders').add(
                curr_bskt
            ).then(() => {location.reload()});
        }
    }, 

    computed: {
        grandTotal: function() {
            return (this.sub*1.07).toFixed(2);
        }
    }

}
</script>

<style scoped>
</style>