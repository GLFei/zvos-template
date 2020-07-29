/**
 * Created by whobird on 17/8/17.
 */
const getters = {
  getOpenid:state=>{
    return state.openid;
  },
  getCompanyList:state=>{
    return state.companyList
  },
  getAuthReady:state=>{
    return state.authReady
  },
  getMenuCollapse: state => {
    return state.menuCollapse
  }
/*  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,*/

}
export default getters
