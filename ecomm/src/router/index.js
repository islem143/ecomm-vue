import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue';
import Dashboard from '../views/admin/Dashboard.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component:Home,
  },
  {
    path: "/login",
    name: "Login",
    component:Login,
  },
  {
    path: "/register",
    name: "Register",
    component:Register,
  },
  {
    path: "/products",
    name: "Products",
    component:Products,
  },
  {
    path: "/product/:id",
    name: "Product",
    component:Product,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component:Dashboard,
  },
 
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
