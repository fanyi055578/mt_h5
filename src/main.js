import Vue from 'vue'
import App from './App.vue'
import "lib-flexible"
import router from "./routes"
import store from "./store"
import http from "./utils/http"
import auth from "./utils/auth"
import toast from "./utils/Toast"

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$auth = auth
Vue.prototype.$toast = toast

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
