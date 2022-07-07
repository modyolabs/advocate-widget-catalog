import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async getQuotes({ commit, state }) {
    commit('setIsLoading', true);
    commit('setQuotes', []);

    try {
      const response = await axios.get(`${BASE_URL}/api/v1/broker-quotes`, {
        params: {
          field: state.searchBy.value,
          query: state.query,
          status: state.status.value,
          start: state.startDate,
          end: state.endDate,
          sortBy: state.sortBy.value,
          currentPage: state.currentPage,
          offset: state.offset,
        },
      });
      commit('setQuotes', response.data.data);
      commit('setPageCount', response.data.meta.pageCount);
      commit('setIsLoading', false);
      return response;
    } catch (err) {
      return err;
    }
  },
};
