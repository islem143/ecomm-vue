<template>
  <el-container>
    <el-main>
      <h2>Products</h2>
      <el-row gutter="40">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <div class="bottom">
                <router-link :to="{ name: 'Product', params: { id: 1 } }"
                  ><el-button type="text" class="button"
                    >Detail</el-button
                  ></router-link
                >
                <el-button type="text" class="button">Add to cart</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <div class="bottom">
                <el-button type="text" class="button">Detail</el-button>
                <el-button type="text" class="button">Add to cart</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <div class="bottom">
                <el-button type="text" class="button">Detail</el-button>
                <el-button type="text" class="button">Add to cart</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <div class="bottom">
                <el-button type="text" class="button">Detail</el-button>
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
import axios from "../http";
import { store } from "../store";
export default {
  name: "Products",
  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      axios
        .post("/api/logout")
        .then((res) => {
          console.log(res);
          store.logout();
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
};
axios.get("/api/products").then((res) => {
  console.log(res);
});
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