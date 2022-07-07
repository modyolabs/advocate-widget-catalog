export default {
  SET_IS_LOADING(state, data) {
    state.isLoading = data;
  },
  SET_ACCOUNTS(state, data) {
    state.accounts = data;
  },
  SET_AMOUNT(state, data) {
    state.amount = data;
  },
  SET_ACTIVE_ACCOUNT_ID(state, data) {
    state.activeAccountId = Number(data);
  },
  SET_PARAM_CARD_ID(state, data) {
    state.paramCardId = data;
  },
  SET_PARAM_CLIENT_ID(state, data) {
    state.paramClientId = data;
  },
  SET_SEND_VOUCHER(state, data) {
    state.sendVoucher = data;
  },
  SET_SELECTED_DEBT(state, data) {
    state.selectedDebt = data;
  },
  SET_CARDS(state, data) {
    state.cards = data;
  },
  SET_ACTIVE_CARD_ID(state, data) {
    state.activeCardId = Number(data);
  },
  SET_AMOUNT_OPTION(state, data) {
    state.amountOption = data;
  },
  SET_CURRENT_STEP(state, data) {
    state.step = data;
  },
  SET_STEP_ACTION(state, data) {
    state.stepAction = data;
  },
  SET_STEPPER(state, data) {
    state.stepper = data;
  },
};
