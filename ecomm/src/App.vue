<template>
  <router-view></router-view>
</template>


<script>
import store from './store/store'
export default {
  name: "App",
  data() {
    return {};
  },
  created(){
    store.dispatch("cart/getCartItems");
  }
};
</script>






