const LANG = window.liquid ? window.liquid.lang : 'es-CL';

export default {
  selectedLoan: null,
  isLoadingLoans: false,
  paramClientId: 1,
  loans: [],
  lang: LANG,
};
