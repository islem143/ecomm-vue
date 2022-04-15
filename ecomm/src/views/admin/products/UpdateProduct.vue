<template>
  <el-form
    ref="info"
    :model="info"
    :rules="rules"
    label-position="top"
    label-width="120px"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="info.name" type="text"></el-input>
      <p style="color: red; margin: 0">{{ emailError }}</p>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="info.description" type="text"></el-input>
    </el-form-item>
    <el-form-item label="image" prop="image">
      <el-input
        id="image"
        name="image"
        v-model="info.image"
        type="file"
      ></el-input>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="info.price" type="number"></el-input>
      <p style="color: red; margin: 0">{{ passwordError }}</p>
    </el-form-item>
    <el-form-item label="Quantity" prop="quantity">
      <el-input v-model="info.quantity" type="number"></el-input>
    </el-form-item>
    <el-form-item class="btnC">
      <el-button type="primary" @click="handleEdit">Edit Product</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from "../../../http";
export default {
  name: "UpdateProduct",
  props: ["id", "editProductOnList"],
  data() {
    return {
      info: {
 
        name: "",
        description: "",
        price: 0.0,
        quantity: 0,
      },
    };
  },
  methods: {
    
    handleEdit() {
      let product = this.info;
      axios
        .put("/api/products/" + this.id, product)
        .then((res) => {
          product.id=this.id;
          this.editProductOnList(product);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    axios
      .get("/api/products/" + this.id)
      .then((res) => {
    
        this.info.name = res.data.name;
        this.info.description = res.data.description;
        this.info.price = res.data.price;
        this.info.quantity = res.data.quantity;
      })
      .catch((err) => {
        console.log(err);
      });
    this.dialogVisible = true;
  },
};
</script>


