import axios from "../http";
const cartStore = {
  namespaced: true,
  state: {
  
      products: [],
  
  },
  getters: {
    getQuantity(state){
         return (id)=>{
           return state.products.find(p=>p.id==id)
         }
    },
    totalItems(state) {
      return state.products.length?state.products.length:"0";
    },
    getProducts(state){
       return state.products;
    },
    totalPrice(state) {
      let prices = state.products.map((p) => p.total);

      let total = prices.reduce((start, p) => {
        return start + p;
      }, 0);
      return total;
    },
  },
  mutations: {
    clearCart(state){
     state.products=[]
    },
    setProducts(state, products) {
      state.products = products;
    },
    updateProduct(state, product) {
      let productIndex = state.products.findIndex(
        (p) => p.id == product.id
      );
      if (productIndex != -1) {
        let updatedProductQuantity =
          product.type == "increment"
            ? state.products[productIndex].quantity + 1
            : state.products[productIndex].quantity - 1;
        state.products[productIndex].quantity = updatedProductQuantity;
        state.products[productIndex].total =
          updatedProductQuantity * state.products[productIndex].price;

        return;
      }
    },
    addProduct(state, product) {
   
      let productIndex = state.products.findIndex(
        (p) => p.id == product.id
      );
      if (productIndex != -1) {
        state.products[productIndex].total = state.products[
          productIndex
        ].quantity++;
        state.products[productIndex].total =
          product.price * state.products[productIndex].quantity;

        return;
      }
      product.quantity = 1;
      product.total = product.price;
      state.products.push(product);
    },
    removeProduct(state, product) {
      let productIndex = state.products.findIndex(
        (p) => p.id == product.id
      );
      if (productIndex != -1) {
        state.products.splice(productIndex, 1);
      }
    },
    
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
