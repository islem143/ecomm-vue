<template>
  <div class="container mt-7">
    <div class="card"></div>
    <Steps :model="items" :readonly="false" />
  </div>
  <div class="container mt-5">
    <div class="grid">
      <router-view
        class="col-8"
        v-slot="{ Component }"
        :formData="formObject"
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
        @complete="processPayment"
        :stripe="stripe"
        :element="elements"
        @createPaymentMethod="createPaymentMethod"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <Card class="col-3 col-offset-1">
        <template v-slot:title> Total</template>
        <template v-slot:content>
          <p>Subtotal: 440$</p>
          <p>Shipping: 40$</p>
          <p>Tax: 5$</p>

          <hr />
          <p class="text-3xl">4000$</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "../../http";

import store from "../../store/store";
//import OrdersTable from "../../components/orders/OrdersTable.vue";
//import OrderForm from "../../components/orders/OrderForm.vue";
import { loadStripe } from "@stripe/stripe-js";
import { mapGetters } from "vuex";
export default {
  name: "Order",

  //components: { OrdersTable, OrderForm },
  data() {
    return {
      stripe: {},
      cardElement: null,

      formObject: {},
      items: [
        {
          label: "Information",
          to: "/orders/info",
        },
        {
          label: "Payment",
          to: "/orders/payment",
        },

        {
          label: "Confirmation",
          to: "/orders/confirmation",
        },
      ],
      id: null,
      dialogVisible: false,
      addDialog: false,
      editDialog: false,
      tableData: [],
    };
  },

  async created() {
    this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
    //this.elements = this.stripe.elements();
    store.dispatch("cart/getCartItems").then(() => {
      //this.tableData = store.state.cart.cart.products;
    });
  },
  computed: {
    ...mapGetters("cart", ["totalPrice", "getProducts"]),
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    async processPayment() {
      console.log(this.formObject);
      await axios
        .post("/api/orders", this.formObject)
        .then((res) => {
          //commit("addProduct", product);
          axios.delete("/api/cart");
          return res;
        })
        .catch((err) => {
          console.log(err);
          //return Promise.reject(err.response.data);
        });

      // this.$toast.add({
      //   severity: "success",
      //   summary: "Order submitted",
      //   detail:
      //     "Dear, " +
      //     this.formObject.firstname +
      //     " " +
      //     this.formObject.lastname +
      //     " your order completed.",
      // });
    },
  },
};
</script>




