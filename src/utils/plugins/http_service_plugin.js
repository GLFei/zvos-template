import httpService from "@/utils/services/http_service"


let HttpServicePlugin={};

HttpServicePlugin.install=function(Vue, options){

    /**
     *  $http請求
     * @param {*} url  請求地址
     * @param {*} payload 載荷
     * @param {*} config 配置
     */
    Vue.prototype.$request = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        return httpService.request(url,payload,config);
    }

    Vue.prototype.$get = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        return httpService.get(url,payload,config);
    }

    Vue.prototype.$post = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        return httpService.post(url,payload,config);
    }

    Vue.prototype.$put = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        return httpService.put(url,payload,config);
    }

    Vue.prototype.$delete = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        return httpService.delete(url,payload,config);
    }

    Vue.prototype.$upload = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        /**
         *  let payload = new FormData(); //创建form对象
         *   payload.append('file',file);//通过append向form对象添加数据
         *
         *  this.$upload(url,payload);
         */
        return httpService.upload(url,payload,config);
    }

    Vue.prototype.$download = function (url,payload,config) {
        // 逻辑...
        //axios--返回promise
        /**
         *  let payload = new FormData(); //创建form对象
         *   payload.append('file',file);//通过append向form对象添加数据
         *
         *  this.$upload(url,payload);
         */
        return httpService.download(url,payload,config);
    }

}

export default HttpServicePlugin;

