<template>
    <div>
        <ul id="orderUL">
          <li id="orderList" v-for= "order in datapacket" v-bind:key= "order">
            <p v-for="(val,key,index) in order" v-bind:key="key">
                {{key}}: {{val}} <br> 
                <input v-bind:id="index" placeholder=0 type="number" min="0"><br>
            </p>
          </li>
        </ul>
        <button v-on:click="updateOrder()">Update</button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data(){
        return {
            datapacket: []
        }
    },
    props: {
        id: {
            type: String
        }
    },
    methods: {
        updateOrder: function() { 
            var curr_pckt = {};
            //const new_pcket = this.datapacket[0];
            for (var order in this.datapacket[0]) {
              //alert(this.datapacket[0][order]);
                curr_pckt[order] = parseInt(this.datapacket[0][order]);
              //  for ((val,key) in order) {
             //       curr_pckt.item = qty;
              //  }
            }

            var i = 0;
            for (var item in curr_pckt) {
                var qtyUpdate = document.getElementById(i).value;
                if (qtyUpdate.length > 0) {
                    curr_pckt[item] = parseInt(qtyUpdate);
                }
                i++;
            } 
            database.collection('orders').doc(this.id).update(curr_pckt).then(() => this.$router.push('Orders')); 
        }, 
        fetchItems: function() {
          database.collection('orders').get().then(snapshot => {
            snapshot.docs.forEach(doc => { 
                if (doc.id == this.id) {
                    this.datapacket.push(doc.data());
                }
            });
          });
        },
    },
    created() {
      this.fetchItems();
    }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>