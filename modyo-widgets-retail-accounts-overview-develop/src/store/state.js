import { sub, format } from 'date-fns';
import liquidParser from '../liquid/liquidParser';

const LANG = liquidParser.parse('{{site.language}}');

export default {
  lang: LANG,
  totalBudget: {},
  totalBudgetAccounts: [],
  selectedAccount: {},
  groupedTransactions: {},
  transactions: [],
  insights: [],
  chartVisualization: {
    overview: true,
    accounts: false,
  },
  currentView: {
    overview: 'general',
    singleChart: 'balance',
  },
  dateRange: {
    start: format(sub(new Date(), { years: 1 }), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd'),
  },
  chartRef: {},
  bottomSheetRef: {},
  categories: {},
  currentDateFilter: 1,
};
