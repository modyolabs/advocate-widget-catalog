export default {
  SET_ACCOUNTS(state, data) {
    state.accounts = data;
  },

  SET_ACTIVE_ACCOUNT_ID(state, data) {
    state.activeAccountId = Number(data);
  },

  SET_API_STATUS(state, data) {
    state.apiStatus = data;
  },

  SET_ACTIVE_TAB(state, data) {
    state.activeTab = data;
  },

  SET_FROM_DATE(state, data) {
    state.fromDate = data;
  },

  SET_FILTER_BY(state, data) {
    state.filterBy = data;
  },

  SET_IS_LOADING_TRANSACTIONS(state, data) {
    state.isLoadingTransactions = data;
  },

  SET_PARAM_CLIENT_ID(state, data) {
    state.paramClientId = data;
  },

  SET_PARAM_ACCOUNT_ID(state, data) {
    state.paramAccountId = data;
  },

  SET_SHOW_MOVEMENTS(state, data) {
    state.showMovements = data;
  },

  SET_TO_DATE(state, data) {
    state.toDate = data;
  },

  SET_TRANSACTIONS(state, data) {
    state.transactions = data;
  },

  SET_SELECTED_TRANSACTION(state, data) {
    state.selectedTransaction = data;
  },
};
