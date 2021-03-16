<template>
  <div>
    <div class="navbar">
    <nav>
      <ul id = "mynav">
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li id="navDash"><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
    </nav>
    </div>
      <ul id="itemsList">
          <li v-for= "item in items" v-bind:key= "item.id">
              {{item.name}}<br><img :src= "item.imageURL"><br><qtyCtr v-bind:item = "item" v-on:counter= "onCounter"></qtyCtr>
          </li>
      </ul>
      <bskt id="shoppingBasket" v-bind:itemsSelected = "itemsSelected"></bskt>
  </div>
</template>

<script>

import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

export default {
    data(){
        return {
            itemsSelected: [],
            items: []
        }
    },
  //  props: {
  //   itemsList: {
  //       type: Array
  //   }
  //  },
    components: {
        'qtyCtr':QuantityCounter,
        'bskt':Basket
    },
    methods: {
        onCounter: function (item, count) {
            //If there is nothing in items selected, push the ORDER in
            if (this.itemsSelected.length === 0 && count > 0) {
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                var contained = false;
                 // Loop through everything to check what is not in the basket
                 for (let i = 0; i < this.itemsSelected.length; i++) {
                     const curr_item = this.itemsSelected[i];
                     const item_name = curr_item[0];

                     if (item_name === item.name && count > 0) {
                         // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                         this.itemsSelected.splice(i, 1, [item_name, count, item.price]);
                         contained = true;
                    } else if (item_name === item.name && count == 0) {
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        this.itemsSelected.splice(i, 1);
                        contained = true;
                    }
                
                } if (!contained) {
                        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                        this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
        fetchItems: function() {
          database.collection('menu').get().then(snapshot => {
            let item = {}
            snapshot.docs.forEach(doc => {
              item = doc.data()
              this.items.push(item)
            });
          });
        }
    },
    created() {
      this.fetchItems();
    }

}
</script>

<style scoped>
ul {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
#mynav {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#itemsList {
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>