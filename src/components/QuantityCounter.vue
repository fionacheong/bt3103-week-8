<template>
  <div>

<button id="decrBtn" v-on:click="decrement()">-</button>
<a id="qty"> {{qty}} </a>
<button id="incrBtn" v-on:click="increment()">+</button>

  </div>
</template>

<script>

export default {
    data() {
        return {qty:0}
    },
    props: {
     item: {
         type: Object
     }
    },
    methods:{
        decrement: function() {
            if (this.qty > 0) {
                this.qty=this.qty-1;
                this.$emit('counter', this.item, this.qty)
            }
            
        },
        increment: function() {
            if (this.qty < 10) {
                this.qty=this.qty+1;
                this.$emit('counter', this.item, this.qty)
            } else {
                alert("You cannot buy more than 10 items.")
            }
            
        }
    }

}

</script>

<style scoped>

#incrBtn{
font-family: 'Avenir', Helvetica, Arial, sans-serif;
text-align: center; color: #111111; 
}

#decrBtn{
font-family: 'Avenir', Helvetica, Arial, sans-serif;
text-align: center; color: #111111; 
}

</style>