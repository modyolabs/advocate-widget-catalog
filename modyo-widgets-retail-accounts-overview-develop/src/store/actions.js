/* eslint-disable no-useless-catch */
import axios from 'axios';
import liquidParser from '../liquid/liquidParser';
// Simulate total budget activity endpoint
import totalBudgetAccountsEs from '../mocks/general-activity-es.json';
import totalBudgetAccountsEn from '../mocks/general-activity-en.json';

// Simulate single account activity endpoint
import activityPerAccountEs from '../mocks/single-activity-es.json';
import activityPerAccountEn from '../mocks/single-activity-en.json';

// Simulate categories endpoint
import categoriesEs from '../mocks/categories-es.json';
import categoriesEn from '../mocks/categories-en.json';

// Simulate insights endpoint
import insightsEs from '../mocks/insights-es.json';
import insightsEn from '../mocks/insights-en.json';

const LANG = liquidParser.parse('{{site.language}}');

const TOTAL_BUDGET = LANG === 'es' ? totalBudgetAccountsEs : totalBudgetAccountsEn;
const ACTIVITY_PER_ACCOUNTS = LANG === 'es' ? activityPerAccountEs : activityPerAccountEn;
const INSIGHTS = LANG === 'es' ? insightsEs : insightsEn;
const CATEGORIES = LANG === 'es' ? categoriesEs : categoriesEn;
const TRANSACTIONS_API = LANG === 'es' ? 'https://api-bank.herokuapp.com/api/v1/' : 'https://dynamic-bank-api.herokuapp.com/api/v1/';

export default {
  DO_DATA_INITIALIZATION({ dispatch }) {
    try {
      dispatch('GET_TOTAL_BUDGET');
      dispatch('GET_INSIGHTS');
      return true;
    } catch (e) {
      return e;
    }
  },

  GET_TRANSACTIONS(context) {
    return axios.get(`${TRANSACTIONS_API}/accounts/1/movements/`)
      .then((response) => {
        context.commit('SET_TRANSACTIONS', response.data);
      }).catch((err) => {
        throw err;
      });
  },

  GET_TOTAL_BUDGET({ commit }) {
    commit('SET_TOTAL_BUDGET', TOTAL_BUDGET.total);
    commit('SET_TOTAL_BUDGET_ACCOUNTS', TOTAL_BUDGET.accounts);
    return TOTAL_BUDGET;
  },

  async GET_ACCOUNT_ACTIVITY({ commit, dispatch }, id) {
    const account = ACTIVITY_PER_ACCOUNTS.find((item) => item.id === id);
    if (account) {
      await dispatch('GET_TRX_BY_CATEGORIES', account);
      commit('SET_SELECTED_ACCOUNT', account);
      commit('SET_OVERVIEW_VIEW', 'single');
      return account;
    }
    return 'No matches';
  },

  GET_CATEGORIES({ commit }) {
    commit('SET_CATEGORIES', CATEGORIES);
    return CATEGORIES;
  },

  GET_INSIGHTS({ commit }) {
    commit('SET_INSIGHTS', INSIGHTS);
    return INSIGHTS;
  },

  async GET_TRX_BY_CATEGORIES({ commit, dispatch }, account) {
    const categories = await dispatch('GET_CATEGORIES');

    const grouped = {};
    account.trx.forEach(({ categoryId: id, amount }) => {
      if (grouped[id]) {
        grouped[id].total += Number(amount);
      } else {
        grouped[id] = {
          total: Number(amount),
          color: categories[id].color,
          category: categories[id].name,
        };
      }
    });
    commit('SET_TRX_BY_CATEGORIES', grouped);
    return grouped;
  },
};
