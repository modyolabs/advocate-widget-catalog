import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  GET_STOCKS(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/StocksList`)
        .then((response) => {
          const allStocks = response.data.data.stocks;
          const filteredStocks = allStocks.filter((stock, i) => i % 5 === 0);
          context.commit('SET_STOCKS', filteredStocks);
          resolve(filteredStocks);
        }, (err) => {
          reject(err);
        });
    }));
  },

  GET_GRAPHIC_DATA(context, payload) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/GraphicData`, {
        params: {
          id: payload.stockId,
          valor: payload.quotaAmount,
        },
      })
        .then((response) => {
          context.commit('SET_GRAPHIC_DATA', response.data.data);
          resolve(response.data);
        }, (err) => {
          reject(err);
        });
    }));
  },

  GET_ACCOUNTS(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/MoneyAccounts`)
        .then((response) => {
          context.commit('SET_ACCOUNTS', response.data.data);
          resolve(response.data);
        }, (err) => {
          reject(err);
        });
    }));
  },
};
