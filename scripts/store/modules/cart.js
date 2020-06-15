const credentials = 'same-origin';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
const method = 'POST';

/**
 * State
 * ------
 * Single Source of truth for all cart related actions site wide
 */

const state = {
  cartData: {},
  miniCartIsOpen: false,
};

/**
 * Mutations
 * ------
 * This is where state modifications are performed, and receives
 * state as the first argument. To invoke a mutation handlerv (must
 * be synchronous), you need to call store.commit('type', payload).
 */

const mutations = {
  setCartData(state, newCartData) {
    state.cartData = newCartData;
  },
  toggleMiniCart(state) {
    state.miniCartIsOpen = !state.miniCartIsOpen;
  },
  closeMiniCart(state) {
    state.miniCartIsOpen = false;
  }
};

/**
 * Actions
 * ------
 * This is where state mutations are commited and can by asynchronous
 */

const actions = {
  addToCart({ commit }, cartData = {}) {
    console.log('Adding...', cartData);
    const body = JSON.stringify(cartData);

    return fetch('/cart/add.js', { body, credentials, headers, method })
      .then(response => response.json())
      .catch(error => {
        throw new Error(error);
      });
  },

  changeCartItem({ commit }, itemData = {}) {
    const body = JSON.stringify(itemData);

    return fetch('/cart/change.js', { body, credentials, headers, method })
      .then(response => response.json())
      .then(cartData => commit('setCartData', cartData))
      .catch(error => {
        throw new Error(error);
      });
  },

  closeMiniCart({ commit }) {
    commit('closeMiniCart');
  },

  hydrateCartItems({ commit }) {
    // Refresh the list of items in a users cart from the Shopify api.

    return fetch('/cart.js', { credentials, headers })
      .then(response => response.json())
      .then(cartData => commit('setCartData', cartData))
      .catch((error) => {
        throw new Error(error.response.data.description);
      });
  },

  removeCartItem({ commit }, line) {
    const productData = {
      line,
      quantity: 0,
    };
    const body = JSON.stringify(productData);

    window
      .fetch('/cart/change.js', { headers, credentials, method, body })
      .then(response => response.json())
      .then(cartData => commit('setCartData', cartData))
      .catch((error) => {
        throw new Error(error.response.data.description);
      });
  },

  toggleMiniCart({ commit }) {
    commit('toggleMiniCart');
  },
};

/**
 * Getters
 * ------
 * Functions that can grab, alter and return data from state.
 * These are reactive. When the state changes these values will change.
 */

const getters = {
  cartCount(state) {
    return state.cartData.item_count
  },

  cartItems(state) {
    return state.cartData.items;
  },

  cartLevelDiscounts(state) {
    return state.cartData.cart_level_discount_applications;
  },

  cartOriginalSubtotal(state) {
    return state.cartData.original_total_price;
  },

  cartSubtotal(state) {
    return state.cartData.total_price;
  },

  cartTotalDiscount(state) {
    return state.cartData.total_discount;
  },

  miniCartIsOpen(state) {
    return state.miniCartIsOpen;
  },
};

export default {
  actions,
  getters,
  mutations,
  state,
  namespaced: true,
}