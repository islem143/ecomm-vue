<template>
  <div>
      <Header />
       <router-view></router-view>
  </div>
</template>




<script>
import Header from "./Header2.vue";

export default {
  name: "PublicLayout",
  component: {
    Header,
  },
};
</script>