export default {
  depositAccounts(state) {
    return state.accounts.filter((account) => account.class === 'investment');
  },
};
