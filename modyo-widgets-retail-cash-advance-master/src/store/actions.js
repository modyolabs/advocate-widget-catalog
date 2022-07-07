import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  DO_DATA_INITIALIZATION(context) {
    return new Promise(((resolve, reject) => {
      context.dispatch('GET_ACCOUNTS')
        .then(() => {
          context.dispatch('GET_CARDS')
            .then((cards) => {
              resolve(cards);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    }));
  },

  GET_ACCOUNTS(context) {
    context.commit('SET_ACCOUNTS', []);
    return axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/accounts`)
      .then((response) => {
        context.commit('SET_ACCOUNTS', response.data);
        return response;
      }, (err) => {
        throw err;
      });
  },

  GET_ADVANCE_DATA(context, payload) {
    return axios.post(`${BASE_URL}/api/v1/creditCards/cash-advance`, payload)
      .then((response) => {
        context.commit('SET_ADVANCE_AMOUNT', response.data.advanceAmount);
        context.commit('SET_MONTHLY_AMOUNT', response.data.monthlyAmount);
        context.commit('SET_RATE', response.data.rate);
        context.commit('SET_CAE', response.data.cae);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },

  GET_CARDS(context) {
    context.commit('SET_CARDS', []);
    return axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/creditCards`)
      .then((response) => {
        context.commit('SET_CARDS', response.data);
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
};
