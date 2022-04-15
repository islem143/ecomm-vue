<template>
  <el-container>
    <h2>Home</h2>
    {{ user}}
  </el-container>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["user"]),
  },
};
</script>


<style scoped>
.el-container {
  display: block;
  justify-content: center;

  width: 450px;
  margin: 50px auto;
}
</style>