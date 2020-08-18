<template>
  <div id="app">
    <router-view></router-view>
<van-tabbar v-model="active" :change="onChange" v-if="IsShow">
  <van-tabbar-item icon="home-o" to="/">商家</van-tabbar-item>
  <van-tabbar-item icon="search" to="/order">订单</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/login">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: 'App',
  data(){
    return{
      active:0
    }
  },
  components: {
   [Tabbar.name]:Tabbar,
   [TabbarItem.name]:TabbarItem
  },
  computed:{
    IsShow(){
      var name = this.$route.name
      if (name =="home"||name=="order"||name=="login"){
        return true
      }else{
  return false
      }
      
    }
    
    
  },
  methods: {
    onChange(event){
      console.log(event)
       this.setData({ active: event.detail });
    }
  },
}
</script>

<style lang="scss">
  @import "styles/init.css"
</style>
