<template>
  <el-container>

    <el-main class="grid">
        <div>
        <OrderForm />
      </div>
      <div>
        <OrdersTable />
        <p>
          Total Amount:
          <b>{{ totalPrice }} $</b>
        </p>
      </div>
    
    </el-main>
  </el-container>
</template>

<script>
import axios from "../../http";
import { ElMessageBox } from "element-plus";
import store from "../../store/store";
import OrdersTable from "../../components/orders/OrdersTable.vue";
import OrderForm from "../../components/orders/OrderForm.vue";
import { mapGetters } from "vuex";
export default {
  name: "Order",
  components: { OrdersTable, OrderForm },
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
    addProduct() {
      this.addDialog = true;
    },
    addProductToList(product) {
      this.tableData.push(product);
      this.addDialog = false;
    },
    editProductOnList(editedProduct) {
      let index = this.tableData.findIndex((p) => p.id == editedProduct.id);
      this.tableData.splice(index, 1, editedProduct);
      this.editDialog = false;
    },
    handleDelete(index, row) {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          store.dispatch("cart/deleteCartItem", row).then((res) => {
            console.log(res);
          });
          done();
        })
        .catch(() => {
          // catch error
        });
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
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5%;
}
</style>




