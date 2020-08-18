<template>
<div class="mt-address-edit">
  <mt-nav-bar leftArrowStyle="black" title="添加地址" bgc="white"></mt-nav-bar>
       <van-address-edit
    :area-list="areaList"
    show-delete
    show-set-default
    :address-info="addressInfo"
    @save="onSave"
    @delete="onDelete"
  />
</div>
</template>

<script type="text/ecmascript-6">
import MtNav from '../common/MtNav'
import { AddressEdit } from 'vant';
import areaList from "../../data/area"
import Address from '../../utils/address';
export default {
  name: "MyAddressEdit",
  data() {
    return {
      areaList,
      addressInfo: {}
    }
  },
  components: {

    [MtNav.name]: MtNav,
    [AddressEdit.name]:AddressEdit
  },
  computed: {
   
  
  },
  mounted(){
  
    if(this.$route.name=="address_edit"){
      this.addressInfo = this.$store.state.address
    }
  },
  methods: {
   onSave(content){
      let address =Address.convertToServer(content)
      if(this.$route.name=="address_add"){
          this.$http.addAddress(address).then(res =>{
        
            console.log(res)
            this.$toast.success("添加地址成功！")
            this.$router.back()
          }).catch(err =>{
            this.$toast.fail(err)
          })
          this.$store.commit("UpdateAddressList",content)
          this.$router.back()
      }else{
  
        this.$http.updateAddress(this.addressInfo.id,address).then(res =>{
          
          this.$toast.success("编辑地址成功！")
          this.$router.back()
          console.log(res)
        }).catch(err =>{
          console.log(err)
        })
        // this.$store.commit("AddAddressList",content)
       
      }
      
   },
   onDelete(content){
      console.log(content)
   }
  }
}
</script>

<style scoped lang='scss'>
</style>