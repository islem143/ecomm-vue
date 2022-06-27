<template>
 <div></div>
</template>

<script>
import axios from "../../http";

import store from "../../store/store";
//import OrdersTable from "../../components/orders/OrdersTable.vue";
//import OrderForm from "../../components/orders/OrderForm.vue";
import { mapGetters } from "vuex";
export default {
  name: "Order",
  //components: { OrdersTable, OrderForm },
  data() {
    return {
      id: null,
      dialogVisible: false,
      addDialog: false,
      editDialog: false,
      tableData: [],
    };
  },
  created() {
    store.dispatch("cart/getCartItems").then(() => {
      this.tableData = store.state.cart.cart.products;
    });
  },
  computed: {
    ...mapGetters("cart", ["totalPrice"]),
  },
  methods: {
    increaseQuantity(product) {
      let info = { id: product.id, type: "increment" };
      store.dispatch("cart/changeQuantity", info).then((res) => {
        console.log(res);
      });
    },
    decreaseQuantity(product) {
      let info = { id: product.id, type: "decrement" };
      store.dispatch("cart/changeQuantity", info).then((res) => {
        console.log(res);
      });
    },

    handleEdit(index, row) {
      this.id = row.id;
      this.editDialog = true;
    },
  
  },
};
</script>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.el-message-box {
  background: red;
}
.products {
  display: flex;
  flex-direction: column;
}
.addBtn {
  align-self: flex-end;
}
</style>




