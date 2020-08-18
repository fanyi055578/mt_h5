<template>
    <div class="merchant-container">
        <div class="header-bar">
            <mt-nav-bar leftArrowStyle="white" title="商家详情"></mt-nav-bar>
            <div class="merchant-info">
                <img :src="merchants.logo" class="logo">
                <div class="introduce">
                    <span>20分钟</span> |  <span>1km</span>
                </div>
                  <span class="gonggao">
                    公告：{{merchants.notice}}
                  </span>
            </div>
        </div>

        <div>
            <van-tabs v-model="active" bind:change="onChange">
                <van-tab title="点菜">
                    <div class="menu-bar" :style="height">
                        <div class="left-bar" ref="category">
                            <div class="merchant-list">
                                 <ul  >
                                    <li v-for="(category,index) in categories" :key="category.id" :class='index==currentIndex?"active merchant-detail":"merchant-detail"' @click="computeScroll(index)">{{category.name}}</li>
                                 </ul>
                            </div>
                           
                        </div>
                        <div class="right-bar" ref="goods">
                            <div class="goods_list" >
                                <dl v-for="(category,category_index) in categories" :key="category.name" class="goods-dl">
                                    <dt class="category-name" >{{category.name}}</dt>
                                    <dd v-for="(goods,goods_index) in category.goods_list" :key="goods.id">
                                        <div class="goods-info" @click="show_info(category_index,goods_index)">
                                            <img :src="goods.picture" alt="" class="thumbnail">
                                            <div><span class="goods-name">{{goods.name}}</span></div>
                                            <div ><span class="month-sale">月售10份</span></div>
                                            <div class="goods-info-bottom">
                                                <div class="price">￥{{goods.price}}</div>
                                                <stepper v-model="goods.count"></stepper>
                                            </div>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="评价">
                    内容 2
                </van-tab>
                <van-tab title="商家">
                    内容 3
                </van-tab>
            </van-tabs>
        </div>
        <goods-detail :goods="good"></goods-detail>
        <cart :categories="categories" v-on:clear-all="clearall"></cart>
    </div>
</template>

<script>
import {Tab,Tabs} from 'vant'
import MtNav from "../common/MtNav"
import BScroll from "better-scroll"
import Detail from "./Detail"
import Stepper from "./Stepper"
import Cart from "./Cart"
export default {
    name:"merchant",
    data(){
        return{
            active:0,
            categories:[],
            merchants:{},
            positions:[],
            currentIndex:0,
            good:null,
            value:0,
        }
    },
    components:{
        [MtNav.name]:MtNav,
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
        [Detail.name]:Detail,
        [Stepper.name]:Stepper,
        [Cart.name]:Cart
      
    },
    computed: {
        height:function (){
            var heights= window.innerHeight-46-72-44
            return{
                height:heights+"px"
            }
        }
    },
    methods: {
        clearall(){
         
        for (let category of this.categories){
            for (let goods of category.goods_list){
              
                goods.count = 0
            }
        }
        },
        onClickLeft(){
            this.$router.back()
        },
        computeScroll(index){
           const position = this.positions[index]
           this.goodsScroll.scrollTo(0,-position,500)
        
            this.currentIndex=index
        },
        show_info(category_index,goods_index){
            var cat = this.categories[category_index]
            var goodsDetail = cat.goods_list[goods_index]
          
            this.good = goodsDetail
        },
     
    },
    mounted() {
        this.$nextTick(() => {
      this.menuScroll = new BScroll(this.$refs.category,{
        scrollY: true,
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goods,{
        scrollY: true,
        click: true,
        // 一定要设置probeType为2，才能监听scroll事件
        probeType: 2
      })

      this.goodsScroll.on("scroll",(pos) => {
        const y = Math.abs(pos.y);
        const positions = this.positions;
        for (let index = positions.length-1; index >= 0; index--) {
          const position = positions[index];
          if(y >= position){
            // 8
            // [1,3,5,7,9]
            this.currentIndex = index;
            break
          }
        }
      })
    })

    const merchant_id = this.$route.params.merchant_id
    this.$http.getMerchantDetail(merchant_id).then(res => {
      this.merchants = res.data
    })
    this.$http.getCategory(merchant_id).then(res => {
      const categories = res.data
      for(let category of categories){
        for(let goods of category.goods_list){
          goods.count = 0;
        }
      }
      this.categories = categories
      this.$nextTick(() => {
        const positions = [0];
        let offset = 0;
        const dlList = document.getElementsByClassName("goods-dl");
        // for...in.../for...of...
        // for...in...：用来循环对象
        // for...of...：用来循环数组
        for(let dl of dlList){
          const height = dl.clientHeight;
          offset += height;
          positions.push(offset)
        }
        this.positions = positions;
        this.menuScroll.refresh()
        this.goodsScroll.refresh()
      })
    })
    },
}
</script>

<style lang="scss" scoped>
    .header-bar{
       
        .van-nav-bar{
            background-color:#2e2f3b;
            [class*=van-hairline]::after{
                border:none
            }
            .van-nav-bar__title{
                color:white;
            }
        }
    }

    .merchant-info{
        height:2rem;
        width:100%;
        background-color:#2e2f3b;
        .logo{
            height:100%;
            float:left;
        }
        .introduce{
            font-size:0.4rem;
            color:white;
            padding:0.4rem 0.3rem;
            margin-left:2.6rem;

        }
        .gonggao{
             font-size:0.3rem;
             margin-left:0.2rem;
             color:white;
            //     text-overflow: ellipsis;
            //  white-space: nowrap;
            //  overflow: hidden;
        }
    }

    .menu-bar{
        display:flex;
        .left-bar{
          
            width:2.8rem;
            overflow:hidden;
            .merchant-list{
                overflow:hidden;
                li {
                    
                     &.active{
                    background-color: #ccc;
                        }
                }
                .merchant-detail{
                    overflow:hidden;
                    height:1.7rem;
                    line-height:1.7rem;
                    font-size:0.4rem;
                    text-align:center;
                }
            }
        }
        .right-bar{
            width:100%;
             flex:1;
            height:100%;
        
            overflow:hidden;
            .category-name{
                font-size: 16px;
                height: 32px;
                line-height: 32px;
            }
            .goods_list{
                 display:flex;
               flex-direction: column;
                
                .goods-info{
               
                padding-top:10px;
                height:85px;
              
                    width:100%;
                    .thumbnail{
                    height:75px;
                    width:75px;
                    float:left;
                    }
                    .goods-name{
                        
                        font-size:15px;
                        height:15px;
                        line-height:20px;
                        padding-top:10px;
                        margin-left:8px;
                    }
                    .month-sale{
                        margin-top:10px;
                        font-size:15px;
                        height:20px;
                        line-height:20px;
                        margin-left:8px;
                       
                    }
                    .goods-info-bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                       
                    .price{
                        margin-left:8px;
                        color: #fb4e44;
                        font-size: 16px;
                        font-weight: 700;
            }
          }
                    
                }
            }
        }
    }
</style>

<style scoped>

.merchant-container .van-hairline--bottom::after{
    border: none;
}
    
</style>
