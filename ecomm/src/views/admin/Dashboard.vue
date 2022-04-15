<template>
  <el-row :gutter="12">
    <el-col :span="6">
      <el-card class="card" shadow="always">
        Total Products
        <p>{{totalProducts}}</p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="card" shadow="always">
        Total Customers
        <p>1000</p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="card" shadow="always">
        Total Orders
        <p>658</p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="card" shadow="always">
        Total Revenue
        <p>45,004$</p>
      </el-card>
    </el-col>
  </el-row>
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