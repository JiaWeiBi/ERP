const state = {
  companyList: []
}

const mutations = {
  SET_COMPANYLIST: (state, data) => {
    state.companyList = data
  }
}

const actions = {
  setCompany({ commit }, data) {
    commit('SET_COMPANYLIST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
