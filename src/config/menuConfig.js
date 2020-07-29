let menuHomePage = {
    name: "首页",
    icon: "zv-icon-home",
    url: "/home",
    isShow: true,
    code: "home_page"
};

let menuData = {
    name: "ZVOS Menu",
    children: [
        menuHomePage,
        {
            name: "测试管理",
            icon: "zv-icon-sim",
            url: "/test",
            isShow: true,
            code: "test",
            children: [{
                    name: "测试列表",
                    url: "/test/list",
                    isShow: true,
                    code: "test_list",
                },
                {
                    name: "测试日志",
                    url: "/test/log",
                    isShow: true,
                    code: "test_log"
                }
            ]
        },
        {
            name: "用户管理",
            icon: "zv-icon-user",
            url: "/usermanage",
            isShow: true,
            code: "user",
            children: [{
                    name: "用户列表",
                    url: "/usermanage/list",
                    isShow: true,
                    code: "user_list"
                },
                {
                    name: "角色列表",
                    url: "/usermanage/roles",
                    isShow: true,
                    code: "role_list"
                },
                {
                    name: "用户日志",
                    url: "/usermanage/userlog",
                    isShow: true,
                    code: "user_opt_log"
                }
            ]
        }
    ]
};

export default menuData