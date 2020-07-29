import Mock from 'mockjs';
import { success_res } from "./config"
// 按钮权限
const USET_BUTTON = {
    "home_page":{"help_file_del": true,"help_file_down": true,"help_file_add": true,"show_statistics": true,"help_file_edit": true},
    "test_list":{"batch_mark": true,"add": true,"sim_cancell": true,"modify": true,"batch_logout": true,"query": true,"batch_import": true,"delete": true,"export": true,"mark": true},
    "test_log":{"query": true,"export": true},
    
    "group":{"add": true,"modify": true,"query": true,"delete": true,"export": true},
    "user_list":{"add": true,"modify": true,"query": true,"forbidden": true,"reset_pwd": true,"login": true,"export": true},
    "unit":{"add": true,"modify": true,"query": true,"up_logo": true,"delete": true,"export": true},
    "user_opt_log":{"query": true,"export": true},
    "role_list":{"add": true,"modify": true,"permission_assignment": true,"query": true,"delete": true,"export": true},
}


export default {
    // 登录
    login: () => {
        return {
            code: "0000",
            msg: "success",
            data: "admin"
        }
    },
    // 退出
    loginOut: () => {
        return {
            code: "0000",
            msg: "success",
            data: "admin"
        }
    },
    // 获取按钮权限
    getUserButton: {
        code: "0000",
        msg: "success",
        data: USET_BUTTON
    },
    // 获取用户信息
    getUser: () => {
        return success_res({"latestLoginTime":"2020-07-27 09:07:13","roleId":2001209,"inputTime":"2019-11-27 15:36:04","userId":1000115,"loginCount":26,"trueName":"果果","userState":100401,"loginName":"00751152","delState":0,"unitId":3000122,"expireDate":"2029-01-01","inputMan":"admin","regionId":1000158,"unitName":"中联重科","regionName":"所有大区","userStateName":"正常","roleName":"系统管理-开发","admin":false})
    },
    // 获取用户菜单
    getUserMenu: () => {
        return success_res({
            items: [
                {
                    menuEnText: "home_page",
                    menuId: 1,
                    menuLevel: 1,
                    menuText: "首页",
                    parentId: 0,
                },
                {
                    menuEnText: "test",
                    menuId: 2,
                    menuText: "测试管理",
                    parentId: 0,
                    children: [
                        {
                            menuEnText: "test_list",
                            menuId: 2001,
                            menuText: "测试列表",
                            parentId: 2,
                            remark: "测试基本信息"
                        }, {
                            menuEnText: "test_log",
                            menuId: 2002,
                            menuText: "测试日志",
                            parentId: 2,
                        }
                    ]
                },
                {
                    menuEnText: "user",
                    menuId: 3,
                    menuText: "用户管理",
                    parentId: 0,
                    children: [
                        {
                            menuEnText: "user_list",
                            menuId: 3001,
                            menuText: "用户列表",
                            parentId: 3,
                        },
                        {
                            menuEnText: "role_list",
                            menuId: 3002,
                            menuText: "角色列表",
                            parentId: 3
                        },
                        {
                            menuEnText: "user_opt_log",
                            menuId: 3003,
                            menuText: "用户日志",
                            parentId: 3
                        }
                    ]
                }
            ]
        })
    },

    // 获取用户详情信息
    userInformation: () => {
        return success_res(Mock.mock({
            expireDate: "@date",
            inputTime: "@datetime",
            loginName: "@string('number', 5)",
            regionName: "所有大区",
            roleId: "@string('number', 5)",
            roleName: "系统管理",
            trueName: "@cname",
            unitId: 1,
            unitName: "顶级机构",
            userId: "@string('number', 5)",
        }))
    }
}
