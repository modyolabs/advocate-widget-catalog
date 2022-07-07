export default {
  activeAccount: (state) => state.accounts.find((account) => account.id === state.activeAccountId),
};
