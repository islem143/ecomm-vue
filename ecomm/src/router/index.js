import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Home from "../views/Home.vue";
import Products from "../views/product/Products.vue";
import Product from "../views/product/Product.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import AddProduct from "../views/admin/products/AddProduct.vue";
import ProductsD from "../views/admin/products/Products.vue";
import getRole from "../roles";
import { store } from "../store";
import PublicLayout from "../components/ui/PublicLayout.vue";
import AdminLayout from "../components/ui/AdminLayout.vue";
const routes = [
  {
    path: "/",
    name: "PublicLayout",
    component: PublicLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "login", component: Login, name: "Login" },
      { path: "register", component: Register, name: "Register" },
      {
        path: "products",
        name: "Products",
        component: Products,
      },
      {
        path: "product/:id",
        name: "Product",
        component: Product,
      },
    ],
  },

  {
    path: "/dashboard",
    name: "AdminLayout",
    component: AdminLayout,
    children: [
      { name: "Dashboard", path: "", component: Dashboard },
      { name: "productsD", path: "products", component: ProductsD },
      {
        name: "productD",
        path: "product/:id",
        component: Product,
        props: { edit: true },
      },
    ],
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
