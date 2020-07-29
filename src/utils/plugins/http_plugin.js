import axios from 'axios'


/**
 * import HttpPlugin from '@/plugins/http_plugin'
 * Vue.use(HttpPlugin)
 *
 * Vue.http.post('/api').then()
 *
 * export default {
      created () {
        this.$http.post('/api').then(({data}) => {
        })
      }
    }
 */

export default {
    install (Vue) {
        Vue.prototype.$http = axios
        Vue.http = axios
    },
    $http: axios
}

export const $http = axios