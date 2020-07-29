import httpService from "@/utils/services/http_service";

export default {
  /**-------------------------------首页----------------------------------- */
  /**
   * @author: zhengyongbo
   * date: 2019-12-05
   *  获取最近访问页面列表
   */
  async getVisitedPageList(data = {}) {
    return httpService.get(
      '/app/user/v1/basMenu/getNewVisitMenutList',
      data
    )
  },
  /**
   *  @author: zhengyongbo
   *  date: 2019-12-05
   *  设备统计数量
   */
  async getDeviceStatistics(data = {}) {
    return httpService.get(
      '/app/device/v1/vehicle/statistics.count',
      data
    )
  },
  /**
   *  @author: zhengyongbo
   *  date: 2019-12-05
   *  设备统计数量, 设备类型分组, echarts图表数据
   */
  async getEchartsData(data = {}) {
    return httpService.get(
      '/app/device/v1/vehicle/type/statistics.count',
      data
    )
  }
}
