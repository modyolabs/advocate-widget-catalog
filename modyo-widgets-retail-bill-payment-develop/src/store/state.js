import liquidParser from '../liquid/liquidParser';

const LANG = liquidParser.parse('{{site.language}}');

export default {
  bills: [],
  activeTab: 'addAccount',
  companies: [],
  categories: [],
  isLoading: true,
  isLoadingBills: false,
  sendVoucher: false,
  selectedDebt: LANG === 'es' ? 'national' : 'international',
  step: 1,
  stepAction: 'select',
  lang: LANG,
  accounts: LANG === 'es' ? ['Ahorros', 'Corriente'] : ['Savings', 'Transfer'],
};
