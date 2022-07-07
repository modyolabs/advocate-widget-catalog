/* eslint-disable no-useless-catch */
import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async getData({ commit }) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/insurance-details`);
      commit('setFundsChangeHistory', response.data.data.fundsChangeHistory);
      commit('setFundsCurrentPortfolio', response.data.data.fundsCurrentPortfolio);
      commit('setStatements', response.data.data.statements);
      commit('setContractor', response.data.data.contractor);
      commit('setPolicy', response.data.data.policy);
      commit('setPolicyValueHistory', response.data.data.policyValueHistory);
      commit('setPolicyBalance', response.data.data.policyBalance);
      commit('setCustomPortfolio', response.data.data.customPortfolio);
      commit('setFunds', response.data.data.funds);
      return response.data.data;
    } catch (err) {
      throw err;
    }
  },
};
