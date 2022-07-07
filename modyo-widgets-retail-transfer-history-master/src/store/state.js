import { subDays, format } from 'date-fns';
import i18n from '../i18n';

const DATE_FORMAT = 'yyyy-MM-dd';
const LANG = window.liquid ? window.liquid.lang : 'es-CL';

export default {
  banks: [],
  contacts: [],
  editingContact: {},
  editingContactMode: false,
  newContactMode: false,
  contactCreationRequested: false,
  fromDate: format(subDays(new Date(), 30), DATE_FORMAT),
  filterBy: { name: i18n.t('transactions-list.filters.all'), value: 'all' },
  paramClientId: 1,
  selectedContact: null,
  selectedTransaction: null,
  showContactPanel: false,
  showDatePicker: false,
  showSearch: false,
  toDate: format(new Date(), DATE_FORMAT),
  transactions: [],
  lang: LANG,
};
