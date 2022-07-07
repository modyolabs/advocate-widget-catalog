const LANG = window.liquid ? window.liquid.lang : 'es-CL';

export default {
  accounts: [],
  fromAccount: null,
  toAccount: null,
  amount: 0,
  isLoadingAccounts: true,
  lang: LANG,
  banks: [
    {
      id: 'bch',
      name: 'Banco de Chile',
      img: '/ab0cb6b5-a358-4df7-ad04-e45eced6d8be/original/1.jpg',
    },
    {
      id: 'santander',
      name: 'Santander',
      img: '/fd155d1c-5db3-468d-84a8-fa9e5d83792b/original/santander.jpg',
    },
    {
      id: 'bci',
      name: 'Banco de Crédito e Inversiones',
      img: '/901ce6dd-b5ed-452e-935c-51cc43ed112c/original/Bci.jpg',
    },
    {
      id: 'bbva',
      name: 'Banco Bilbao Vizcaya Argentaria',
      img: '/d8fa8e6f-2809-47c1-856b-8119881e1458/original/bbva.jpg',
    },
    {
      id: 'scotiabank',
      name: 'Scotiabank',
      img: '/1fa4fc21-9a24-4c00-b288-e922cc1458b4/original/scotiabank.jpg',
    },
    {
      id: 'bice',
      name: 'Banco Industrial y de Comercio Exterior',
      img: '/d2aec47a-83a6-49df-bd9b-c20e18167daf/original/bice.jpg',
    },
  ],
};
