import Layout from "@/views/layout/Layout.vue"
const module_testmanage = [{
    path: '/test',
    component: Layout,
    children: [{
            path: 'list',
            name: "list",
            component: () =>
                import ('@/views/test/List'),
            meta: {
                title: '测试列表',
                needLogin: true
            }
        },
        {
            path: 'log',
            name: 'log',
            props: true,
            component: () =>
                import ('@/views/test/Log'),
            meta: { title: '测试日志', needLogin: true }
        }
    ]
}, ]
export default module_testmanage;