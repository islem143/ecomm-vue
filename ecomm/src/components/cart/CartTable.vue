<template>

      <div >
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Name" prop="name" />
          <el-table-column label="Quantity" prop="quantity" />
          <el-table-column label="Price" prop="price" />
          <el-table-column label="Total" prop="total" />
          <el-table-column align="right">
            <template #default="scope">
              <el-button @click="increaseQuantity(scope.row)" size="small"
                >+</el-button
              >
              <el-button @click="decreaseQuantity(scope.row)" size="small"
                >-</el-button
              >
              <el-button
                style="margin-top: 10px"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >remove from cart</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
   

</template>

<script>
import axios from "../../http";
import { ElMessageBox } from "element-plus";
import store from "../../store/store";

export default {
  name: "CartTable",
  components: {},
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
  methods: {
    handleCheckout() {
      this.$router.push("/orders");
    },
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
</style>




