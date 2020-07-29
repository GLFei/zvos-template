import Layout from "@/views/layout/Layout.vue"

const module_usermanage = [{
    path: '/usermanage',
    component: Layout,
    children: [{
        path: 'list',
        name: "userList",
        component: () =>
            import ('@/views/user-manage/List'),
        meta: {
            title: '用户列表',
            needLogin: true
        }
    },{
        path: 'roles',
        name: 'Roles',
        component: () =>
            import ('@/views/user-manage/Roles'),
        meta: {
            title: '角色列表',
            needLogin: true
        }
    },{
        path: 'userlog',
        name: "userlog",
        component: () =>
            import ('@/views/user-manage/UserLog'),
        meta: {
            title: '用户日志',
            needLogin: true
        }
    }]
}]

export default module_usermanage;