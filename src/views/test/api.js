import httpService from "@/utils/services/http_service"
const mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    /**============Sim卡相关==============*/
export default {
    /**
     *  sim列表查询
     *  @param pagination Object{simNo,pageNo,pageSize}
     */
    async fetchSimList(pagination) {
        return httpService.post('/app/device/v1/sim.list', pagination);
    },
    /**
     * @author zhengyongbo
     * @param {simNo} query
     */
    async getSimDetail(query) {
        return httpService.get('/app/device/v1/sim.findBySimNo', query)
    },
    // 新增sim卡
    async SimAdd(query) {
        return httpService.post('/app/device/v1/sim.create', query)
    },
    // 批量新增
    async BatchAdd(query) {
        return httpService.post('/app/device/v1/sim.importTemplate', query, { handleError: true })
    },
    // 修改sim卡
    async SimUpdate(query) {
        return httpService.put('/app/device/v1/sim.update', query)
    },
    // 删除sim卡
    async SimDelete(query) {
        return httpService.delete('/app/device/v1/sim.delete', query)
    },
    //注销sim卡
    async SimLogout(query) {
        return httpService.put('/app/device/v1/sim.logout?simNo=' + query + '')
    },
    //删除和注销效验
    async DeleteVerify(query) {
        return httpService.put('/app/device/v1/sim.deleteVerify', query)
    },
    // sim卡导出当前页
    async simCardPage(query) {
        return httpService.download('/app/device/v1/sim.exportPage', query, { mimeType, fileName: 'SIM卡内容_' + new Date().getTime() });
    },
    // sim卡导出全部
    async simCardAll(query) {
        return httpService.download('/app/device/v1/sim.export', query, { mimeType, fileName: 'SIM卡内容_' + new Date().getTime() });
    },
    /**
     *  SIM日志查询列表
     *  @param pagination Object{simNo,pageNo,pageSize}
     */
    async fetchSimlogList(pagination) {
        return httpService.post('/app/device/v1/vehicleOperationLog.list', pagination);
    },
    // SIM日志导出(当前页)
    async simLogPage(query) {
        return httpService.download('/app/device/v1/vehicleOperationLog.simExportPage', query, { mimeType, fileName: 'SIM卡操作日志_' + new Date().getTime() });
    },
    // SIM日志导出(全部)
    async simLogAll(query) {
        return httpService.download('/app/device/v1/vehicleOperationLog.simExport', query, { mimeType, fileName: 'SIM卡操作日志_' + new Date().getTime() });
    },
    //下载模板
    async downloadModel(query) {
        return httpService.download('/app/device/v1/sim.exportTemplate', query, { mimeType, fileName: '模板_SIM_Import' });
    },
    //SIM批量下载错误详情
    async importErrordetail(query) {
        return httpService.download('/app/device/v1/sim.exportTemplateError', query, { mimeType, fileName: 'SIM错误详情_' + new Date().getTime() });
    },
    //SIM卡信息查询，主要为ICCID和IMSI
    async getSIMInfo(query) {
        return httpService.get('/app/device/v1/sim/simNumbers', query);
    },
    // 下载注销模板--SIM卡
    async downloadSimLogout(query) {
        return httpService.download('/app/device/v1/sim.exportSimWithdrawTemplate', query, { mimeType, fileName: 'SIM批量注销模板_' + new Date().getTime() });
    },
    // 批量注销--SIM卡
    async BatchSimLogout(query) {
        return httpService.post('/app/device/v1/sim.importSimWithdrawTemplate', query, { handleError: true })
    },
    // 下载注销错误--SIM卡
    async downloadSimLogoutError(query) {
        return httpService.download('/app/device/v1/sim.exportSimWithdrawTemplateError', query, { mimeType, fileName: 'SIM批量注销错误详情_' + new Date().getTime() });
    },
    // 更新标识--sim卡
    async updateSimIdentify(query) {
        return httpService.post('/app/device/v1/sim.updateSimIdentify', query);
    }
}