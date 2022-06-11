<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Name" prop="name" />
    <el-table-column label="Quantity" prop="quantity" />
    <el-table-column label="Price" prop="price" />
    <el-table-column label="Total" prop="total" />
  </el-table>
</template>

<script>
import store from "../../store/store";

export default {
  name: "OrdersTable",
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    store.dispatch("cart/getCartItems").then(() => {
      this.tableData = store.state.cart.cart.products;
    });
  },
};
</script>




