export default {
  SET_SELECTED_LOAN(state, data) {
    state.selectedLoan = data;
  },
  SET_LOADING_LOANS(state, data) {
    state.isLoadingLoans = data;
  },
  SET_LOANS(state, data) {
    state.loans = data;
  },
  SET_PARAM_CLIENT_ID(state, data) {
    state.paramClientId = data;
  },
};
