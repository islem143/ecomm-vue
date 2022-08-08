<template>
  <div>
    <main class="container">
      <CartTable />
      <div class="flex flex-row-reverse">
        <div>
          <p class="mt-5 text-lg">
            Total Amount:
            <b>{{ totalPrice }} $</b>
          </p>
          <Button @click="handleCheckout" label="Precced To Checkout" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import store from "../../store/store";
import CartTable from "../../components/cart/CartTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: { CartTable },
  computed: {
    ...mapGetters("cart", ["totalPrice"]),
  },
  methods: {
    handleCheckout() {
      this.$router.push("/orders");
    },
  },
};
</script>




