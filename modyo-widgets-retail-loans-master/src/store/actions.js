/* eslint-disable no-useless-catch */
import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  DO_DATA_INITIALIZATION(context) {
    return new Promise(((resolve, reject) => {
      context.dispatch('GET_LOANS')
        .then(() => {
          resolve(context.state);
        })
        .catch((err) => reject(err));
    }));
  },

  async GET_LOANS(context) {
    context.commit('SET_LOADING_LOANS', true);
    context.commit('SET_LOANS', []);
    try {
      const loans = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/loans`);
      context.commit('SET_LOANS', loans.data);
      context.commit('SET_LOADING_LOANS', false);
      return loans.data;
    } catch (err) {
      throw err;
    }
  },
  async GET_LOAN_DATA(context, loanData) {
    try {
      const insurances = await axios.get(`${BASE_URL}/api/v1/loans/${loanData.id}/insurances`);
      return insurances;
    } catch (err) {
      throw err;
    }
  },
};
