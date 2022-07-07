/* eslint-disable no-useless-catch */
import axios from 'axios';
import { addDays, format, parseISO } from 'date-fns';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';
const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
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
      return contacts.data;
    } catch (err) {
      throw err;
    }
  },
  async GET_TRANSACTIONS(context) {
    context.commit('SET_IS_LOADING_TRANSACTIONS', true);
    context.commit('SET_TRANSACTIONS', []);
    try {
      const transactions = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/transfers/`, {
        params: {
          from: context.state.fromDate,
          to: format(addDays(parseISO(context.state.toDate), 1), 'yyyy-MM-dd'),
        },
      });
      context.commit('SET_TRANSACTIONS', transactions.data);
      context.commit('SET_IS_LOADING_TRANSACTIONS', false);
      return transactions.data;
    } catch (err) {
      return err;
    }
  },
  async GET_SCHEDULED_TRANSFERS(context) {
    context.commit('SET_IS_LOADING_TRANSACTIONS', true);
    context.commit('SET_TRANSACTIONS', []);
    try {
      const transactions = await axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/scheduledTransactions/`);
      context.commit('SET_TRANSACTIONS', transactions.data);
      context.commit('SET_IS_LOADING_TRANSACTIONS', false);
      return transactions;
    } catch (err) {
      return err;
    }
  },
  async GET_BANKS(context) {
    try {
      const banks = await axios.get(`${BASE_URL}/api/v1/banks`, {
        params: {
          'filter[order]': 'name ASC',
        },
      });
      context.commit('SET_BANKS', banks.data);
      return banks;
    } catch (err) {
      return err;
    }
  },
  async ADD_CONTACT(context, contact) {
    try {
      context.commit('SET_CONTACT_CREATION_REQUESTED', true);
      const response = await axios.post(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/payees`, contact);
      context.commit('SET_CONTACT_CREATION_REQUESTED', false);
      return response;
    } catch (error) {
      return error;
    }
  },

  async EDIT_CONTACT(context, contact) {
    try {
      await axios.patch(`${BASE_URL}/api/v1/payees/${contact.id}`, contact);
      return contact;
    } catch (error) {
      return error;
    }
  },

  async REMOVE_CONTACT(context, contact) {
    try {
      await axios.delete(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/payees/${contact.id}`);
      context.commit('REMOVE_CONTACT', contact);
      return context.state.contacts;
    } catch (error) {
      return error;
    }
  },
};
