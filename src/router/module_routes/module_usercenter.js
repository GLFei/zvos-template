import Layout from "@/views/layout/Layout.vue"
import LayoutSolo from "@/views/layout/LayoutSolo.vue"
const module_usercenter= [
    {
        path: '/usercenter',
        component: Layout,
        children: [
            {
                path: '',
                name:"usercenter",
                component: () => import('@/views/user-center/UserCenter'),
                meta: { title: '个人中心',needLogin:true}
            }
        ]
    },

    {
        path: '/usercenter',
        component: LayoutSolo,
        children: [
             {
                path: 'update_password',
                name: 'updatePassword',
                props:true,
                component: () => import('@/views/user-center/UpdatePassword'),
                meta: { title: 'update password',needLogin:true }
            },   {
                path: 'bind_cellphone',
                name: 'bindCellphone',
                component: () => import('@/views/user-center/BindCellphone'),
                meta: { title: 'Bind Cellphone', needLogin:true }
            },{
                path: 'bind_email',
                name: 'bindEmail',
                component: () => import('@/views/user-center/BindEmail'),
                meta: { title: 'Bind Email', needLogin:true }
            },
        ]
    },
]
export default module_usercenter;