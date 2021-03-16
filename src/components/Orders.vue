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

        <ul id="orderUL">
          <li id="orderList" v-for= "order in orders" v-bind:key= "order">
            <p v-for="(val,key) in order[1]" v-bind:key="key">
                {{key}}: {{val}} <br>
            </p>
            <button v-on:click="deleteItem($event)" v-bind:id="order[0]">Delete</button>
            <button v-on:click="route($event)" v-bind:id="order[0]">Modify</button>
          </li>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data(){
        return {
            orders: []
        }
    },

    methods : {
        fetchItems: function() {
          database.collection('orders').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.orders.push([doc.id,doc.data()])
            });
          });
        },
        deleteItem: function(event) {
          let doc_id = event.target.getAttribute("id");
          database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },
        route: function(event) {
          let doc_id = event.target.getAttribute("id");
          //console.log(doc_id);
          this.$router.push({ name: 'modify', params: { id: doc_id } })
          
        }
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
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>