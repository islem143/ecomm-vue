<template>
  <!-- <el-container>
    <h2>Home</h2>
    {{ user }}
   

  </el-container> -->
  <div></div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "Home",

  data(){
    return {
      		            displayBasic: false,
    }
  },
  methods:{
     openBasic() {
            this.displayBasic = true;
        }
  },
  computed: {
    ...mapState("auth", {
      user: (state) => state.user,
    }),
  },
  created() {
    console.log(this.$store);
  },
};
</script>


<style scoped>

</style>