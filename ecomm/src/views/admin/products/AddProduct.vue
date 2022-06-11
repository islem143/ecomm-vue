<template>
  <el-form
    ref="info"
    :model="info"
    :rules="rules"
    label-position="top"
    label-width="120px"
  >
    <el-alert v-if="error" :title="error" type="error" effect="dark" />
    <el-form-item label="Name" prop="name">
      <el-input v-model="info.name" type="text"></el-input>
      <p style="color: red; margin: 0">{{ emailError }}</p>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="info.description" type="text"></el-input>
      <p style="color: red; margin: 0">{{ passwordError }}</p>
    </el-form-item>
    <el-form-item label="image" prop="image">
      <el-input
        id="image"
        name="image"
        v-model="info.image"
        type="file"
      ></el-input>
      <p style="color: red; margin: 0">{{ passwordError }}</p>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="info.price" type="number"></el-input>
      <p style="color: red; margin: 0">{{ passwordError }}</p>
    </el-form-item>
    <el-form-item label="Quantity" prop="quantity">
      <el-input v-model="info.quantity" type="number"></el-input>
      <p style="color: red; margin: 0">{{ passwordError }}</p>
    </el-form-item>
    <el-form-item>
      <el-button @click="addProduct('info')" type="primary">Submit</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from "../../../http";
import  store  from "../../../store/store";

export default {
  name: "AddProduct",
  props: ["addProductToList"],
  data() {
    return {
      store,
      info: {
        name: "",
        description: "",
        price: 0.0,
        quantity: 0,
      },
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            type: "string",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: false,
            type: "string",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            type: "string",
            trigger: "blur",
          },
        ],
        quantity: [
          {
            required: true,
            type: "string",
            trigger: "blur",
          },
        ],
      },

      emailError: "",
      passwordError: "",
      error: "",
    };
  },

  methods: {
    clearErrors() {
      this.emailError = "";
      this.passwordError = "";
      this.nameError = "";
    },

    addProduct(info) {
      this.clearErrors();
      let product = this.info;

      this.$refs[info]
        .validate()
        .then(() => {
          let formData = new FormData();
          let file = document.querySelector("#image");

          for (const key in product) {
            formData.append(key, product[key]);
          }
          formData.append("image", file.files[0]);

          axios
            .post("http://localhost:8081/api/products", formData)
            .then((res) => {
              product.id = res.data.id;

              this.addProductToList(product);
            })
            .catch((err) => {
              console.log(err.response);
            });
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>


<style scoped>
.el-container {
  display: block;
  justify-content: center;

  width: 450px;
  margin: 50px auto;
}
</style>