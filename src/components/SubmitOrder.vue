<template>
<div class="so-container">
  <mt-nav-bar leftArrowStyle="white" title="确认订单"></mt-nav-bar>
  <van-cell-group>
    <van-cell title="请选择收货地址" icon="location-o" is-link to="/address">
      <template slot="title">
        <div class="user-info">
          <!-- <span>{{address.name}}</span> -->
          <span>{{address.name+" "+address.tel}}</span>
        </div>
        <div class="address-info">
         {{address.province+" "+address.city+" "+address.addressDetail}}
        </div>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="肯德基" border>
    <van-cell v-for="goods in goodsList" :key="goods.name">
        <template slot="title">
            <div class="goods-group">
                <div class="thumbnail-group">
                    <img :src="goods.picture" alt="">
                </div>
                <div class="info-group">
                    <div class="title-group">
                        <span>{{goods.name}}</span>
                        <span>¥{{goods.price}}</span>
                    </div>
                    <div class="number">份*{{goods.count}}</div>
                </div>
            </div>
        </template>
    </van-cell>
  </van-cell-group>
  <van-submit-bar
    :price="totalPrice*100"
    button-text="提交订单"
    @submit="onSubmit"
  />
</div>
</template>

<script type="text/ecmascript-6">
import MtNav from "./common/MtNav"
import { Cell, CellGroup,SubmitBar } from 'vant';
// import Address from "../utils/address"
import Address from '../utils/address'
export default {
 
  name: "SubmitOrder",
  data() {
    return {
      goodsList: [],
      address: [
          {}
      ]
    }
  },
  components: {
    [MtNav.name]: MtNav,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SubmitBar.name]: SubmitBar
  },
  computed: {
    totalPrice(){
      let total = 0
      for(let goods of this.goodsList){
        total += goods.price*goods.count
      }
      return total
    }
  },
  mounted(){
    this.goodsList = this.$store.state.goodsList

    let selectedAddress = this.$store.state.address
    let id = this.$store.state.address.id
    console.log("selectet = ",selectedAddress)
    if(id){
      this.address = selectedAddress
    }else{
      this.$http.getDefaultAddress().then(res => {
        console.log(res)
        this.address = Address.convertToFront(res.data)
      })
    }
   
  },
  methods: {
    onSubmit(){
      this.$toast.loading("正在支付")
      const goods_list = []
      for(let goods of this.goodsList){
        goods_list.push(goods.id)
      }
      let data ={
        goods_id_list: goods_list,
        address_id: this.address.id
      }
      console.log("data=",data)
      this.$http.createOder(data).then(res => {
        const pay_url = res.data.pay_url
        window.location = pay_url
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.goods-group{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #F8F8F8;
    .thumbnail-group{
      width: 55px;
      height: 55px;
      min-width: 55px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info-group{
      flex: 1;
      padding-left: 10px;
      .title-group{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
      }
    }
}
</style>