<template>
  <div>
      <Header />
       <router-view></router-view>
  </div>
</template>




<script>
import Header from "./Header.vue";
console.log('qsd');
export default {
  name: "PublicLayout",
  component: {
    Header,
  },
};
</script>