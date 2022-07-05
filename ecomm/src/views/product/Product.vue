<template>
  <div class="container">
    <div class="p-5 grid m-auto mt-8 gap-8 justify-content-center">
      <div class="col-3">
        <Image
          :preview="true"
          imageClass="w-full"
          :src="'http://localhost:8081/storage/' + product.img_url"
          class="border w-full border-1 surface-border border-rounded"
        />
      </div>
      <div class="col-4 flex flex-column justify-content-between">
        <div>
          <h2>{{ product.name }}</h2>
          <Rating v-model="val" :readonly="true" :cancel="false" />
          <hr />

          <h2>{{ product.price }}$</h2>
          <small class="text-800">CATEGORY: category1,category2 </small>

          <div class="flex mt-4 gap-5">
            <div class="flex">
              <Button class="hover:text-blue-400 px-3 bg-white text-900 border-400 border-noround">
                -
              </Button>
              <p class=" border border-1 px-4 py-3 m-auto border-400">
                {{ quantity }}
              </p>
              <Button class="hover:text-blue-400 px-3 bg-white text-900 border-400 border-noround">
                +
              </Button>
            </div>
            <Button
              icon="pi pi-shopping-cart"
              class="flex-grow-1"
              @click="addToCart"
              label="Add To Cart"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <TabView class="w-8 m-auto">
        <TabPanel header="Description"> Description </TabPanel>
        <TabPanel header="Reviews"> Reviews </TabPanel>
        <TabPanel header="Comments"> Comments </TabPanel>
      </TabView>
    </div>
  </div>
</template>





<script>
import { ref } from "vue";
import axios from "../../http";
import store from "../../store/store";
const currentDate = ref(new Date());

export default {
  name: "Product",

  data() {
    return {
      val: 4,
      store,
      product: {},
      quantity: 0,
    };
  },
  methods: {
    addToCart() {
      store.dispatch("cart/addCartItem", this.product);
    },
  },

  created() {
    const id = this.$route.params.id;
    axios.get("/api/products/" + id).then((res) => {
      this.product = res.data;
      this.quantity = store.getters["cart/getQuantity"](9).quantity;
    });
  },
};
</script>

<style scoped>
::v-deep(.p-rating .p-rating-icon.pi-star-fill) {
  color: #f65b5b;
}
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