/**
 * Created by whobird on 2019/1/11
 */
import Layout from "@/views/layout/Layout.vue"
import LayoutAuth from "@/views/layout/LayoutAuth.vue"

const routes = [{
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
                path: 'home',
                name: 'home',
                component: () =>
                    import ('@/views/Home'),
                meta: {
                    needLogin: true,
                    title: '首页',
                    affix: true,
                    keepAlive: false
                }
            }

        ]
    },
    {
        path: '/',
        component: Layout,
        children: [{
                path: 'about',
                name: 'about',
                component: () =>
                    import ('@/views/Construction'),
                meta: { title: '关于我们', icon: 'nav-home' }
            }, {
                path: 'noauth',
                name: 'noAuth',
                component: () =>
                    import ('@/views/NoAuth'),
                meta: { title: '无访问权限', icon: 'nav-home' }
            },

        ]
    },
    {
        path: '/',
        name: 'authLayout',
        component: LayoutAuth,
        children: [{
                path: 'login',
                name: "login",
                component: () =>
                    import ('@/views/auth/Login'),
                meta: {
                    title: '登陆'
                },
            },
            {
                path: 'register',
                name: 'register',
                meta: {
                    title: '注册'
                },
                component: () =>
                    import ('@/views/auth/Register'),
            },

            {
                path: 'auth',
                name: 'auth',
                meta: {
                    title: '授权',
                    needLogin: true
                },
                //component: HelloVux
                component: () =>
                    import ('@/views/auth/Authorize'),
            },
            {
                path: 'forget-password',
                name: 'forgetPassword',
                meta: {
                    title: '忘记密码'
                },
                //component: HelloVux
                component: () =>
                    import ('@/views/auth/ForgetPassword'),
            },
            {
                path: 'send-sms-code',
                name: 'sendSmsCode',
                meta: {
                    title: '忘记密码'
                },
                //component: HelloVux
                component: () =>
                    import ('@/views/auth/SendSmsCode'),
            },

            {
                path: 'reset-password',
                name: 'resetPassword',
                meta: {
                    title: '重设密码',
                },
                //component: HelloVux
                component: () =>
                    import ('@/views/auth/ResetPassword'),
            },

            {
                path: 're-login',
                name: 're-login',
                meta: {
                    title: '重新登陆',
                },
                //component: HelloVux
                component: () =>
                    import ('@/views/auth/ReLogin'),
            },

        ]
    },
    {
        path: '/',
        component: Layout,
        children: [{
                path: '*',
                name: 'page_404',
                component: () =>
                    import ('@/views/404'),
                meta: { title: '404 not found' }
            }

        ]
    },
    /*
    {
        path: '*',
        name: '404',
        meta: {
            title: '建设中'
        },
        //component: HelloVux
        component:() => import('@/views/404'),
    }
    */
]
export default routes;
