
<template>

<div class="cart-container" >
  <div class="mask-bg" v-show="showall"></div>
  <div class="cart-group">
    <div class="satify-group" v-show="showall">已满足起送价</div>
    <div class="cart-list-group">
      <div class="cart-title-group" v-show="showall">
        <span class="title">购物车</span>
        <span class="clear-btn" @click="clearall">清空购物车</span>
      </div>
      <ul class="goods-list" v-show="showall">
        <li v-for="goods in goodsList" :key="goods.name">
          <div class="goods-info"  >
            <span class="title">{{goods.name}}</span>
            <span class="price">￥{{goods.count*goods.price}}</span>
             <stepper v-model="goods.count"></stepper>
          </div>

        </li>
      </ul>
    </div>
  </div>
  <div class="settle-group" v-show="showthat">
    <div class="hot-area" @click="showall=!showall">
      <div class="shop-icon">
        <div class="badage"></div>
      </div>
      <div class="total-price">
        <span class="unit">￥</span>{{totalMony}}
       
      </div>
    </div>
    <div class="settle-btn" to="/address" @click="gotoPay">去结算</div>
  </div>
</div>
</template>

<script>
import Stepper from "./Stepper"
export default {
    name:"cart",
    props:["categories"],
    data(){
        return{
            showall:false,
           
        }
    },
    components:{
      [Stepper.name]:Stepper
    },
    watch: {
      showthat:function(oldVal,newVal){

        if(oldVal==false && newVal ==true){
          this.showall=false
        }
      }
    },
    
    computed: {
      showthat(){
        
        if(this.goodsList.length>0){
          return true
        }else{
            
          return false
        }
      },
      goodsList(){
      const goods_list =[]
      for (let category of this.categories){
            for (let goods of category.goods_list){
                if(goods.count>0){
                    goods_list.push(goods)
                }
            }
        }
   
        return goods_list
      },
      totalMony(){
        var money=0
        for(let goods of this.goodsList){
          money+=goods.price*goods.count
        }
        return money
      }
    },
    methods: {
        clearall(){
          this.showall=false
          this.$emit("clear-all","yes")
        },
        isshow(){
       
          if(this.totalMony==0){
            this.showall=false
          }
        },
        gotoPay(){
          this.$store.commit("GoodsSetter",this.goodsList)
          this.$router.push("/submit")
        }
    },
}
</script>







<style scoped lang='scss'>
.cart-container{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;

  .mask-bg{
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .cart-group{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    background-color: #fff;
    .satify-group{
      background-color: #fff1d0;
      font-size: 12px;
      text-align: center;
      padding: 4px 0;
    }
    .cart-list-group{
      .cart-title-group{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        .clear-btn{
          padding-left: 16px;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAAGFBMVEUAAABmZmZnZ2dtbW1mZmZnZ2dmZmZmZmbBwsy3AAAAB3RSTlMA54gcS6a2Y+y94QAAAGJJREFUGNNjAAPFciEGOGAqLy9XgPMYSxjcBSDi4uUwUKjAoF6OAEUM4g5wDSyFqDxUlWimMLAXgJVBGJi8chAcJDwklzEWQ3nmoKBhLTMAc5jTA0CkOMx7YFFTcQgnmIEBABeDPTvg/cSzAAAAAElFTkSuQmCC");
          background-repeat: no-repeat;
          background-size: 14px;
        }
      }
      .goods-list{
        li{
          padding: 10px;
          height: 30px;
          display: flex;
          align-items: center;
          .goods-info{
            display: flex;
            flex: 1;
            justify-content: space-between;
            .title{
              font-size: 18px;
            }
            .price{
              color: #FB4E44;
              font-size: 14px;
            }
          }
          .stepper{
            min-width: 82px;
          }
        }
      }
    }
  }

  .settle-group{
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    .hot-area{
      background-color: #3b3b3c;
      flex: 1;
      .shop-icon{
        width: 50px;
        height: 50px;
        background-image: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/03098cb323a0263fdbbb102c696433c5.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50px;
        left: 10px;
        bottom: 10px;
        position: absolute;
        .badage{
          width: 16px;
          height: 16px;
          background-color: red;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 16px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .total-price{
        font-size: 20px;
        color: #fff;
        margin-left: 70px;
        line-height: 50px;
        .unit{
          font-size: 14px;
        }
      }
    }
    .settle-btn{
      background-color: #f8c74e;
      padding: 0 30px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
