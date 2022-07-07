export default {
  fromAccount: (state) => state.accounts.find((account) => account.id === state.fromAccountId),
  toAccount: (state) => {
    if (state.toOthers && !state.toNewContact) {
      return state.contacts.find((contact) => contact.id === state.toAccountId);
    }
    if (state.toOthers && state.toNewContact) {
      return state.payeeAccount;
    }
    return state.accounts.find((account) => account.id === state.toAccountId);
  },
  sidebarComponent: (state) => {
    if (state.stepAction === 'select') {
      return 'TransferAccountSelector';
    }
    return 'TransferSummary';
  },
  mainComponent: (state) => {
    if (state.stepAction === 'select') {
      return 'TransferSelector';
    }
    if (state.stepAction === 'confirm') {
      return 'TransferConfirm';
    }

    return 'TransferVoucher';
  },
};
