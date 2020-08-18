import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store   = new Vuex.Store({
    // ...
    state:{
        count:20,
        goodsList:[],
        address:{},
        defalteaddress:{},
        isLogin:false,
        addressList:[
        //     {   addressDetail: "asdwad",
        //     areaCode: "150102",
        //     city: "呼和浩特市",
        //     country: "",
        //     county: "新城区",
        //     isDefault: true,
        //     name: "fy",
        //     postalCode: "",
        //     province: "内蒙古自治区",
        //     tel: "13363523163",
        // },
        // {   addressDetail: "asdwad",
        //     areaCode: "150102",
        //     city: "呼和浩特市",
        //     country: "",
        //     county: "新城区",
        //     isDefault: true,
        //     name: "yjm",
        //     postalCode: "",
        //     province: "内蒙古自治区",
        //     tel: "13363523163",
            
        // },
        // {
        //     addressDetail: "asdwad",
        //     areaCode: "150102",
        //     city: "呼和浩特市",
        //     country: "",
        //     county: "新城区",
        //     isDefault: true,
        //     name: "lq",
        //     postalCode: "",
        //     province: "内蒙古自治区",
        //     tel: "13363523163",
        // },
        ],
    },
    mutations:{
        GoodsSetter(state,goodsList){
            
            state.goodsList=goodsList
        },
        GoodsClear(state){
            console.log(state)
            state.goodsList=[]
        },
        AddressSet(state,address){
            state.address=address
        },
        AddressClear(state){
            state.address={}
        },
        AddAddressList(state,address){
            state.addressList.push(address)
        },
        UpdateAddressList(state,address){
            for(let index in state.addressList){
                if (state.addressList[index].tel==address.tel){
                    state.addressList[index]=address
                }
            }
        },
        DelAddressList(state,index){
            console.log(index)
        }
    }
}) 
    

export default store