import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async GET_ACCOUNTS(context) {
    context.commit('SET_API_STATUS', 'isLoading');
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/MoneyAccounts`);
      if (response.data.data?.accounts.length <= 0) {
        context.commit('SET_API_STATUS', 'isEmpty');
      } else {
        context.commit('SET_ACCOUNTS', response.data.data.accounts);
        context.commit('SET_API_STATUS', false);
      }
      return response.data;
    } catch (error) {
      context.commit('SET_API_STATUS', 'hasError');
      return error;
    }
  },
};
