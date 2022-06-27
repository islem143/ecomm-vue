<template>
<div class="container">
  <div class=" p-5 grid w-6 m-auto mt-8 gap-8">
    <div class="w-max-5 col-7">
      <img
        :src="'http://localhost:8081/storage/' + product.img_url"
        class="border border-1 surface-border p-5 w-full h-full border-rounded"
      />
    </div>
    <div class="col flex flex-column justify-content-between">
      <div>
        <h2>{{ product.name }}</h2>
        <small>Price</small>
        <h3>{{ product.price }}$</h3>
      

        <p>Quantity</p>
        <div class="flex">
          <div class="flex gap-1 w-2">
            <Button label="-" />
            <p class="w- m-auto">{{quantity}}</p>
            <Button label="+" />
          </div>
        </div>
        <Button icon="pi pi-shopping-cart" class="mt-5 flex-grow-1" @click="addToCart" label="Add To Cart"/>
      </div>
    </div>
  </div>
  <div>


<TabView class="w-8 m-auto">
	<TabPanel header="Description">
		Description
	</TabPanel>
	<TabPanel header="Reviews">
		Reviews
	</TabPanel>
	<TabPanel header="Comments">
		Comments
	</TabPanel>
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
      store,
      product: {},
      quantity:0
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
      this.quantity=store.getters["cart/getQuantity"](9).quantity
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