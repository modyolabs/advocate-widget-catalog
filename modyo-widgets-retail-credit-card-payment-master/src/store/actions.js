/* eslint-disable no-useless-catch */
import axios from 'axios';
import liquidParser from '../liquid/liquidParser';

const LANG = liquidParser.parse('{{site.language}}');

const BASE_URL = LANG === 'es' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  DO_DATA_INITIALIZATION(context) {
    return new Promise(((resolve, reject) => {
      context.dispatch('GET_ACCOUNTS')
        .then(() => resolve)
        .catch(() => reject());
      context.dispatch('GET_CARDS')
        .then(() => {
          context.commit(
            'SET_ACTIVE_CARD_ID',
            context.state.cards[0].id,
          );
          resolve();
        })
        .catch(() => reject());
    }));
  },

  async GET_ACCOUNTS(context) {
    context.commit('SET_ACCOUNTS', []);

    try {
      const accounts = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/accounts`, { params: { 'filter[order]': 'accountType' } });
      context.commit('SET_ACCOUNTS', accounts.data);
      return accounts;
    } catch (error) {
      throw error;
    }
  },

  async GET_CARDS(context) {
    context.commit('SET_CARDS', []);

    try {
      const creditCards = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/creditCards`);
      context.commit('SET_CARDS', creditCards.data);
      return creditCards;
    } catch (err) {
      throw err;
    }
  },
};
