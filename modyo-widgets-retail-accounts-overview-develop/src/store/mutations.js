export default {
  SET_TRANSACTIONS(state, data) {
    state.transactions = data;
  },
  SET_TOTAL_BUDGET(state, data) {
    state.totalBudget = data;
  },
  SET_TOTAL_BUDGET_ACCOUNTS(state, data) {
    state.totalBudgetAccounts = data;
  },
  SET_SELECTED_ACCOUNT(state, data) {
    state.selectedAccount = data;
  },
  UPDATE_DATE_RANGE(state, data) {
    state.dateRange = data;
  },
  SET_SINGLE_CHART(state, data) {
    state.currentView.singleChart = data;
  },
  SET_OVERVIEW_VIEW(state, data) {
    state.currentView.overview = data;
  },
  SET_CHART_REF(state, data) {
    state.chartRef = data;
  },
  SET_BOTTOM_SHEET_REF(state, data) {
    state.bottomSheetRef = data;
  },
  SET_INSIGHTS(state, data) {
    state.insights = data;
  },
  SET_CATEGORIES(state, data) {
    state.categories = data;
  },
  SET_CHART_VISUALIZATION(state, data) {
    state.chartVisualization = data;
  },
  SET_TRX_BY_CATEGORIES(state, data) {
    state.groupedTransactions = data;
  },
  SET_CURRENT_DATE_FILTER(state, data) {
    state.currentDateFilter = data;
  },
};
