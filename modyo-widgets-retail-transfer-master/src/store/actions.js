/* eslint-disable no-useless-catch */
import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = (LANG === 'es-CL') ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async DO_DATA_INITIALIZATION(context) {
    try {
      const accounts = await context.dispatch('GET_ACCOUNTS');
      const contacts = await context.dispatch('GET_CONTACTS');
      const banks = await context.dispatch('GET_BANKS');
      localStorage.clear();
      return [
        accounts,
        contacts,
        banks,
      ];
    } catch (err) {
      throw err;
    }
  },

  async GET_ACCOUNTS(context) {
    context.commit('SET_ACCOUNTS', []);

    try {
      const accounts = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/accounts`, {
        params: {
          'filter[order]': 'id ASC',
        },
      });
      context.commit('SET_ACCOUNTS', accounts.data);

      return accounts;
    } catch (error) {
      throw error;
    }
  },

  async GET_CONTACTS(context) {
    context.commit('SET_CONTACTS', []);

    try {
      const contacts = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/payees`, {
        params: {
          'filter[include]': 'bank',
          'filter[order]': 'fullname',
        },
      });
      context.commit('SET_CONTACTS', contacts.data);

      return contacts;
    } catch (error) {
      throw error;
    }
  },

  async ADD_CONTACT(context, contact) {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/payees`, contact);
      return response;
    } catch (error) {
      return error;
    }
  },

  async GET_BANKS(context) {
    context.commit('SET_BANKS', []);

    try {
      const banks = await axios.get(`${BASE_URL}/api/v1/banks`, {
        params: {
          'filter[order]': 'name ASC',
        },
      });
      context.commit('SET_BANKS', banks.data);

      return banks;
    } catch (error) {
      throw error;
    }
  },
};
