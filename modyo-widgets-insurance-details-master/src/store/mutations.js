export default {
  initFundsChange(state) {
    state.fundsChange.screen = 'FundsChangeSelector';
    state.fundsChange.receiptEmail = null;
  },
  setFundsChange(state, payload) {
    state.fundsChange = payload;
  },
  setDrawer(state, payload) {
    state.drawer = payload;
  },
  setBodyView(state, payload) {
    state.bodyView = payload;
    window.scrollTo(0, 0);
  },
  setBodyTitleMobile(state, payload) {
    state.bodyTitleMobile = payload;
  },
  setPolicyEmailSent(state, payload) {
    state.policyEmailSent = payload;
  },
  setFundsChangeHistory(state, payload) {
    state.fundsChangeHistory = payload;
  },
  setFundsCurrentPortfolio(state, payload) {
    state.fundsCurrentPortfolio = payload;
  },
  setStatements(state, payload) {
    state.statements = payload;
  },
  setContractor(state, payload) {
    state.contractor = payload;
  },
  setPolicy(state, payload) {
    state.policy = payload;
  },
  setPolicyValueHistory(state, payload) {
    state.policyValueHistory = payload;
  },
  setPolicyBalance(state, payload) {
    state.policyBalance = payload;
  },
  setCustomPortfolio(state, payload) {
    state.fundsChange.customPortfolio = payload;
  },
  setFunds(state, payload) {
    state.fundsChange.funds = payload;
  },
};
