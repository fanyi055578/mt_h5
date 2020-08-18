import axios from "axios"
import auth from "./auth"


const BASE_URL = 'http://111.231.107.198:8000'

class Http {
  constructor() {
    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 60000,
     
    });

    // 请求之前的拦截器，用来设置JWT
    this.http.interceptors.request.use(config => {
      const token = auth.token
      if(token){
        config.headers.common.Authorization = "JWT " + token 
      }
    //  
      return config
    })

    //响应之后的拦截器
    this.http.interceptors.response.use(response => {
      return response
    },err => {
      console.log(err.response)
      return Promise.reject(err)
    })
  }


  getMerchants(page=1){
    const url = "/merchant/?page="+page
    return this.http.get(url)
  }

  searchMerchants(keyword){
    const url = "/search?q=" + keyword
    return this.http.get(url)
  }

  getMerchantDetail(category_id){
    const url = "/merchant/"+ category_id + "/"
    return this.http.get(url)
  }

  getCategory(category_id){
    const url = "/category/" + category_id
    return this.http.get(url)
  }

  getSMSCode(tel){
    const url = "/gen_code?tel=" + tel
    return this.http.get(url)
  }

  login(data){
    const url = "/login"
    return this.http.post(url,data)
  }

  getAddress(){
    const url = "/address/"
    return this.http.get(url)
  }

  getDefaultAddress(){
    const url = "/address/default"
    return this.http.get(url)
  }

  addAddress(data){
    const url = "/address/"
    return this.http.post(url,data)
  }

  updateAddress(address_id,address){
    const url = "/address/"+address_id + "/"
    return this.http.put(url,address)
  }
    
  createOder(data){
    const url = "/order"
    return this.http.post(url,data)
  }
}

export default new Http()