<template>
  <el-container>
    <el-main>
      <CartTable />
      <p>
        Total Amount:
        <b>{{ totalPrice }} $</b>
      </p>
      <el-button
        style="margin-top: 10px"
        size="small"
        type="primary"
        @click="handleCheckout"
        >checkout</el-button
      >
    </el-main>
  </el-container>
</template>

<script>
import store from "../../store/store";
import CartTable from "../../components/cart/CartTable2.vue";
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




