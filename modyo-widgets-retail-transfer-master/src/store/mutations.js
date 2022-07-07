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
  SET_PARAM_CLIENT_ID(state, data) {
    state.paramClientId = data;
  },
  SET_SEND_VOUCHER(state, data) {
    state.sendVoucher = data;
  },
  SET_SELECTED_DEBT(state, data) {
    state.selectedDebt = data;
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
  SET_DATE(state, data) {
    state.date = data;
  },
  SET_SCHEDULED(state, data) {
    state.scheduled = data;
  },
  SET_FREQUENCY(state, data) {
    state.frequency = data;
  },
  SET_TO_ACCOUNT_ID(state, data) {
    state.toAccountId = Number(data);
  },
  SET_FROM_ACCOUNT_ID(state, data) {
    state.fromAccountId = Number(data);
  },
  SET_CONTACTS(state, data) {
    state.contacts = data;
  },
  SET_FILTERED_CONTACTS(state, data) {
    state.filteredContacts = data;
  },
  SET_BANKS(state, data) {
    state.banks = data;
  },
  SET_TO_OTHERS(state, data) {
    state.toOthers = data;
  },
  SET_TO_NEW_CONTACT(state, data) {
    state.toNewContact = Boolean(data);
  },
  SET_PAYEE_ACCOUNT(state, data) {
    state.payeeAccount = data;
  },
};
