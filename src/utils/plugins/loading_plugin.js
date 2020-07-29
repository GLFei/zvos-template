import Vue from 'vue'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'

//todo:扩展程notice plugin
//todo:封装show close
export default {
    install: function() {
        //let opts = Object.assign({} , opts);
        Vue.prototype.$loading = Loading;

        let _notify = undefined;
        Vue.prototype.$notify = function(opts) {
            if (typeof _notify !== 'undefined') {
                return false;
            }

            let _closeCB = opts.onClose;
            let _opts = {
                onClose: function() {
                    if (typeof _closeCB == 'function') {
                        _closeCB();
                    }
                    _notify = undefined;
                }
            }

            let _options = Object.assign({}, opts, _opts, )
            _notify = Notification(_options);

        }
    }
}