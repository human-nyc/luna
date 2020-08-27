const state = {
  sizePopupIsOpen: false,
  weightPopupIsOpen: false,
}

const mutations = {
  openSizePopup(state) {
    state.sizePopupIsOpen = true;
  },
  closeSizePopup(state) {
    state.sizePopupIsOpen = false;
  },
  openWeightPopup(state) {
    state.weightPopupIsOpen = true;
  },
  closeWeightPopup(state) {
    state.weightPopupIsOpen = false;
  }
}

const actions = {
  openSizePopup({commit}) {
    commit('openSizePopup');
  },
  closeSizePopup({commit}) {
    commit('closeSizePopup');
  },
  openWeightPopup({commit}) {
    commit('openWeightPopup');
  },
  closeWeightPopup({commit}) {
    commit('closeWeightPopup');
  },
}


const getters = {
  sizePopupIsOpen(state) {
    return state.sizePopupIsOpen;
  },
  weightPopupIsOpen(state) {
    return state.weightPopupIsOpen;
  }
}

export default {
  actions,
  getters,
  mutations,
  state,
  namespaced: true
}
