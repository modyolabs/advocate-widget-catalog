const currencies = [
  {
    value: 'Peso',
    name: 'CLP',
  },
  {
    value: 'Dólar',
    name: 'USD',
  },
  {
    value: 'Euro',
    name: 'EUR',
  },
];

export default {
  accounts: [],
  amount: 0,
  fromAccount: null,
  toAccount: null,
  apiStatus: false,
  currencyFilter: currencies[0],
  currencies,
};
