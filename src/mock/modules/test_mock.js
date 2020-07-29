import Mock from "mockjs";
import { success_res } from "./config"

export default {
  // 测试列表
  list: () => {
    return success_res(Mock.mock({
      'items|1-10': [
        {
          id: "@string('number', 5)",
          imsi: "",
          inputMan: "@string('number', 5)",
          inputManName: "王荣",
          inputTime: "@datetime",
          issueDate: "@date",
          planType: "@string('number', 5)",
          planTypeName: /(SIM套餐1)|(300条短信)/,
          simCarrier: "@string('number', 5)",
          simCarrierName: "中国联通",
          simNo: '13' + "@string('number', 9)",
          simStatus: "@string('number', 9)",
          simStatusName: "单卡（新卡）",
          simSupplier: "@string('number', 9)",
          simSupplierName: "中国移动",
          simType: "@string('number', 9)",
          simTypeName: "常规SIM卡",
          unitId: 1,
          unitName: "顶级机构",
        }
      ],
      total: 10
    }))
  },
  // 测试日志
  log: () => {
    return success_res(Mock.mock({
      'items|1-10': [{
        content: "SIM卡列表/新增:SIM卡号:1440489139124/操作成功",
        id: "@string('number', 9)",
        inputMan: "admin",
        inputManName: "admin",
        inputTime: "@datetime",
        logTypeId: 1,
        menuId: 2001,
        menuText: /(测试列表)|(测试日志)/,
        resourceId: "@string('number', 9)",
        resourceText: /(查询)|(修改)/,
        simNo: '13' + "@string('number', 9)",
        userLogId: "@string('number', 9)",
      }],
      total: 10
    }))
  },

  baseMenuList: () => {
    return success_res({
      checked: [],
      items: [{
        inputMan: "@string('number', 5)",
        inputTime: "@datetime",
        menuEnText: "home_page",
        menuId: 1,
        menuLevel: 1,
        menuText: "首页",
        menuenType: 0,
        parentId: 0,
        rank: 1
      }]
    })
  }
}    