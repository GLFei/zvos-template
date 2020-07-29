/**
 * Created by whobird on 2018/7/12.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
import store from '@/store/index'
import tokenService from '@/utils/services/token_service'
import moduleRoutes from "./module_routes"
import Tips from "@/utils/utils/Tips";
//import store from '@/store/index'
//import eventBus from "@/utils/services/event_service"
import httpService from "@/utils/services/http_service"

import NProgress from 'nprogress' // progress bar

NProgress.configure({ showSpinner: false }) // NProgress Configuration

export const CombinRoutes = [...moduleRoutes, ...routes];

Vue.use(VueRouter);


function fetchAuthority(next) {
    httpService.get('/app/user/v1/basMenu/getUserButton', {}).then(function(res) {
        if (res.status == 200) {
            let data = res.data;
            if (data.code == '0000') {
                window.console.log('getUserButton', data);
                store.commit("SET_AUTHREADY", {
                    authReady: true
                });
                window.console.log("next----------------------");
                // store.dispatch("authority/setAuthority", data.data)
                store.commit("authority/SET_AUTHORITY", data.data);
                window.console.log('stroe', store)
                next();

            } else if (data.code == 'GW.360') {
                //todo:判断网路错误 or 未登录
                // 响应错误
                window.console.error(data.msg);

            } else {
                Tips.notify({
                    type: "error",
                    title: '获取用户权限信息失败',
                    message: data.msg,
                })
            }
        } else {
            window.console.log('error get account!');
            return false;
        }
    })
}

const router = new VueRouter({
    routes: CombinRoutes,
    // scrollBehavior(to, from, savedPosition) {
    scrollBehavior() {
        /*  if (savedPosition) {
              return savedPosition
          } else {
              return { x: 0, y: 0 }
          }*/
        if (document.getElementById("el-main")) {
            document.getElementById("el-main").scrollTop = 0;
        }

        return { x: 0, y: 0 }

    }
});

store.registerModule('zvos', {
    state: {
        scrollTop: 0,
        isLoading: false,
        direction: 'forward'
    },
    mutations: {
        updatePosition(state, payload) {
            state.scrollTop = payload.top
        },
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        }
    },
    actions: {
        updatePosition({ commit }, top) {
            commit({ type: 'updatePosition', top: top })
        }
    }
});

router.beforeEach(function(to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true });
    NProgress.start() // start progress bar

    let _token = tokenService.getToken();
    //如果已经登录，避免重复登录
    if (store.state.login == true || typeof _token !== 'undefined') {
        let loginRouteArray = ['login', 'register', 'forgetPassword', 'sendSmsCode', 'resetPassword', 're-login'];
        if (loginRouteArray.indexOf(to.name) !== -1) {
            next({
                path: "/home"
            });
        }
    }

    //todo:路由跳转改成token判断
    if (to.matched.some(record => record.meta.needLogin)) {
        if (typeof _token == 'undefined') {
            store.dispatch('logout')
            store.dispatch('delAllViews')
        } else {
            if (!store.state.authReady) {
                //todo:这里具体根据业务重构回调方式
                fetchAuthority(next);
                // store.dispatch('GenerateRoutes', {})
                /*   fetchAuthority(
                       function (){
                           store.dispatch('GenerateRoutes', {  }).then(accessRoutes => {
                               // 根据roles权限生成可访问的路由表
                               //router.addRoutes(accessRoutes) // 动态添加可访问路由表
                               next() // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                           })
                       }
                   )*/
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

router.afterEach(function() {
    store.commit('updateLoadingStatus', { isLoading: false })
    NProgress.done() // end progress bar
});

export default router;
