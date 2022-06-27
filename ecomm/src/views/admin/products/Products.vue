<template>
  <!-- <div class="products">
    <el-button class="addBtn" @click="addProduct">Add Product</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Price" prop="price" />
      <el-table-column label="Quantity" prop="quantity" />

      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Dialog
      v-if="editDialog"
      title="Update Product"
      @close="editDialog = false"
      :dialogVisible="editDialog"
    >
      <UpdateProduct
        :editProductOnList="editProductOnList"
        v-if="editDialog"
        :id="id"
      />
    </Dialog>
    <Dialog
      v-if="addDialog"
      title="Add Product"
      @close="addDialog = false"
      :dialogVisible="addDialog"
    >
      <AddProduct :addProductToList="addProductToList" />
    </Dialog>
  </div> -->
  <div></div>
</template>

<script>
//import UpdateProduct from "./UpdateProduct.vue";
//import AddProduct from "./AddProduct.vue";
//import Dialog from "../../../components/ui/Dialog.vue";
import axios from "../../../http";


export default {
  name: "Products",
  components: {
    // UpdateProduct,
    // Dialog,
    // AddProduct,
  },
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
    axios
      .get("/api/products")
      .then((res) => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
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
      this.editDialog=false
    },
    // handleDelete(index, row) {
    //   console.log(row);
    //   ElMessageBox.confirm("Are you sure to close this dialog?")
    //     .then(() => {
    //       axios
    //         .delete("/api/products/" + row.id)
    //         .then((res) => {
    //           console.log(res);
    //         })
    //         .catch((err) => {
    //           console.log(err.response);
    //         });
    //       this.tableData = this.tableData.filter((p) => p.id != row.id);
    //       done();
    //     })
    //     .catch(() => {
    //       // catch error
    //     });
    // },
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