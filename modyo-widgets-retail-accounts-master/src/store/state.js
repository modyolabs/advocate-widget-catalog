import { subDays } from 'date-fns';
import i18n from '../i18n';

export default {
  accounts: [],
  activeAccountId: null,
  activeTab: 'movements',
  apiStatus: false,
  filterBy: { name: i18n.t('transactions-list.filters.all'), value: 'all' },
  fromDate: subDays(new Date(), 30),
  paramAccountId: 3,
  paramClientId: 1,
  showMovements: false,
  toDate: new Date(),
  transactions: [],
  selectedTransaction: null,
};
