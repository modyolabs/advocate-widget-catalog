export default {
  ADD_NEW_BILL(state, data) {
    state.bills = [...state.bills, data];
  },
  UPDATE_BILLS(state, data) {
    state.bills = data;
  },
  SET_IS_LOADING(state, data) {
    state.isLoading = data;
  },
  SET_COMPANIES(state, data) {
    state.companies = data;
  },
  SET_CATEGORIES(state, data) {
    state.categories = data;
  },
  SET_IS_LOADING_BILLS(state, data) {
    state.isLoadingBills = data;
  },
  SET_BILLS(state, data) {
    state.bills = data;
  },
  SET_SEND_VOUCHER(state, data) {
    state.sendVoucher = data;
  },
  SET_SELECTED_DEBT(state, data) {
    state.selectedDebt = data;
  },
  SET_CURRENT_STEP(state, data) {
    state.step = data;
  },
  SET_STEP_ACTION(state, data) {
    state.stepAction = data;
  },
  SET_ACTIVE_TAB(state, data) {
    state.activeTab = data;
  },

};
