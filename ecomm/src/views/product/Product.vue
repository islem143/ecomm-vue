<template>
  <div class="shadow-5 p-5 grid w-6 m-auto mt-8 gap-8">
    <div class="w-max-4 col-5">
      <img
        :src="'http://localhost:8081/storage/' + product.img_url"
        class="w-full h-auto border-rounded"
      />
    </div>
    <div class="col flex flex-column justify-content-between">
      <div>
        <h2>{{ product.name }}</h2>
        <small>Price</small>
        <h3>{{ product.price }}$</h3>
        <small>Description:</small>
        <p>{{ product.description }}</p>

        <p>Quantity</p>
        <div class="flex">
          <div class="flex gap-1 w-4">
            <Button>-</Button>
            <p class="w-2 m-auto">{{quantity}}</p>
            <Button>+</Button>
          </div>
        </div>
        <Button class="mt-5 flex-grow-1" @click="addToCart">Add to cart</Button>
      </div>
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