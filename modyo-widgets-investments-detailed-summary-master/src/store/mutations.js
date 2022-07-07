export default {
  SET_IS_LOADING(state, data) {
    state.isLoading = data;
  },

  SET_ACCOUNTS(state, data) {
    state.accountsData = data;
  },

  SET_PRODUCTS(state, data) {
    state.productsData = data;
  },

  SET_CURRENCIES(state, data) {
    state.currenciesData = data;
  },
};
