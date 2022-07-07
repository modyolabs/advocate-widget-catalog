export default {
  SET_ACCOUNTS(state, data) {
    state.accounts = data;
  },

  SET_CARDS(state, data) {
    state.cards = data;
  },

  SET_PARAM_CLIENT_ID(state, data) {
    state.paramClientId = data;
  },

  SET_ADVANCE_AMOUNT(state, data) {
    state.advanceAmount = data;
  },

  SET_MONTHLY_AMOUNT(state, data) {
    state.monthlyAmount = data;
  },

  SET_RATE(state, data) {
    state.rate = data;
  },

  SET_CAE(state, data) {
    state.cae = data;
  },
};
