<template>
<div class="container bg-white" >
  <Menubar :model="items" >
    <template #end>
      <router-link v-if="isAuth" to="/cart">
        <i
          class="pi pi-shopping-cart"
          style="margin-right: 20px; font-size: 2rem"
        ></i>
        <Badge :value="totalItems" />
      </router-link>
    </template>
  </Menubar>
  </div>
</template>












<script>
import { mapGetters, mapMutations } from "vuex";
import store from "../../store/store";

export default {
  name: "Header",
  data() {
    return {
      store,
      items: [
        {
          label: "Home",
          to: "/",
        },
        {
          label: "Products",
          to: "/products",
        },
        {
          label: "Login",
          to: "/auth/login",
          visible: () => !this.isAuth,
        },
        {
          label: "Register",
          to: "/auth/register",
          visible: () => !this.isAuth,
        },
        {
          label: "Logout",
          command: () => {
            store.dispatch("auth/logout").then((res) => {});
            store.commit("cart/clearCart");
            this.$router.replace("/");
          },
          visible: () => this.isAuth,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuth"]),
    ...mapGetters("cart", ["totalItems"]),
  },
  methods: {
    logout() {
      store.dispatch("auth/logout").then((res) => {});
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