export default {
  SET_CONTACTS(state, data) {
    state.contacts = data;
  },
  SET_SELECTED_CONTACT(state, data) {
    state.selectedContact = data;
  },
  SET_FROM_DATE(state, data) {
    state.fromDate = data;
  },
  SET_FILTER_BY(state, data) {
    state.filterBy = data;
  },
  SET_SHOW_SEARCH(state, data) {
    state.showSearch = data;
  },
  SET_SHOW_DATE_PICKER(state, data) {
    state.showDatePicker = data;
  },
  SET_TRANSACTIONS(state, data) {
    state.transactions = data;
  },
  SET_TO_DATE(state, data) {
    state.toDate = data;
  },
  SET_SELECTED_TRANSACTION(state, data) {
    state.selectedTransaction = data;
  },
  SET_EDITING_CONTACT(state, data) {
    state.editingContact = data;
  },
  SET_EDITING_CONTACT_MODE(state, value) {
    state.editingContactMode = value;
  },
  SET_NEW_CONTACT_MODE(state, value) {
    state.newContactMode = value;
  },
  SET_SHOW_CONTACT_PANEL(state, data) {
    state.showContactPanel = data;
  },
  SET_BANKS(state, data) {
    state.banks = data;
  },
  REMOVE_CONTACT(state, contact) {
    state.contacts.splice(state.contacts.indexOf(contact), 1);
  },
  SET_CONTACT_CREATION_REQUESTED(state, value) {
    state.contactCreationRequested = value;
  },
};
