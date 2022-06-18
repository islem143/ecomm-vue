<template>
  <router-view></router-view> 
  

</template>


<script>
import store from "./store/store";
export default {
  name: "App",

  data() {
    return {
      display: true,
    };
  },
  methods: {
    openBasic() {
      this.displayBasic = true;
    },
  },
  created() {
    store.dispatch("cart/getCartItems");
  },
};
</script>






