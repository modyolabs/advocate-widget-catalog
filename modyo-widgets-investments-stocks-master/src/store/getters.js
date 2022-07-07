export default {
  investmentAccounts(state) {
    return state.accounts.filter((account) => account.class === 'investment');
  },
};
