import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Home from "../views/Home.vue";
import Products from "../views/product/Products.vue";
import Product from "../views/product/Product.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import AddProduct from "../views/admin/products/AddProduct.vue";
import ProductsD from "../views/admin/products/Products.vue";
import { getRole, ROLES } from "../roles";
import store from "../store/store";
import PublicLayout from "../components/ui/PublicLayout.vue";
import AdminLayout from "../components/ui/AdminLayout.vue";

import Cart from "../views/cart/Cart.vue";
import Order from "../views/order/Order.vue";
import OrderInfo from "../views/order/OrderInfo.vue";
import OrderPayment from "../views/order/OrderPayment.vue";
import OrderConfirmation from "../views/order/OrderConfirmation.vue";
const routes = [
  {
    path: "/auth",
    //redirect:"/login",
    name: "Auth",
    component: PublicLayout,
    meta: { isGuest: true },
    children: [
      { path: "login", component: Login, name: "Login" },
      { path: "register", component: Register, name: "Register" },
    ],
  },
  {
    path: "/",
    name: "PublicLayout",
    component: PublicLayout,

    children: [
      { path: "", name: "Home", component: Home },

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
      {
        path: "cart",
        name: "Cart",
        component: Cart,
        meta: { requireAuth: true, roles: [ROLES.CLIENT] },
      },
      {
        path: "orders",
        redirect: "/orders/info",
        name: "Order",
        component: Order,
        meta: {
          requireAuth: true,
          roles: [ROLES.CLIENT],
        },
        children: [
          {
            path: "info",
            name: "OrderInfo",
            component: OrderInfo,
          },
          {
            path: "payment",
            name: "OrderPayment",
            component: OrderPayment,
          },
          {
            path: "confirmation",
            name: "OrderConfirmation",
            component: OrderConfirmation,
          },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    meta: { requireAuth: true, roles: [ROLES.ADMIN] },
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
  if (to.meta.requireAuth && !store.state.auth.user.token) {
    return { name: "Login" };
  } else if (
    to.meta.requireAuth &&
    store.state.auth.user.token &&
    !to.meta.roles.includes(getRole())
  ) {
    return { name: "Home" };
  } else if (to.meta.isGuest && store.state.auth.user.token) {
    return { name: "Home" };
  }
});
export default router;
