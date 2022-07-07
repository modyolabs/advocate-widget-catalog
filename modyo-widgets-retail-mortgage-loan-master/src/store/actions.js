import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  GET_MORTGAGE_LOAN(context, payload) {
    return axios.post(`${BASE_URL}/api/v1/loans/mortgage-loan`, payload)
      .then((mortgage) => {
        context.commit('SET_INSTALLMENT', parseFloat(mortgage.data.installment));
        context.commit('SET_ANNUAL_RATE', parseFloat(mortgage.data.annualRate));
        context.commit('SET_MONTHLY_RATE', parseFloat(mortgage.data.monthlyRate));
        context.commit('SET_MONTHLY_AMOUNT', parseFloat(mortgage.data.monthlyAmount));
        context.commit('SET_LOAN_AMOUNT', parseFloat(mortgage.data.loanAmount));
        context.commit('SET_LOAN_PERCENTAGE', parseFloat(mortgage.data.loanPercentage));
        context.commit('SET_TOTAL_LOAN_AMOUNT', parseFloat(mortgage.data.totalLoanAmount));
        context.commit('SET_LOAN_COSTS', parseFloat(mortgage.data.loanCosts));
        context.commit('SET_PERCENTAGE_LOAN_COSTS', parseFloat(mortgage.data.percentageLoanCosts));
        context.commit('SET_EQUIVALENT_MONTHLY_RATE', parseFloat(mortgage.data.equivalentMonthlyRate));
        context.commit('SET_CAE', parseFloat(mortgage.data.cae));
        context.commit('SET_STAMP_TAX', parseFloat(mortgage.data.stampTax));
        context.commit('SET_NOTARY_FEE', parseFloat(mortgage.data.notaryFee));
        context.commit('SET_REAL_STATE_FEE', parseFloat(mortgage.data.realStateFee));
        context.commit('SET_APPRAISAL', parseFloat(mortgage.data.appraisal));
        context.commit('SET_DEED', parseFloat(mortgage.data.deed));
        context.commit('SET_ABSTRACT_OF_TITLE', parseFloat(mortgage.data.abstractOfTitle));
        context.commit('SET_TERM_LIFE_INSURANCE', mortgage.data.termLifeInsurance);
        context.commit('SET_UNEMPLOYMENT_INSURANCE', mortgage.data.unemploymentInsurance);
        context.commit('SET_HOMEOWNERS_INSURANCE', mortgage.data.homeownersInsurance);
        return mortgage.data;
      })
      .catch((error) => error);
  },
};
