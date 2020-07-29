/**
 * Created by whobird on 17/8/21.
 */
import * as types from '../mutation-types'
const namespaced = true;
// initial state

const state = {
    unitId: '',
    unitName:'',

    id: '',
    userName: '',
    roleName: '',
    statusName: '',
    expireDate: '',
    registerTime: '',

    imageUrl: './static/assets/figure_default@2x.png',
    telNumber: '',
    email: '',

    employeeNumber: '',
    companyName: '',
    deptName: '',
    positionName: '',

    companyId: '',
    //authorities:[],
    //langKey:'',
    //create_time:'',

    // login:'',//登陆名
    //status:'',
    //createBy:'',
    //updateBy:'',
    //updateTime:'',
    //companyList:[],

    //title:'',
    //titleType:''
}

// getters
const getters = {
    getUnitId: state => state.unitId,
    getId: state => state.id,
    getName: state => state.userName,
    getRoleName: state => state.roleName,
    getStatusName: state => state.statusName,
    getExpireDate: state => state.expireDate,
    getRegisterTime: state => state.registerTime,

    getImageUrl: state => state.imageUrl,
    getTelNumber: state => state.telNumber,
    getEmail: state => state.email,

    getEmployeeNumber: state => state.employeeNumber,
    getCompanyName: state => state.companyName,
    getDeptName: state => state.deptName,
    getPositionName: state => state.positionName,

    getCompanyId: state => state.companyId,

    //getLogin: state => state.login,
    // getStatus: state => state.status,
    //getAuthorities: state => state.authorities,
    //getLangKey: state => state.langKey,
    //getCreateBy: state => state.createBy,
    // getCreateTime: state => state.create_time,
    // getUpdateBy: state => state.updateBy,
    // getUpdateTime: state => state.updateTime,
    // getCompanyList: state => state.companyList,

}

// actions
const actions = {
    setUserInfo({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_USERINFO, payload);
            /*context.dispatch('setLogin', true, { root: true })*/
            commit(types.SET_LOGIN, { login: true }, { root: true })
            resolve(payload);
        });

    },

    updateUserInfo(context, payload) {
        //update
        return new Promise(resolve => {
            context.commit(types.SET_USERINFO, payload);
            resolve(payload);
        });

    },

    updateFigure(context, { image }) {
        return new Promise(resolve => {
            context.commit(types.SET_FIGURE, {
                image
            });
            resolve({image});
        });
    },

    updateCompanyId(context, { companyId }) {

        return new Promise(resolve => {
            context.commit(types.SET_COMPANY_ID, {
                companyId
            })
            resolve({companyId});
        });
    },

    logout(context) {
        context.dispatch('logout', null, { root: true }) // -> 'someOtherAction'
    },
}

// mutations
const mutations = {
    [types.SET_USERINFO](state, payload) {
        state = Object.assign(state, payload);
    },

    [types.SET_FIGURE](state, { image }) {
       // state.imageUrl = imageUrl;
        state.image = image;
    },

    [types.SET_COMPANY_ID](state, { companyId }) {
        state.companyId = companyId;
    }
}

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}