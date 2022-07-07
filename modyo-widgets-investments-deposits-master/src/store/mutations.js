export default {
  SET_ACCOUNTS(state, data) {
    state.accounts = data;
    state.isLoadingAccounts = false;
  },
  SET_FROM_ACCOUNT(state, data) {
    state.fromAccount = data;
  },
  SET_TO_ACCOUNT(state, data) {
    state.toAccount = data;
  },
  SET_AMOUNT(state, data) {
    state.amount = data;
  },
};
