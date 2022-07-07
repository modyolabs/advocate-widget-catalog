export default {
  SET_DOCUMENTS(state, data) {
    state.documents = data;
  },
  SET_ACTIVE_COMPONENT(state, data) {
    state.activeComponent = data;
  },
  SET_UNSIGN_DOCUMENTS(state, data) {
    state.unsignDocuments = data;
  },
  SET_FROM_DATE(state, date) {
    state.fromDate = date;
  },
  SET_TO_DATE(state, date) {
    state.toDate = date;
  },
  SET_MAX_TO_DATE(state, data) {
    state.maxToDate = data;
  },
  SET_MAX_FROM_DATE(state, data) {
    state.maxFromDate = data;
  },
  SET_FILTER(state, value) {
    state.activeFilter = value;
  },
  SET_CURRENCY_FILTER(state, value) {
    state.activeCurrencyFilter = value;
  },
  SET_RISK_TABLE(state, data) {
    state.riskTable = data.fields.Table;
  },
};
