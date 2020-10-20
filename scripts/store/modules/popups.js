const state = {
  sizePopupIsOpen: false,
  weightPopupIsOpen: false,
}

const mutations = {
  openSizePopup(state) {
    state.sizePopupIsOpen = true;
    document.documentElement.classList.add('popup--active');
  },
  closeSizePopup(state) {
    state.sizePopupIsOpen = false;
    document.documentElement.classList.remove('popup--active');
  },
  openWeightPopup(state) {
    state.weightPopupIsOpen = true;
    document.documentElement.classList.add('popup--active');
  },
  closeWeightPopup(state) {
    state.weightPopupIsOpen = false;
    document.documentElement.classList.remove('popup--active');
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
