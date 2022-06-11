<template>
  <div>
      <Header />
       <router-view></router-view>
  </div>
</template>




<script>
import Header from "./Header.vue";
export default {
  name: "AuthLayout",
  component: {
    Header,
  },
};
</script>