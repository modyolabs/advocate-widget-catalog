export default {
  SET_STOCKS(state, data) {
    state.stocks = data;
  },

  SET_SELECTED_STOCK(state, stock) {
    state.selectedStock = stock;
  },

  SET_GRAPHIC_DATA(state, data) {
    state.graphicData = data;
  },

  SET_ACCOUNTS(state, data) {
    state.accounts = data.accounts;
  },
};
