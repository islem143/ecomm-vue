<template>
  <div class="header">
    <div class="container">
      <Menubar :model="items">
        <template #end>
          <router-link v-if="isAuth" to="/cart">
          <div class="relative ">
                 <i
              class="pi pi-shopping-cart  text-900 text-4xl mt-2 hover:text-red-400 "
          
            ></i>
            <Badge class="absolute  top-0 right-1 bg-red-400 min-w-0 w-5 "  :value="totalItems" />
          </div>
       
          </router-link>
        </template>
      </Menubar>
    </div>
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
      store.dispatch("auth/logout").then((res) => {
        store.commit("cart/clearCart");
        this.$router.replace("/auth/login");
      });
    },
  },
};
</script>


<style scoped >
::v-deep(.p-menubar) {
  background: white;
  border-radius: 0;
  border: none;
}
</style>