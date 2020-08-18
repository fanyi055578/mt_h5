<template>
<div>
<div class="login-container"  v-if="show">
  <div class="logo-group"></div>
  <div class="form-group">
    <van-cell-group>
      <van-field  center clearable placeholder="请输入手机号" v-model="telephone">
        <van-button slot="button" size="small" type="default" plain @click="sendSmsCode">{{sendtext}}</van-button>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field  placeholder="请输入短信验证码" v-model="smscode"></van-field>
    </van-cell-group>
    <van-button type="primary" class="submit-btn" block @click="onLogin">登录</van-button>
  </div>
</div>
<mine v-else></mine>
</div>
</template>

<script type="text/ecmascript-6">
import {Field,CellGroup,Button,Toast} from "vant"
import Mine from "./Mine"
import axios from "axios"
export default {
  name: "Login",
  data() {
    return {
        telephone:"",
        sendtext:"发送验证码",
        show:true,
        smscode:""
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Toast.name]:Toast,
    [Mine.name]:Mine
  },
  computed: {
    
    
  },
  mounted(){
    this.show = this.$store.isLogin
  },
  methods: {
       sendSmsCode(){
      const that = this;
      this.$http.getSMSCode(this.telephone).then(res => {
        Toast("验证码发送成功")
        console.log(res)
        that.timeout = 60;
        const interval = setInterval(() => {
          that.timeout--;
          that.sendtext = that.timeout + "s后重新发送"
          if(that.timeout == 0){
            clearInterval(interval)
            that.sendtext = "发送验证码"
          }
        }, 1000);
      })
    },
    onLogin(){
    
       axios.post('http://111.231.107.198:8000/login',{
        telephone: this.telephone,
        smscode: this.smscode
    }).then(res =>{
        this.$toast.success("登录成功")
        const data = res.data
        const token = data.token
        const user = data.user
        this.$auth.setUserToken(user,token)
        this.$store.isLogin = false
        const from = this.$route.query['from']
        if(from){
          this.$router.push(from)
        }else{
          this.$router.replace('/')
        }
    }).catch(err =>{
        Toast('短信验证码错误')
        console.log(err)
    })
    }
    
   
    
  }
}
</script>

<style scoped lang="scss">
.login-container{
  .logo-group{
    width: 100%;
    height: 200px;
    background-image: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/7a5ff05b334e0debdd10954a7f5d4789.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 66px; 
  }
  .form-group{
    padding: 0 20px;
  }
  .submit-btn{
    margin-top: 20px;
  }
}
</style>