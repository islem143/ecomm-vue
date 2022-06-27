<template>
  <!-- <el-row class="tac">
    <el-col :span="4">
      <h5 class="mb-2">
        <span class="icon"
          ><svg
            class="icon"
            width="50"
            height="50"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-4194ce60=""
          >
            <path
              fill="currentColor"
              d="M704 704h64v192H256V704h64v64h384v-64zm188.544-152.192C894.528 559.616 896 567.616 896 576a96 96 0 11-192 0 96 96 0 11-192 0 96 96 0 11-192 0 96 96 0 11-192 0c0-8.384 1.408-16.384 3.392-24.192L192 128h640l60.544 423.808z"
            ></path></svg
        ></span>
      </h5>

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Dashboard</span>
          </template>

          <el-menu-item index="1-1"
            ><router-link :to="{ name: 'Dashboard' }"
              >Stats</router-link
            ></el-menu-item
          >
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Products</span>
          </template>

          <el-menu-item index="2-1"
            ><router-link :to="{ name: 'productsD' }"
              >Products</router-link
            ></el-menu-item
          >
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Clients</span>
          </template>

          <el-menu-item index="3-1">Clients</el-menu-item>
          <el-menu-item index="3-2">Clients Location</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Orders</span>
          </template>

          <el-menu-item index="4-1">Orders</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Delivery</span>
          </template>

          <el-menu-item index="5-1">Delivery men</el-menu-item>
          <el-menu-item index="5-2">Deliveries</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col class="flex" :span="20">
      <router-view></router-view>
    </el-col>
  </el-row> -->
  <div></div>
</template>

<script>
</script>

<style scoped>
.flex {
  margin: auto;
  padding: 100px;
}
</style>