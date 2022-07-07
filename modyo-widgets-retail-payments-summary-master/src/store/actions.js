import dataEs from './mocks/data-es.json';
import dataEn from './mocks/data-en.json';
import dataActivityEs from './mocks/data-activity-es.json';
import dataActivityEn from './mocks/data-activity-en.json';
import liquidParser from '../liquid/liquidParser';

const LANG = liquidParser.parse('{{site.language}}');
const COMPANIES_DATA = LANG === 'es' ? dataEs : dataEn;
const ACTIVITY_DATA = LANG === 'es' ? dataActivityEs : dataActivityEn;

export default {

  INITIALIZE_DATA({ dispatch }) {
    dispatch('GET_COMPANIES');
    dispatch('GET_ACTIVITY');
  },
  GET_COMPANIES({ commit }) {
    const companies = COMPANIES_DATA;
    commit('SET_COMPANIES_DATA', companies);
  },
  GET_ACTIVITY({ commit }, range = 3) {
    const data = ACTIVITY_DATA;
    const activity = [];
    for (let i = 0; i < range; i += 1) {
      activity.push(data.activity[i]);
    }
    commit('SET_ACTIVITY_DATA', activity);
  },
};
