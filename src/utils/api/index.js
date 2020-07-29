import httpService from "@/utils/services/http_service"

/**============公共接口数据==============*/

export default {
    // 获取用户菜单权限
    async getMenuButtonById(query) {
        return httpService.get('/app/user/v1/basMenu/getMenuButtonAuthById', query, { loading: false });
    },
    /**
     *  获取字典配置所配置的字典下拉数据
     *  获取配置类别列表下拉框 pdicId:'200887'
     *  获取是否包含锁车功能下拉框 pdicId:'200070'
     *  获取是否需要安装GPS下拉框下拉框 pdicId:'200067'
     *  获取品牌下拉 pdicId=200841
     *  获取波特率 pdicId=100630
     *  获取产品版本 pdicId=100623     
     *  获取设备系列 pdicId=200621
     *  获取底盘类型 pdicId = 100617
     *  获取开机原因 pdicId = 200804
     *  获取停机原因 pdicId = 200805
     *  @param {query}
     */
    async getDicyByPdicId(query) {
        return httpService.get('/app/cfg/v1/basDictionary/selectParentDicAll', query, { loading: false });
    },
    async getDicyBydicId(query) {
        return httpService.get('/app/cfg/v1/basDictionary/selectDicAll', query, { loading: false });
    },
    /**
     *  获取机构下拉数据
     *  @param {query}
     */
    async getUnitTree(query) {
        return httpService.get('/app/cfg/v1/basUnit/select', query, { loading: false });
    },

    /**
     *  获取大区下拉数据
     *  @param {query}
     */
    async getRegion(query) {
        return httpService.get('/app/cfg/v1/zoneRegion/select', query, { loading: false });
    },
    /**
     *  根据国家显示省份
     *  @param countryId
     */
    async selectCountryGetProList(countryId) {
        return httpService.get('/app/cfg/v1/zoneProvince/listByCountryId', countryId)
    },
    /**
     *  根据大区显示省份
     *  @param {regionId}
     */
    async selectRegionGetProList(regionId) {
        return httpService.get('/app/cfg/v1/zoneRegion/selectByRegion', { id: regionId })
    },

    /**
     *  获取菜单下拉框
     *  @param {query}
     */
    async menutreeList(query) {
        return httpService.post('/app/user/v1/basMenu/list', query, { loading: false });
    },
    /**
     *  获取菜单按钮下拉框
     *  @param {query}
     */
    async getMenuButton(query) {
        return httpService.get('/app/user/v1/basMenu/getMenuButtonById', query, { loading: false });
    },
    /**
     *  获取按钮下拉框
     *  @param {query}
     */
    async buttonidList(query) {
        return httpService.get('/combase/v1/buttonidlist', query, { loading: false });
    },
    /**
     *  获取大区下拉框
     *  @param {query}
     */
    async regionList(query) {
        return httpService.get('/app/cfg/v1/zoneRegion/select', query, { loading: false });
    },
    /**
     *  获取角色类型下拉框
     *  @param {query}
     */
    async rolesList(query) {
        return httpService.get('/app/user/v1/basRole/select', query, { loading: false });
    },

    // 获取当前角色拥有的菜單权限
    async fetchRolesGetmenuList(query = {}) {
        return httpService.get('/app/user/v1/basMenu/getUserMenu', query, { loading: false });
    },
    /**
     *  获取字典项类型下拉框
     *  @param {query}
     */
    async dictoryTypeList(query) {
        return httpService.get('/combase/v1/dictionarytypelist', query, { loading: false });
    },
    /**
     *  获取父字典名称下拉框
     *  @param {query}
     */
    async parentDictoryNameList(query) {
        return httpService.get('/combase/v1/parentnamelist', query, { loading: false });
    },
    /**
     *  获取机构级别下拉框
     *  @param {query}
     */
    async unitLevelList(query) {
        return httpService.get('/combase/v1/diclist', query, { loading: false });
    },
    /**
     *  获取设备类型列表下拉框
     *  @param {query}
     */
    async deviceTypeList(query) {
        return httpService.get('/app/cfg/v1/bizVehicleType/select', query, { loading: false });
    },
    /**
     *  设备型号下拉框下拉框
     *  @param {query}
     */
    async vehmodelbyidList(query) {
        return httpService.get('/app/cfg/v1/bizVehicleModel/select', query, { loading: false });
    },
    // //获取设备系列
    // async EquipmentSeries(query) {
    //     return httpService.get('/app/cfg/v1/basDictionary/selectParentDicAll', query, { loading: false });
    // },

    /**
     *  设备编号管理列表查询
     *  @param pagination Object{keyWord,pageNo,pageSize}
     */
    async fetchDeviceNumberList(pagination) {
        return httpService.post('/app/cfg/v1/bizVehicleAutoComplete/list', pagination, { loading: false });
    },

    /**
     *  设备编号关联信息查询
     *  @param pagination Object{keyWord}
     */
    async fetchDeviceContactData(pagination) {
        return httpService.get('/app/cfg/v1/bizVehicleAutoComplete/selectByVehicle', pagination, { loading: false, handleError: true });
    },
    /**
     *  获取终端设备相关
     *  @param pagination Object{keyWord,pageNo,pageSize}
     */
    async getTerminalList(pagination) {
        return httpService.get('/terminal/v1/getterminallist', pagination, { loading: false });
    },
    //获取角色列表
    async getrolesList(pagination) {
        return httpService.post('/app/user/v1/basRole/list', pagination, { loading: false });
    },
    //调试项名称下拉列框
    async getDebugButtonList(query) {
        return httpService.get('/app/cfg/v1/cfgDebugButton/select', query, { loading: false });
    },
    // 产品类型
    async getProductsType(query) {
        return httpService.get('/app/device/v1/productType.list', query, { loading: false });
    },
    // 产品列表
    async getProductsList(query) {
        return httpService.get('/app/device/v1/product.list', query, { loading: false });
    },

    /**
     *  获取用户所在机构logo和标题及机构信息
     */
    async getUserUnit() {
        return httpService.get('/app/cfg/v1/basUnit/getUserUnit', {}, { loading: false });
    },


    /**
     * @author: zhengyongbo
     *  是否可风控设置判断
     *  @param  Object{ vehicleNo }
     */
    async canRiskSettingCheck(params, config = {}) {
        return httpService.get('/app/lock/v1/riskControl.check', params, config);
    },
    /**
     *  @author: zhengyongbo
     *  sn model获取
     *  @param  Object{ vehicleNo, uniqueNo }
     */
    async getRiskSettingSnModel(params) {
        return httpService.get('/app/lock/v1/riskControl.snModel', params);
    },

    /**
     *  @author: zhengyongbo
     *  申请码是否有效校验
     *  @param  Object{ vehicleNo, gwTime, index}
     */
    async riskApplicationCodeCheck(params, config = {}) {
        return httpService.post('/app/lock/v1/applicationCode.check', params, config);
    },

    /**
     *  @author: guolanfei
     *  保存操作日志
     *  @param  Object{ vehicleNo,terminalNo,simNo,msg,logTypeId,resourceText,menuText}
     * 
     *  logTypeId：设备：3,终端：2,sim卡：1
     * 
     * 
     */
    async setvehicleOperationLog(params) {
        return httpService.post('/app/device/v1/vehicleOperationLog.insertLog', params, { loading: false });
    },
    /**
     *  保存设备调试结果/调试异常报表
     *  @param pagination
     */
    async saveVehicleDebugLog(pagination) {
        return httpService.post('/app/device/v1/bizVehicleDebugLog.saveVehicleDebugLog', pagination, { laoding: true });
    },

    /**
     *  @author: zhengyongbo
     *  获取土方二级解锁车、高机臂式车锁车倒计时查询控制器响应接口
     *  @param  Object{
     *    cmdId
     *    time
     *    uniqueNo
     *    vehicleType
     *  }
     */
    async getTFControllerResponse(params, config = {}) {
        return httpService.post('/app/lock/v1/control.response', params, config);
    },
    /**
     *  查询异步全部导出文件链接
     *  @param requestId pageNo pageSize
     */
    async getAsyncExportLink(params, config = { laoding: true }) {
        return httpService.post('/app/device/v1/jobList', params, config);
    },
    /**
     *  获取设备工况列表
     *  @param params
     */
    async fetchWorkingList(params) {
        return httpService.post('/app/device/v1/vehicle.workingList', params);
    },
}