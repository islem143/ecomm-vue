<template>
  <div>
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
      v-if="dialogVisible"
      title="Update Product"
      @close="dialogVisible = false"
      :dialogVisible="dialogVisible"
    >
      <UpdateProduct :id="id" />
    </Dialog>
  </div>
</template>

<script>
import UpdateProduct from "./UpdateProduct.vue";
import Dialog from "../../../components/ui/Dialog.vue";
import axios from "../../../http";
export default {
  name: "Products",
  components: {
    UpdateProduct,
    Dialog,
  },
  created() {
    axios
      .get("/api/products")
      .then((res) => {
        console.log(res);
        this.tableData = res.data;
        // this.tableData.map(p=>{
        //   console.log(p.);
        //   return {...p,price:p.price+"$"}
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      id: null,
      dialogVisible: false,
      tableData: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      this.id = row.id;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      axios
        .delete("/api/products/" + row.id,)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
      this.tableData = this.tableData.filter((p) => p.id != row.id);
    },
  },
};
</script>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>