import { createStore } from "vuex";
import AuthStore from "./authStore";
import CartStore from "./cartStore";
const store = createStore({
  modules: {
    auth: AuthStore,
   cart: CartStore,
  },
});

export default store;
