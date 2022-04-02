<template>
  <el-container>
    <el-main>
      <h2>Products</h2>
      <el-row gutter="40">
        <el-col v-for="product in products" :key="product.id" :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="'http://localhost:8081/' + product.img_url"
              class="image"
            />
            <div style="padding: 14px">
              {{ product.name }}
              <div class="bottom">
                <router-link :to="{ name: 'Product', params: { id: product.id } }"
                  ><el-button type="text" class="button"
                    >Detail</el-button
                  ></router-link
                >
                <el-button type="text" class="button">Add to cart</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>





<script >
import axios from "../../http";
import { store } from "../../store";

export default {
  name: "Products",
  data() {
    return {
      store,
      products: [],
    };
  },
  created() {
    axios.get("/api/products").then((res) => {
      console.log(res);
      this.products = res.data;
    });
  },
  methods: {
    logout() {
      axios
        .post("/api/logout")
        .then((res) => {
          store.logout();
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
};

// axios
//   .get("/api/images", {
//     responseType: "arraybuffer",
//   })
//   .then((res) => {
//     const url=window.URL.createObjectURL(new Blob([res.data]));
//     const link=document.createElement('a');
//     link.href=url;
//     link.setAttribute('download',title);
//     document.body.appendChild(link);
//     link.click()
//     console.log('qsd');
//   })
//   .catch((err) => {
//     console.log(err.response);
//   });
</script>

<style>
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