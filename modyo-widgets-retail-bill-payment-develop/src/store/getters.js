export default {
  mainComponent: (state) => {
    if (state.stepAction === 'select') {
      return 'BillSummary';
    }
    if (state.stepAction === 'confirm') {
      return 'BillConfirm';
    }
    if (state.stepAction === 'selectAccount') {
      return 'SelectAccount';
    }
    return 'BillVoucher';
  },
};
