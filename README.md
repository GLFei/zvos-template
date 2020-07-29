# zvos-am-app 农机大脑前端项目
### 前端校验token及登陆流程
a.页面中配置needLogin:true, 来判断路由是否需要登陆验证
b.登陆后，对登陆，注册及重新登陆，重置密码流程过滤，不再显示
c. 登陆后， cookie保存token信心， store.state.login保存登陆状态
d. logout , 后台确认logout后，前端同时清理store.state.login及cookie中token
e.token过期，返回错误状态后处理，store.dispatch('logout'),跳转登录页。

### 接口问题

### 消息提示形式定义
Notify的形式是处理请求报错， MessageBox形式是做操作确认， Alert提示信息形式是操作成功和失败的反馈信息

### 配置
#### 接口配置
      修改根目录下config文件夹里的地址。

#### 页面菜单配置
      src/config/menuConfig.js 配置项目菜单信息

#### 页面权限
      需要权限的页面在data里的menuKey写入本页面的权限code,如menuKey: "test_list"