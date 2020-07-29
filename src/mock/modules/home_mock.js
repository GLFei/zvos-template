import Mock from "mockjs";
import { success_res } from "./config"

export default {
  // 获取最近访问地址
  getNewVisitMenutList: () => {
    return success_res(Mock.mock([
      {
        inputTime: "@datetime",
        menuEnText: "test_list",
        menuId: 2001,
        menuText: "测试列表",
        menuenType: 0,
        parentId: 2,
      }
    ]))
  },
  // 已上传的文档
  attachment: () => {
    return success_res(
      Mock.mock({
        'array|1-10': [{
          attType: "image/png",
          content: "5555123",
          delState: 0,
          'id|+1': 1,
          inputTime: "@datetime",
          intputMan: "@string('number', 5)",
          title: "@ctitle",
          url: ""
        }]
      }).array
    )
  },
  // 统计信息
  statistics: () => {
    return success_res(Mock.mock({
      alarmed: "@integer(0, 10000)",
      locked: "@integer(0, 10000)",
      notWorking: "@integer(0, 10000)",
      offline: "@integer(0, 10000)",
      online: "@integer(0, 10000)",
      total: "@integer(0, 10000)",
      unlocked: "@integer(0, 10000)",
      working: "@integer(0, 10000)",
    }))
  },
}    