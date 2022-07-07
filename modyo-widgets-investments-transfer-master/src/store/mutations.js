export default {
  SET_ACCOUNTS(state, data) {
    state.accounts = data;
  },

  SET_CURRENCY_FILTER(state, data) {
    state.currencyFilter = data;
  },

  SET_FROM_ACCOUNT(state, data) {
    state.fromAccount = data;
  },

  SET_TO_ACCOUNT(state, data) {
    state.toAccount = data;
  },

  SET_API_STATUS(state, data) {
    state.apiStatus = data;
  },

  SET_AMOUNT(state, data) {
    state.amount = data;
  },
};
