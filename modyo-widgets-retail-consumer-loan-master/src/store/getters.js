const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const isLangEn = () => LANG === 'en-US';

export default {
  showMinMessage(state, getters) {
    return (state.amount < getters.minAmount);
  },
  showMaxMessage(state, getters) {
    return (state.amount > getters.available);
  },
  isLangEn,
  minAmount() {
    if (isLangEn()) {
      return 10000;
    }
    return 100000;
  },
  available() {
    if (isLangEn()) {
      return 100000;
    }
    return 10000000;
  },
};
