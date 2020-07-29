import Mock from "mockjs"
import { success_res } from "./config"
export default {
  // 获取用户日志
  userLog: () => {
    return success_res(Mock.mock({
      'items|1-10': [{
        content: /(失败)|(成功)/,
        logTime: "@datetime",
        loginName: "@string('number', 5)",
        loginTrueName: "@cname",
        menuId: "@string('number', 5)",
        menuText: /(查询)|(删除)|(添加)/,
        optIp: "@integer(0, 255),@integer(0, 255),@integer(0, 255),@integer(0, 255)",
        optResult: "@string('number', 1)",
        parentName: "风控设置",
        regionName: "所有大区",
        unitName: "顶级机构",
        userId: 1,
      }],
      total: 10
    }))
  },
  // 获取用户列表
  userList: () => {
    return success_res(Mock.mock({
      'items|1-10': [{
        admin: "@boolean",
        expireDate: "@date",
        inputMan: "admin",
        inputManName: "admin",
        inputTime: "@datetime",
        latestLoginTime: "@datetime",
        loginCount: "@integer(0,)",
        loginName: "@string('number',5)",
        regionId: "@string('number',5)",
        regionName: "所有大区",
        roleId: "@string('number',5)",
        roleName: /(系统管理员)|(开发人员)|(测试人员)/,
        trueName: "@cname",
        unitId: "@string('number',5)",
        unitName: /(顶级机构)|(一级机构1)/,
        userId: 1
      }],
      total: 10
    }))
  },

  // 获取角色列表
  getRoleList() {
    return success_res(Mock.mock({
      'items|1-10': [{
        currency: 1,
        inputMan: "@string('number',5)",
        inputManName: "果果",
        inputTime: "@datetime",
        regionId: 1000158,
        regionName: "所有大区",
        roleId: "@string('number',5)",
        roleName: "@cword(5)",
        unitId: 1,
        unitName: "顶级机构",
      }],
      total: 10
    }))
  }
}    