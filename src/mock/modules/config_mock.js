import Mock from "mockjs"
import { success_res } from "./config"
export default {
  // 获取用户机构
  getUserUnit: () => {
    return success_res(Mock.mock({
      inputMan: "admin",
      inputManName: "系统管理员",
      inputTime: "@datetime",
      path: "/",
      punitId: 0,
      unitId: "1",
      unitLevel: 1,
      unitName: "顶级机构"
    }))
  },
  select: () => {
    let data = {
      items: [
        {
          punitId: 0,
          unitId: 1,
          unitName: "顶级机构",
          children: Mock.mock({
            'array|1-10': [{
              punitId: 1,
              'unitId|+1': 2,
              unitName: '一级机构' + '@cword',
              children: Mock.mock({
                'array|1-10': [{
                  'punitId|+1': 2,
                  'unitId|+1': 2,
                  unitName: '二级机构' + '@cword',
                }]
              }).array
            }]
          }).array
        }
      ]
    }
    return success_res(data)
  },
  selectDicAll: () => {
    let data = Mock.mock({
      'items|1-10': [
        {
          'dicCode|+1': 1,
          'dicId|+1': 1,
          dicName: "@ctitle",
          'pdicId|+1': 1
        }
      ]
    })
    return success_res(data)
  }
}    