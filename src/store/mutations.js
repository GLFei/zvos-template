/**
 * Created by whobird on 17/8/17.
 */
import * as types from './mutation-types'

export default {
    [types.SET_OPENID](state,payload){
        state.openid=payload.openid;
    },
    [types.SET_LOGIN](state,payload){
        state.login=payload.login;
    },
    [types.SET_PHONE_NUM](state,payload){
        state.telNumber=payload.telNumber
    },
    [types.SET_COMPANY_LIST](state,payload){
        state.companyList=payload.companyList
    },
    [types.SET_AUTHREADY](state,payload){
        state.authReady=payload.authReady
    },
    [types.SET_MENU_COLLAPSE](state,payload){
        state.menuCollapse=payload
    }
}
