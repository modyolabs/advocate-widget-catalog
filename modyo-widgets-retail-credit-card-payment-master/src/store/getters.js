export default {
  activeCard: (state) => state.cards.find((card) => card.id === state.activeCardId),
  activeAccount: (state) => state.accounts.find((account) => account.id === state.activeAccountId),
  sidebarComponent: (state) => {
    if (state.stepAction === 'select') {
      return 'PaymentCardSelector';
    }
    return 'PaymentSummary';
  },
  mainComponent: (state) => {
    if (state.stepAction === 'select') {
      return 'PaymentSelector';
    }
    if (state.stepAction === 'confirm') {
      return 'PaymentConfirm';
    }

    return 'PaymentVoucher';
  },
};
