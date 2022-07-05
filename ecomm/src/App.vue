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
 
  created() {
    store.dispatch("cart/getCartItems");
  },
};
</script>







<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
*{font-family: 'Nunito', sans-serif;}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
div {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 80vw;
  margin: auto;
}

.menuC {
  display: flex;
  justify-content: end;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
}
svg {
  margin-right: 10px;
  color: rgb(90, 90, 255);
}

</style>