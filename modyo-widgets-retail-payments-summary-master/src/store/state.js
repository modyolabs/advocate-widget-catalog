import i18n from '../i18n';

const filter = [
  {
    name: i18n.t('ranges.last-3-months'),
    value: 3,
  },
  {
    name: i18n.t('ranges.last-6-months'),
    value: 6,
  },
  {
    name: i18n.t('ranges.last-9-months'),
    value: 9,
  },
  {
    name: i18n.t('ranges.last-12-months'),
    value: 12,
  },
];
const colors = [
  '#2E4553',
  '#5D6D7E',
  '#AEB6BF',
  '#D6DBDF',
  '#828B8E',
];

export default {
  companies: [],
  activity: {},
  averages: [],
  filterBy: filter,
  selectedFilter: filter[0],
  colorsGraph: colors,
};
