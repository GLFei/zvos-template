import Mock from 'mockjs'
import loginApi from './login_mock'
import homeApi from "./home_mock"
import testApi from "./test_mock"
import configApi from "./config_mock"
import userApi from "./user_mock"

const mockUrl = "http://develop.com"

// 登录相关
Mock.mock(mockUrl + '/app/user/v1/login', 'post', loginApi.login) // 用户登录
Mock.mock(mockUrl + '/app/user/v1/userLoginOut', 'post', loginApi.loginOut) // 用户登录
Mock.mock(mockUrl + '/app/user/v1/basMenu/getUserButton', "get", loginApi.getUserButton) // 获取按钮信息
Mock.mock(mockUrl + '/app/user/v1/user/getUser', "get", loginApi.getUser) // 获取用户信息
Mock.mock(mockUrl + '/app/user/v1/basMenu/getUserMenu', "get", loginApi.getUserMenu) // 获取用户菜单
Mock.mock(mockUrl + "/app/user/v1/user/userInformation", "post", loginApi.userInformation)

// 首页相关
Mock.mock(mockUrl + '/app/user/v1/basMenu/getNewVisitMenutList', "get", homeApi.getNewVisitMenutList) // 获取用户信息
Mock.mock(mockUrl + '/app/user/v1/attachment.list', "get", homeApi.attachment) // 获取用户信息
Mock.mock(mockUrl + '/app/device/v1/vehicle/statistics.count' + "?unitId=3000122", "get", homeApi.statistics) // 获取用户信息

// 测试相关
Mock.mock(mockUrl + "/app/device/v1/sim.list", 'post', testApi.list)
Mock.mock(mockUrl + "/app/device/v1/vehicleOperationLog.list", "post", testApi.log)
Mock.mock(mockUrl + "/app/user/v1/basMenu/list", "post", testApi.baseMenuList)

// 配置相关
Mock.mock(mockUrl + '/app/cfg/v1/basUnit/getUserUnit', "get", configApi.getUserUnit) // 获取用户信息
Mock.mock(mockUrl + "/app/cfg/v1/basUnit/select", 'get', configApi.select) // 获取机构

Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=200864", 'get', configApi.selectDicAll)
Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=201741", 'get', configApi.selectDicAll)
Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=200882", 'get', configApi.selectDicAll)
Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=200569", 'get', configApi.selectDicAll)
Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=101001", 'get', configApi.selectDicAll)
Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=101001&orderMethod=1", 'get', configApi.selectDicAll)
Mock.mock(mockUrl + "/app/cfg/v1/basDictionary/selectDicAll?pdicId=102001", 'get', configApi.selectDicAll)

// 用户相关
Mock.mock(mockUrl + "/app/user/v1/userLog.list", "post", userApi.userLog) // 用户日志
Mock.mock(mockUrl + "/app/user/v1/user/pageList", "post", userApi.userList) // 用户列表
Mock.mock(mockUrl + "/app/cfg/v1/zoneRegion/select", "get", configApi.select) // 获取机构
Mock.mock(mockUrl + "/app/user/v1/basRole/list", "post", userApi.getRoleList) // 获取角色列表
Mock.mock(mockUrl + "/app/user/v1/basRole/select", "get", userApi.getRoleList)