import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

// const BASE_URL = 'http://localhost:3000';

const RISK_TABLE = LANG === 'es-CL'
  ? 'https://company.modyo.cloud/api/content/spaces/widgets-es/types/tabla-de-riesgos/entries/89c9df21-595d-4d02-a588-d471ca1c0fb7'
  : 'https://company.modyo.cloud/api/content/spaces/widgets-en/types/risk-table/entries/56130fca-2f4c-4f45-bcef-06fbfb8c158f';

export default {
  GET_DOCUMENTS(context, payload) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/${payload.enpoint}`, {
        params: payload.params,
      })
        .then((response) => {
          context.commit('SET_DOCUMENTS', response.data.data.documents);
          resolve(response.data);
        }, (err) => {
          reject(err);
        });
    }));
  },

  GET_UNSIGN_DOCUMENTS(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/signDocuments`, {
        params: { tag: 'unsigned' },
      })
        .then((response) => {
          context.commit('SET_UNSIGN_DOCUMENTS', response.data.data.documents);
          resolve(response.data.data.documents);
        }, (err) => {
          reject(err);
        });
    }));
  },

  GET_RISK_TABLE_DATA(context) {
    return new Promise(((resolve, reject) => {
      axios.get(RISK_TABLE)
        .then((response) => {
          context.commit('SET_RISK_TABLE', response.data);
          resolve(response.data);
        }, (err) => {
          reject(err);
        });
    }));
  },
};
