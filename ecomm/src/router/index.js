import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Home from "../views/Home.vue";
import Products from "../views/product/Products.vue";
import Product from "../views/product/Product.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import AddProduct from "../views/admin/products/AddProduct.vue";

import getRole from "../roles";
import { store } from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [{ path: "addproduct", component: AddProduct }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  if (
    (getRole() == "Guest" || getRole() == "Client") &&
    to.name == "Dashboard"
  ) {
    return { name: "Login" };
  }
  if (store.isAuth() && (to.name == "Login" || to.name == "Register")) {
    return { name: "Home" };
  }
});
export default router;
