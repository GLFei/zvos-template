import * as types from '../mutation-types'

const namespaced=true;
// initial state
const state = {
    authorities: {}
}

// getters
const getters = {
    getAuthority: state => state.authorities,
}

// actions
const actions = {
    setAuthority({ commit }, payload) {
        return new Promise(resolve => {
            commit(types.SET_AUTHORITY, payload);
            resolve(payload);
        });
    },


}

// mutations
const mutations = {
    [types.SET_AUTHORITY](state, payload) {
        window.console.log(payload)
        state.authorities = payload;
    },
}

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
