import httpService from "@/utils/services/http_service"
const mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    /**============用户管理相关==============*/

export default {
    /**
     *  获取用户列表数据
     *  @param pagination Object{}
     */
    async GetUserList(pagination) {
        return httpService.post('/app/user/v1/user/pageList', pagination);
    },
    // 新增用户  Object{}
    async UserAdd(query) {
        return httpService.post('/app/user/v1/user/create', query)
    },
    // 修改用户  Object{}
    async UserUpdate(query) {
        return httpService.put('/app/user/v1/user/update', query)
    },
    // 禁用用户  Object{}
    async UserDisable(query) {
        return httpService.put('/app/user/v1/user/forbidden', query)
    },
    // 重置密码  Object{}
    async UserReset(query) {
        return httpService.put('/app/user/v1/user/resetPassWord', query)
    },
    /** 
     *  用户列表导出当前页
     *  @param query Object{}
     */
    async UserPage(query) {
        return httpService.download('/app/user/v1/user/exportPage', query, { mimeType, fileName: '用户列表_' + new Date().getTime() });
    },

    /** 
     *  用户列表导出全部
     *  @param query Object{}
     */
    async UserALL(query) {
        return httpService.download('/app/user/v1/user/export', query, { mimeType, fileName: '用户列表_' + new Date().getTime() });
    },
    /**
     *  获取角色列表数据
     *  @param pagination Object{keyWord,pageNo,pageSize}
     */
    async GetRolesList(pagination) {
        return httpService.post('/app/user/v1/basRole/list', pagination);
    },
    // 角色新增
    async RolesAdd(query) {
        return httpService.put('/app/user/v1/basRole/create', query);
    },
    // 角色删除
    async RolesDelete(query) {
        return httpService.delete('/app/user/v1/basRole/delete', query);
    },
    // GET /system/v1/roles/getlist
    // 获取角色拥有的权限列表
    async fetchRoleIdGetlist(query) {
        return httpService.post('/app/user/v1/basMenu/list', query);
    },
    // 获取角色拥有的权限列表
    async fetchRoleIdGetmenulist(query) {
        return httpService.get('/app/user/v1/basRoleMenu/selectById', query);
    },
    // 权限分配  
    async fetchRolesUpdatauthority(query) {
        return httpService.put('/app/user/v1/basRoleMenu/create', query);
    },
    // 角色修改 
    async RolesUpdate(query) {
        return httpService.put('/app/user/v1/basRole/update', query);
    },
    /**
     *  权限分配
     *  @param query (ids,roleId)
     */
    async updateUthority(query) {
        return httpService.put('/app/user/v1/basRoleMenu/create', query);
    },
    /**
     *  角色列表单页导出
     *  @param query (pageNo,pageSize)
     */
    async RolesConfigPage(query) {
        return httpService.download('/app/user/v1/basRole/exportPage', query, { mimeType, fileName: '角色列表' + new Date().getTime() });
    },
    /**
     *  角色列表全部导出
     *  @param query (pageNo,pageSize)
     */
    async RolesConfigAll(query) {
        return httpService.download('/app/user/v1/basRole/export', query, { mimeType, fileName: '角色列表' + new Date().getTime() });
    },
    /**
     *  机群查询列表
     *  @param pagination Object{keyWord,pageNo,pageSize}
     */
    async fleetSelect(pagination) {
        return httpService.get('/app/device/v1/basGroup/pageList', pagination);
    },
    /**
     *  机群查询列表
     *  @param pagination Object{keyWord,pageNo,pageSize}
     */
    async fleetSelectList(pagination) {
        return httpService.get('/app/device/v1/basGroup/list', pagination);
    },
    /**
     *  用户日志查询列表
     *  @param pagination Object{}
     */
    async fetchSystemLogList(pagination) {
        return httpService.post('/app/user/v1/userLog.list', pagination);
    },
    /** 
     *  用户日志导出当前页
     *  @param query Object{}
     */
    async fetchSystemLogPage(query) {
        return httpService.download('/app/user/v1/userLog.exportPage', query, { mimeType, fileName: '用户日志_' + new Date().getTime() });
    },

    /** 
     *  用户日志导出全部
     *  @param query Object{}
     */
    async fetchSystemLogALL(query) {
        return httpService.download('/app/user/v1/userLog.export', query, { mimeType, fileName: '用户日志_' + new Date().getTime() });
    },
}