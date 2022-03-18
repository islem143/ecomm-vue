<template>
  <div>
    <el-row class="container" justify="space-between">
      <el-col :span="4" class="logo">
        <span class="icon"
          ><svg
            class="icon"
            width="50"
            height="50"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-4194ce60=""
          >
            <path
              fill="currentColor"
              d="M704 704h64v192H256V704h64v64h384v-64zm188.544-152.192C894.528 559.616 896 567.616 896 576a96 96 0 11-192 0 96 96 0 11-192 0 96 96 0 11-192 0 96 96 0 11-192 0c0-8.384 1.408-16.384 3.392-24.192L192 128h640l60.544 423.808z"
            ></path></svg
        ></span>
        <h2>Ecommerce</h2>
      </el-col>
      <el-col class="menuC" :span="14">
        <el-menu class="menu el-menu-demo" mode="horizontal">
          <el-menu-item index="1"
            ><router-link to="/">Home</router-link></el-menu-item
          >
          <el-menu-item index="2"
            ><router-link to="/login">Login</router-link></el-menu-item
          >
          <el-menu-item index="3"
            ><router-link to="/register">Register</router-link></el-menu-item
          >
          <el-menu-item index="4"
            ><router-link to="/products">Products</router-link></el-menu-item
          >
          <el-menu-item index="5"
            ><router-link to="/product">Product</router-link></el-menu-item
          >
          <el-menu-item @click="logout" index="6"> log out</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "../http";
import { store } from "../store";
export default {
  name: "Header",
  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      axios
        .post("/api/logout")
        .then((res) => {
          store.logout();
          this.$router.push("/login");
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style >
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