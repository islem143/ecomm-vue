<template>
<Header/>
<router-view></router-view>

</template>


<script>
import Header from './views/Header.vue';
export default{
    name:'App',
    components:{
        Header
    }
}

</script>






