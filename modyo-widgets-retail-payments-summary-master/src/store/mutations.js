export default {
  SET_COMPANIES_DATA(state, data) {
    state.companies = data;
  },
  SET_ACTIVITY_DATA(state, data) {
    state.activity = data;
  },
  SET_AVERAGES_DATA(state, data) {
    state.averages = data.averages;
  },
  SET_RANGE(state, data) {
    state.selectedFilter = data;
  },
};
