const VISITED_VIEW_KEY = 'am_visited_views'
const CACHED_VIEW_KEY = 'am_cached_views'

const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.some(v => v.path === view.path)) return
      let cloneObj = Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
      delete cloneObj.matched
      state.cachedViews.push(cloneObj)
      sessionStorage.setItem(CACHED_VIEW_KEY, JSON.stringify(state.cachedViews))
    },

    SET_VISITED_VIEWS: (state, views) => {
      state.visitedViews = [].concat(views)
    },

    SET_CACHED_VIEWS: (state, views) => {
      views.forEach(item => {
        if (item.matched) {
          delete item.matched
        }
      });
      state.cachedViews = [].concat(views)
      sessionStorage.setItem(CACHED_VIEW_KEY, JSON.stringify(state.cachedViews))
    },

    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const [i, v] of state.cachedViews.entries()) {
        if (v.path === view.path) {
          state.cachedViews.splice(i, 1)
          break
        }
      }

      sessionStorage.setItem(CACHED_VIEW_KEY, JSON.stringify(state.cachedViews))
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      state.cachedViews = state.cachedViews.filter(v => {
        return v.meta.affix || v.path === view.path
      })

      sessionStorage.setItem(CACHED_VIEW_KEY, JSON.stringify(state.cachedViews))
    },

    DEL_RIGHT_VISITED_VIEWS: (state, view) => {
      let findIndex = state.visitedViews.findIndex( v => v.path === view.path)
      if (findIndex > -1) {
        state.visitedViews.splice(findIndex)
      }
    },

    DEL_RIGHT_CACHED_VIEWS: (state, view) => {
      let findIndex = state.cachedViews.findIndex( v => v.path === view.path)
      if (findIndex > -1) {
        state.cachedViews.splice(findIndex)
      }

      sessionStorage.setItem(CACHED_VIEW_KEY, JSON.stringify(state.cachedViews))
    },

    DEL_ALL_VISITED_VIEWS: state => {
      // keep affix tags
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = []
      sessionStorage.setItem(CACHED_VIEW_KEY, JSON.stringify(state.cachedViews))
    },

    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }

  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    setViews({ dispatch }, view) {
      dispatch('setVisitedViews', view)
      dispatch('setCachedViews', view)
    },
    setVisitedViews({ commit }, views) {
      commit('SET_VISITED_VIEWS', views)
    },
    setCachedViews({ commit }, views) {
      commit('SET_CACHED_VIEWS', views)
    },
    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view)
        dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },

    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },

    delRightViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delRightVisitedViews', view)
        dispatch('delRightCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },

    delRightVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_RIGHT_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delRightCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_RIGHT_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },

    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  }
}

export default tagsView
