export default {
  originAccounts(state) {
    return state.accounts.filter((account) => account.class === 'investment');
  },
  targetAccounts(state) {
    return state.accounts;
  },
};
