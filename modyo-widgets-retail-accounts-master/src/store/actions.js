import axios from 'axios';
import { addDays } from 'date-fns';
import liquidParser from '../liquid/liquidParser';

const LANG = liquidParser.parse('{{site.language}}');
const BASE_URL = LANG === 'es' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  DO_DATA_INITIALIZATION(context) {
    return new Promise(((resolve, reject) => {
      context.dispatch('GET_ACCOUNTS')
        .then(() => {
          context.dispatch('GET_TRANSACTIONS');
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }));
  },

  GET_ACCOUNTS(context) {
    context.commit('SET_ACCOUNTS', []);

    return axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/accounts`, {
      params: {
        'filter[order]': 'accountType',
      },
    })
      .then((response) => {
        context.commit('SET_ACCOUNTS', response.data);
        context.commit('SET_ACTIVE_ACCOUNT_ID', response.data[0].id);
      })
      .catch((err) => {
        throw err;
      });
  },

  GET_RELATED_ACCOUNTS(context) {
    context.commit('SET_ACCOUNTS', []);
    return axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/accounts`, {
      params: {
        'filter[include]': 'relatedAccount',
      },
    })
      .then((response) => {
        const accounts = response.data
          .filter((account) => account.relatedAccount)
          .map((account) => account.relatedAccount);
        context.commit('SET_ACCOUNTS', accounts);
        context.commit('SET_ACTIVE_ACCOUNT_ID', accounts[0].id);
        context.dispatch('GET_TRANSACTIONS')
          .then((movements) => movements)
          .catch((err) => err);
      })
      .catch((err) => err);
  },

  GET_TRANSACTIONS(context) {
    context.commit('SET_TRANSACTIONS', []);
    context.commit('SET_API_STATUS', 'isLoading');
    context.commit('SET_IS_LOADING_TRANSACTIONS', true);

    return axios.get(`${BASE_URL}/api/v1/accounts/${context.state.activeAccountId}/movements/`, {
      params: {
        from: new Date(context.state.fromDate),
        to: addDays(new Date(context.state.toDate), 1),
      },
    })
      .then((response) => {
        context.commit('SET_IS_LOADING_TRANSACTIONS', false);
        if (response.data.length <= 0) {
          context.commit('SET_API_STATUS', 'isEmpty');
        } else {
          context.commit('SET_API_STATUS', false);
          context.commit('SET_TRANSACTIONS', response.data);
        }
        return response;
      })
      .catch((err) => {
        context.commit('SET_API_STATUS', 'hasError');
        throw err;
      });
  },

  GET_STATEMENTS(context) {
    context.commit('SET_TRANSACTIONS', []);
    context.commit('SET_API_STATUS', 'isLoading');
    context.commit('SET_IS_LOADING_TRANSACTIONS', true);

    return axios.get(`${BASE_URL}/api/v1/accounts/${context.state.activeAccountId}/statements/`)
      .then((response) => {
        context.commit('SET_IS_LOADING_TRANSACTIONS', false);
        if (response.data.length <= 0) {
          context.commit('SET_API_STATUS', 'isEmpty');
        } else {
          context.commit('SET_API_STATUS', false);
          context.commit('SET_TRANSACTIONS', response.data);
        }
        return response;
      })
      .catch((err) => {
        context.commit('SET_API_STATUS', 'hasError');

        throw err;
      });
  },
};
