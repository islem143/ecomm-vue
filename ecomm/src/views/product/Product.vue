<template>
  <el-container>
    <el-main>
      <h2>Product N {{ $route.params.id }}</h2>
      <el-row gutter="40">
        <el-col :span="8">
          <img
            :src="'http://localhost:8081/' + product.img_url"
            class="image"
          />
        </el-col>
        <el-col :span="8">
          <p>{{ product.name }}</p>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}$</p>
          <el-button>Add to cart</el-button>
          <router-link
            v-if="$can('update', 'Product')"
            :to="{ name: 'addProduct', params: { id:$route.params.id,edit: true } }"
          >
            <el-button>Edit</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>





<script>
import { ref } from "vue";
import axios from "../../http";
const currentDate = ref(new Date());

export default {
  name: "Product",

  data() {
    return {
      product: { name: "", description: "", price: "" },
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get("/api/products/" + id).then((res) => {
      this.product = res.data;
    });
  },
};
</script>

<style scoped>
img {
  border-radius: 3px;
}
.el-container {
  display: block;
  justify-content: center;

  width: 700px;
  margin: 20px auto;
}
.el-col {
  margin-top: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>