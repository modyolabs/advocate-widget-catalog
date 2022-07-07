import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  GET_SUMMARY(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/GeneralSummary`)
        .then((response) => {
          context.commit('SET_SUMMARY', response.data.data);
          resolve(response.data);
        }, (err) => {
          reject(err);
        });
    }));
  },
  GET_EVOLUTION(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/InvestmentEvolution`)
        .then((response) => {
          context.commit('SET_EVOLUTION', response.data.data);
          resolve(response.data.data);
        }, (err) => {
          reject(err);
        });
    }));
  },
};
