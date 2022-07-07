/* eslint-disable no-useless-catch */
import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async GET_MOVEMENTS(context, { from, to }) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/TransferMovements`, {
        headers: {
          'Accept-Language': LANG,
        },
        params: {
          from,
          to,
        },
      });
      context.commit('SET_MOVEMENTS', response.data.data.transfers);
      return response.data.data;
    } catch (err) {
      throw err;
    }
  },
};
