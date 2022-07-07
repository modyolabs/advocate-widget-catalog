import liquidParser from '../liquid/liquidParser';

const LANG = liquidParser.parse('{{site.language}}');

export default {
  accounts: [],
  activeAccountId: null,
  activeCardId: null,
  amount: 0,
  amountOption: '',
  cards: [],
  isLoading: true,
  paramCardId: 1,
  paramClientId: 1,
  sendVoucher: false,
  selectedDebt: LANG === 'es' ? 'national' : 'international',
  step: { value: 1 },
  stepsCount: 3,
  stepAction: 'select',
  stepper: {},
  lang: LANG,
};
