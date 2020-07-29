import Vue from 'vue'
import router from '@/router'
import store from '@/store/index'
import ElementUI from 'element-ui';
//import elmToZv from './eleToZv'

import api from '@/utils/api'
import lodash from '@/utils/tools/lodash'
import commonFunc from '@/utils/tools/common'
import LoadingPlugin from '@/utils/plugins/loading_plugin'
import HttpPlugin from "@/utils/plugins/http_plugin"
import HttpService from "@/utils/plugins/http_service_plugin"
import enums from '@/utils/enums'

import {formatDate} from '@/utils/utils/moment'
import '@/utils/filters'
import './components/global'
import './utils/plugins/vue-amap'
import md5 from 'js-md5'

import "normalize.css"
import "@/static/css/nprogress.css"
import "@/static/css/fonts.css"
import "@/static/less/common.less"
//import 'element-ui/lib/theme-chalk/index.css'
import "@/static/sass/element-variables.scss"
import "@/static/fonts/iconfont.css"

// import {BaseUrl} from "./main_config"

import App from './App.vue'

// 关闭生产环境的调试信息
const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;
Vue.prototype.$_ = lodash
Vue.prototype.$api = api
Vue.prototype.$enums = enums
Vue.prototype.$commFunc = commonFunc
Vue.prototype.$md5 = md5

// simulation data
if (process.env.VUE_APP_NODE_ENV === 'mock') {
    require('./mock') // simulation data
}

window.Date.prototype.$Format = formatDate

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
//Vue.use(elmToZv);
Vue.use(LoadingPlugin);
Vue.use(HttpPlugin);
Vue.use(HttpService);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
