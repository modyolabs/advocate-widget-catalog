/* eslint-disable no-useless-catch */
// import axios from 'axios';
import liquidParser from '../liquid/liquidParser';
import dataEs from './data-es.json';
import dataEn from './data-en.json';

const LANG = liquidParser.parse('{{site.language}}');
// const BASE_URL = 'http://localhost:3000';
// const BASE_URL = LANG === 'es' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';
const BASE_DATA = LANG === 'es' ? dataEs : dataEn;

export default {
  DO_DATA_INITIALIZATION(context) {
    return new Promise((resolve, reject) => {
      context.dispatch('GET_CATEGORIES')
        .then(() => resolve)
        .catch(() => reject());
    });
  },

  // eslint-disable-next-line no-unused-vars
  async GET_AMOUNT(accountNumber) {
    const date = new Date();
    const price = Math.ceil(date.getMilliseconds() * Math.random()) * 100;
    return price;
  },

  async GET_CATEGORIES(context) {
    try {
      // const categories = await axios.get(`${BASE_URL}/api/v1/BillCategories`);
      // context.commit('SET_CATEGORIES', categories.data);
      const categories = BASE_DATA.billCategories;
      context.commit('SET_CATEGORIES', categories);
      return categories;
    } catch (error) {
      throw error;
    }
  },
  async GET_COMPANIES(context, category) {
    try {
      // const companies = await axios.get(`${BASE_URL}/api/v1/BillCompanies`);
      // context.commit('SET_COMPANIES', companies.data);
      const companies = BASE_DATA.companies[category.name] || BASE_DATA.companies.Default;
      context.commit('SET_COMPANIES', companies);
      return companies;
    } catch (error) {
      throw error;
    }
  },
};
