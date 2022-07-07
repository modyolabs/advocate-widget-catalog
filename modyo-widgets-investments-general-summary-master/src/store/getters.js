/* eslint-disable no-param-reassign */
export default {
  total(state) {
    return state.summary.total;
  },

  accounts(state) {
    const arr = state.summary.accounts;
    arr.forEach((item, index) => {
      item.color = ['', state.chartColors[index]];
    });
    return arr;
  },

  products(state) {
    const arr = state.summary.products;
    arr.forEach((item, index) => {
      item.color = ['', state.chartColors[index]];
    });
    return arr;
  },

  currencies(state) {
    const arr = state.summary.currencies;
    arr.forEach((item, index) => {
      item.color = ['', state.chartColors[index]];
    });
    return arr;
  },

  annualy(state) {
    return state.evolution.evolution.annualy;
  },

  monthly(state) {
    return state.evolution.evolution.monthly;
  },

};
