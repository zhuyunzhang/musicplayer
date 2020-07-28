import Vue from 'vue'
import App from './App'
import * as navTo from '@/api/navTo.js'
import PubFuc from'./publicjs/common'
Vue.config.productionTip = false
Vue.prototype.$navTo = navTo
App.mpType = 'app'

Vue.prototype.$pubFuc = PubFuc
const app = new Vue({
    ...App
})
app.$mount()
