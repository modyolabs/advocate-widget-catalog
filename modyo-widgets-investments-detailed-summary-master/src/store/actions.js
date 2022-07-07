/* eslint-disable no-useless-catch */
import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async FETCH_DATA(context) {
    context.commit('SET_IS_LOADING', true);
    try {
      await context.dispatch('GET_ACCOUNTS');
      await context.dispatch('GET_PRODUCTS');
      await context.dispatch('GET_CURRENCIES');
      context.commit('SET_IS_LOADING', false);
      return true;
    } catch (error) {
      throw error;
    }
  },

  async GET_ACCOUNTS(context) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/DetailedSummary/accounts`);
      context.commit('SET_ACCOUNTS', response.data.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async GET_PRODUCTS(context) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/DetailedSummary/products`);
      context.commit('SET_PRODUCTS', response.data.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async GET_CURRENCIES(context) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/DetailedSummary/currencies`);
      context.commit('SET_CURRENCIES', response.data.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
