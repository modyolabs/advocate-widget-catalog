import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  GET_ACCOUNTS(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/MoneyAccounts`)
        .then((response) => {
          context.commit('SET_ACCOUNTS', response.data.data.accounts);
          context.commit('SET_FROM_ACCOUNT', response.data.data.accounts[0]);
          resolve(response.data);
        }, (err) => {
          reject(err);
        });
    }));
  },
};
