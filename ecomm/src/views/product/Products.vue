<template>
  <div class="container mt-8">
    <h1>Products</h1>
    <DataView
      :value="products"
      :layout="layout"
      :paginator="true"
      :rows="4"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="lg:col-4 md:col-6 mx-auto gap-7">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category"> Man </span>
              </div>
            </div>
            <div class="product-grid-item-content">
              <img
                :alt="slotProps.data.name"
                :src="'http://localhost:8081/storage/' + slotProps.data.img_url"
              />
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <router-link
                :to="{ name: 'Product', params: { id: slotProps.data.id } }"
                ><Button>Detail</Button></router-link
              >
              <Button
                @click="addToCart(slotProps.data)"
                icon="pi pi-shopping-cart"
              ></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>



<script >
import axios from "../../http";
import store from "../../store/store";

export default {
  name: "Products",
  data() {
    return {
      store,
      products: [],
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
      ],
    };
  },

  created() {
    axios.get("/api/products").then((res) => {
      console.log(res);
      this.products = res.data;
    });
  },
  methods: {
    addToCart(product) {
      console.log(product.id);
      store.dispatch("cart/addCartItem", product);
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
<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>