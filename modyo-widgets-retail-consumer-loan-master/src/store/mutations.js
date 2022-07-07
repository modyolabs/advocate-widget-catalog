export default {
  SET_PARAM_CLIENT_ID(state, data) {
    state.paramClientId = data;
  },

  SET_AMOUNT(state, value) {
    state.amount = value;
  },

  SET_ACCOUNT(state, value) {
    state.account = value;
  },

  SET_PAYMENTS(state, value) {
    state.payments = value;
  },

  SET_MONTHS_GRACE(state, value) {
    state.monthsGrace = value;
  },

  SET_DISGRACE(state, value) {
    state.disgrace = value;
  },

  SET_UNEMPLOYMENT(state, value) {
    state.unemployment = value;
  },

  SET_ACCOUNTS(state, data) {
    state.accounts = data;
  },

  SET_SHOW_SETTINGS_VIEW(state, value) {
    state.showSettingsView = value;
  },

  SET_SHOW_SIMULATION_DETAILS(state, value) {
    state.showSimulationDetails = value;
  },

  SET_ACTIVE_DETAIL_INFO(state, value) {
    state.activeDetailInfo = value;
  },

  SET_INTEREST_RATE(state, data) {
    state.interestRate = data;
  },

  SET_INSTALLMENT(state, data) {
    state.installment = data;
  },

  SET_ANNUAL_RATE(state, data) {
    state.annualRate = data;
  },

  SET_MONTHLY_AMOUNT(state, data) {
    state.monthlyAmount = data;
  },

  SET_TOTAL_LOAN_AMOUNT(state, data) {
    state.totalLoanAmount = data;
  },

  SET_LOAN_COSTS(state, data) {
    state.loanCosts = data;
  },

  SET_PERCENTAGE_LOAN_COSTS(state, data) {
    state.percentageLoanCosts = data;
  },

  SET_CAE(state, data) {
    state.cae = data;
  },

  SET_STAMP_TAX(state, data) {
    state.stampTax = data;
  },

  SET_NOTARY_FEE(state, data) {
    state.notaryFee = data;
  },

  SET_MONTHLY_RATE(state, data) {
    state.monthlyRate = data;
  },

  SET_DISGRACE_INSURANCE(state, data) {
    state.disgraceInsurance = data;
  },

  SET_UNEMPLOYMENT_INSURANCE(state, data) {
    state.unemploymentInsurance = data;
  },
};
