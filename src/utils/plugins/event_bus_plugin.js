import Vue from 'vue'

//todo:扩展程notice plugin
//todo:封装show close
export default {
    install:function(){
        //let opts = Object.assign({} , opts);
        Vue.prototype.$event = new Vue();
    }
}