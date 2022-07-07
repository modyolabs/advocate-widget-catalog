export default {
  setQuotes(state, payload) {
    state.quotes = payload;
  },
  setTableHeaders(state, payload) {
    state.tableHeaders = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
  setQuery(state, payload) {
    state.query = payload;
  },
  setStartDate(state, payload) {
    state.startDate = payload;
  },
  setEndDate(state, payload) {
    state.endDate = payload;
  },
  setSearchBy(state, payload) {
    state.searchBy = payload;
  },
  setStatus(state, payload) {
    state.status = payload;
  },
  setSortBy(state, payload) {
    state.sortBy = payload;
  },
  setPageCount(state, payload) {
    state.pageCount = payload;
  },
  setCurrentPage(state, payload) {
    switch (payload) {
      case 'next':
        state.currentPage += 1;
        break;
      case 'previous':
        state.currentPage -= 1;
        break;
      default:
        state.currentPage = payload;
    }
  },
};
