import VueRouter from "vue-router"
import Vue from "vue"
import Home from "./components/Home"
import Login from "./components/Login"
import Merchant from "./components/merchants/Merchant"
import Address from "./components/address/Adress"
import Order from "./components/order/Order"
import SubmitOrder from "./components/SubmitOrder"
import MyAddressEdit from "./components/address/MyAddressEdit"
import auth from "./utils/auth"

Vue.use(VueRouter)


const router = new VueRouter({
    routes:[
        {path:"/",component:Home,name:"home",meta:{authRequire:true}},
        {path:"/login",component:Login,name:"login"},
        {path:"/merchant/:merchant_id",component:Merchant,name:"merchant",meta:{authRequire:true}},
        {path:"/submit",component:SubmitOrder,name:"submit",meta:{authRequire:true}},
        {path:"/address",component:Address,name:"address",meta:{authRequire:true}},
        {path:"/order",component:Order,name:"order",meta:{authRequire:true}},
        {path:"/address/add",component:MyAddressEdit,name:"address_add",meta:{authRequire:true}},
        {path:"/address/edit",component:MyAddressEdit,name:"address_edit",meta:{authRequire:true}},
    ]
})

router.beforeEach((to,from,next) => {
    if(to.meta.requireAuth && !auth.is_authed){
      next({
        "name": "login",
        "query": {
          "from": to.path
        }
      })
    }else{
      next()
    }
  })
    
export default router