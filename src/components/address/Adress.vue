<template>
    <div>
        <mt-nav-bar leftArrowStyle="black" title="地址列表" bgc="white"></mt-nav-bar>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
        />
    </div>
</template>
<script>
import MtNav from '../common/MtNav'
import { AddressList } from 'vant';
import MyAddressEdit from "./MyAddressEdit"
import Address from "../../utils/address"
export default {
    name:"Address",
    data(){
        return{
            chosenAddressId:null,
            list:null
        }
    },
    mounted() {
        console.log(this.chosenAddressId)
       

       this.list=this.$store.state.addressList
       // this.$toast.loading()
        this.$http.getAddress().then(res =>{
            console.log(res)
         //  this.$toast.clear()
           var addresslist = res.data
       
           for (var index=0;index<addresslist.length;index++){
               var address = Address.convertToFront(addresslist[index])
               addresslist[index]  = address
               if (address.isDefault==true ){
                    this.chosenAddressId = address.id      
               }
           }
           this.list =addresslist
       
         
       }).catch(err =>{
           this.$toast.fail(err)
       })
       this.chosenAddressId = this.$store.state.address.id
    },
    methods: {
        onAdd(){
            this.$router.push("/address/add")
        },
        onEdit(content){
            this.$store.commit("AddressSet",content)
            this.$router.push("address/edit")
        },
        onSelect(content){
            this.$store.state.defaultaddress = content.id
            this.$store.state.address.id = content.id
            this.$store.state.address.name = content.name
            this.$store.state.address.tel = content.tel
            this.$store.state.address.province = content.province
            this.$store.state.address.city = content.city
            this.$store.state.address.addressDetail = content.addressDetail
            this.$store.state.address.areaCode = content.areaCode
            this.$store.state.address.isDefault = true
            this.$store.state.address.address = content.address
            const address_ = Address.convertToServer(this.$store.state.address)
            this.$http.updateAddress(address_.id,address_).then(res =>{
                console.log(res)
            })
          //  this.$store.commit("AddressSet",content)
            this.$router.push("/submit")
         
        },
    },
    components:{
        [MtNav.name]:MtNav,
        [AddressList.name]:AddressList,
        [MyAddressEdit.name]:MyAddressEdit
    }


}
</script>

<style scoped>
    
</style>