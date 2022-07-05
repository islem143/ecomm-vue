import axios from "../http";
const cartStore = {
  namespaced: true,
  state: {
    cart: {
      products: [],
    },
  },
  getters: {
    getQuantity(state){
         return (id)=>{
           return state.cart.products.find(p=>p.id==id)
         }
    },
    totalItems(state) {
      return state.cart.products.length?state.cart.products.length:"0";
    },
    products(state){
       return state.cart.products;
    },
    totalPrice(state) {
      let prices = state.cart.products.map((p) => p.total);

      let total = prices.reduce((start, p) => {
        return start + p;
      }, 0);
      return total;
    },
  },
  mutations: {
    clearCart(state){
     state.cart={products:[]}
    },
    setProducts(state, products) {
      state.cart.products = products;
    },
    updateProduct(state, product) {
      let productIndex = state.cart.products.findIndex(
        (p) => p.id == product.id
      );
      if (productIndex != -1) {
        let updatedProductQuantity =
          product.type == "increment"
            ? state.cart.products[productIndex].quantity + 1
            : state.cart.products[productIndex].quantity - 1;
        state.cart.products[productIndex].quantity = updatedProductQuantity;
        state.cart.products[productIndex].total =
          updatedProductQuantity * state.cart.products[productIndex].price;

        return;
      }
    },
    addProduct(state, product) {
   
      let productIndex = state.cart.products.findIndex(
        (p) => p.id == product.id
      );
      if (productIndex != -1) {
        state.cart.products[productIndex].total = state.cart.products[
          productIndex
        ].quantity++;
        state.cart.products[productIndex].total =
          product.price * state.cart.products[productIndex].quantity;

        return;
      }
      product.quantity = 1;
      product.total = product.price;
      state.cart.products.push(product);
    },
    removeProduct(state, product) {
      let productIndex = state.cart.products.findIndex(
        (p) => p.id == product.id
      );
      if (productIndex != -1) {
        state.cart.products.splice(productIndex, 1);
      }
    },
    clearCart(state){
      state.cart={
        products:[]
      }
    }
  },

  actions: {
    async changeQuantity({ commit }, product) {
      return axios
        .put("/api/cart/" + product.id, product)
        .then((res) => {
          commit("updateProduct", product);
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
    async getCartItems({ commit }) {
      return await axios.get("/api/cart").then((res) => {
        let products = res.data.products;

        let transformedProducts = products.map((p) => {
          return {
            id: p.id,
            name: p.name,
            quantity: p.pivot.quantity,
            price: p.price,
            total: p.price * p.pivot.quantity,
            img_url:p.img_url
          };
        });

        commit("setProducts", transformedProducts);
        return transformedProducts;
      });
    },
    async addCartItem({ commit }, product) {
      return await axios
        .post("/api/cart", { productId: product.id })
        .then((res) => {
          commit("addProduct", product);

          return res;
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
    async deleteCartItem({ commit }, product) {
      return await axios
        .delete("/api/cart/" + product.id, product)
        .then((res) => {
          commit("removeProduct", product);

          return res;
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
  },
  modules: {},
};

export default cartStore;
