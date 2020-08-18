
<style scoped>
.van-dropdown-menu >>> .van-dropdown-menu__title{
  color: #767676;
}
.van-dropdown-menu__item{
  font-size: 14px;
  color: #767676;
}
</style>

<template>
    <div id="app">
    <div class="header">
        <div class="header-bar">
            <i class="iconfont icon-dingwei"></i>
            <span>搜索商家</span>
            <i class="iconfont icon-jiantou"></i>
        </div>
        <div class="search-bar">
            <van-search value="" placeholder="请输入搜索关键词" v-model="key" @input="onInput" :clearable="true" @clear="onClear"/>
        </div>
    </div>
    <div class="main-body">
        <h2 class="list">商家列表</h2>
      <van-dropdown-menu>
        <van-dropdown-item v-model="sort" :options="sorts"></van-dropdown-item>
        <van-dropdown-item :value="sort1" disabled  :options="sorts2" />
        <van-dropdown-item :value="sort2" disabled  :options="sorts2" />
        <van-dropdown-item :value="sort3" disabled  :options="sorts2" />       
      </van-dropdown-menu>
        <div class="mt" ref="merchants" :style="mainHeightStyle">
            <div class="main">
                 <div class="merchant-list" v-for="merchant in Merchant_list" :key="merchant.id">
            <router-link :to="'/merchant/'+merchant.id" >
                <div class="merchant-item">
                <img :src="merchant.logo" alt="" class="logo">
                <div class="merchant-info">
                    <div class="merchant-name">{{merchant.name}}</div>
                    <div class="rate-group">
                        <van-rate size="12" v-model="rate"></van-rate>
                    </div>
                    <div class="tag-group">
                        <van-tag plain>美团专送</van-tag>
                        <van-tag plain>家常菜</van-tag>
                    </div>
                </div>
                    </div>
                    </router-link>
                </div>
            </div>           
        </div>
    </div>
</div>
</template>

<script>
import {Search,DropdownMenu,DropdownItem,Rate,Tag} from "vant"
import BScroll from "better-scroll"
export default {
    name:"Home",
    data(){
        return{
            sort:0,
            sort1:0,
            sort2:1,
            sort3:2,
            sorts:[
                {text:"默认排序",value:0},
                {text:"距离优先",value:1},
                {text:"好评优先",value:2},
                {text:"评分优先",value:3}
            ],
            sorts2:[
                {text:"距离最近",value:0},
                {text:"品质联盟",value:1},
                {text:"筛选",value:2},
            ],
            rate:8,
            merchants:[],
            scroll:null,
            page:1,
            fn:null,
            searchmerchants:[],
            key:''
        }
    },
    computed:{
          mainHeightStyle(){
            const leftHeight = 94.8 + 56.8 + 48 +50
            const phoneHeight = 702.64
            const mainHeight = (phoneHeight - leftHeight)/41
            return {"height":mainHeight+"rem"}
    },
    Merchant_list(){
        if (this.searchmerchants.length>0){
            return this.searchmerchants
        }else{
            return this.merchants
        }
    }
    },
    mounted(){
        this.getMerchants(1)
        this.scroll = new BScroll(this.$refs.merchants,{
            scrollY: true,
            click: true,
            pullUpLoad: {
            threshold: 0
        }
        })
        this.scroll.on("pullingUp",() => {
        this.getMerchants(this.page+1)
        })     
    },
    components:{
        [Search.name]:Search,
        [DropdownMenu.name]:DropdownMenu,
        [DropdownItem.name]:DropdownItem,
        [Rate.name]:Rate,
        [Tag.name]:Tag
    },
    watch:{
        key :function(value){
            if (value==""){
                this.searchmerchants = []
            }
        }
    },
    methods:{
        getMerchants(page){
            this.$http.getMerchants(page).then(res =>{
                console.log(res)
                this.searchmerchants = res.data
                this.merchants=this.merchants.concat(res.data.results)
            }).catch(err =>{
                console.log(err)
            })
            this.page = page
        },
        onInput(value){
      if(!this.fn){
        this.fn = this.debounce((value) => {
          if(value){
            this.$http.searchMerchants(value).then(res => {
                console.log(res)
              this.searchmerchants = res.data
            })
          }
        })
      }
      this.fn(value)
    },
    onClear(){
      this.searchmerchants = []
    },
    debounce(fn){
      let timer = null
      return function(value){
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn(value)
        },5000)
      }
    }
    }

}
</script>

<style lang="scss" scoped>
   .header{
      background-color: #1C1B20;
      padding: 20px 14px 10px;


        .header-bar{
        font-size:0.5rem;
        color:white;
        letter-spacing:2px ;
    }

        .search-bar{
            margin-top:10px;

            .van-search{
                 padding:0px 2px;
            }
        }
   }

.mt{
    overflow: hidden;
}

   .main-body{
        overflow:hidden;
       .list{
           font-size:0.5rem;
           padding:0.5rem 0.5rem;
       }
       .merchant-sort{
           

           .van-dropdown-menu__item{
               float:left;
           }
       }
        .merchant-list{
            .merchant-item{
                padding: 10px;
                display: flex;
        .logo{
             width: 85px;
             height: 64px;
      }
        .merchant-info{
            margin-left: 5px;
        .merchant-name{
          font-size: 16px;
          font-weight: 700;
        }
        .rate-group{
          padding-top: 5px;
        }
        .tag-group{
          padding-top: 5px;
          span{
            margin-right: 2px;
          }
        }
      }
    }
   }
}
</style>
