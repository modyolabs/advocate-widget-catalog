import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  DO_DATA_INITIALIZATION(context) {
    return new Promise(((resolve, reject) => {
      context.dispatch('GET_ACCOUNTS')
        .then((accounts) => {
          resolve(accounts);
        })
        .catch((err) => reject(err));
    }));
  },
  GET_ACCOUNTS(context) {
    return axios.get(`${BASE_URL}/api/v1/clients/${context.state.paramClientId}/accounts`)
      .then((accounts) => {
        context.commit('SET_ACCOUNTS', accounts.data);
        return accounts;
      })
      .catch((err) => err);
  },
  GET_LOANS(context, payload) {
    return axios.post(`${BASE_URL}/api/v1/loans/consumer-loan`, payload)
      .then((loan) => {
        context.commit('SET_INTEREST_RATE', loan.data.interestRate);
        context.commit('SET_INSTALLMENT', loan.data.installment);
        context.commit('SET_ANNUAL_RATE', loan.data.annualRate);
        context.commit('SET_MONTHLY_AMOUNT', loan.data.monthlyAmount);
        context.commit('SET_TOTAL_LOAN_AMOUNT', loan.data.totalLoanAmount);
        context.commit('SET_LOAN_COSTS', loan.data.loanCosts);
        context.commit('SET_PERCENTAGE_LOAN_COSTS', loan.data.percentageLoanCosts);
        context.commit('SET_CAE', loan.data.cae);
        context.commit('SET_STAMP_TAX', loan.data.stampTax);
        context.commit('SET_NOTARY_FEE', loan.data.notaryFee);
        context.commit('SET_MONTHLY_RATE', loan.data.monthlyRate);
        context.commit('SET_DISGRACE_INSURANCE', loan.data.disgraceInsurance);
        context.commit('SET_UNEMPLOYMENT_INSURANCE', loan.data.unemploymentInsurance);
        return loan;
      });
  },
};
