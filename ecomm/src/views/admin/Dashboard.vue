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
        <div class="col-12 md:col-3">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{
                  slotProps.data.category
                }}</span>
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

<script>
import axios from '../../http'
export default{
  name:'Dashboard',
  data(){
    return{
      totalProducts:0
    }
  },
  created(){
     axios.get('/api/products/count').then(res=>{
       this.totalProducts=res.data
     }).catch(err=>{
       console.log(err);
     })
  }
}
</script>

<style scoped>
.card {
  background: rgb(255, 255, 255);
  border-radius: 10px;
}
</style>