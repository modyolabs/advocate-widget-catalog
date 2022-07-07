export default {
  quotes: [],
  tableHeaders: [
    {
      title: 'brokerName',
      hidden: false,
      id: '1',
    },
    {
      title: 'brokerId',
      hidden: false,
      id: '2',
    },
    {
      title: 'totalCost',
      hidden: false,
      id: '3',
    },
    {
      title: 'status',
      hidden: false,
      id: '4',
    },
    {
      title: 'quoteId',
      hidden: false,
      id: '5',
    },
    {
      title: 'modificationDate',
      hidden: false,
      id: '6',
    },
    {
      title: 'actions',
      hidden: true,
      id: '7',
    },
  ],
  isLoading: true,
  query: '',
  startDate: new Date((new Date()).setDate((new Date()).getDate() - 30)),
  endDate: new Date(),
  maxDate: new Date(),
  searchBy: { name: 'quote-id', value: 'quoteId' },
  searchOptions: [
    { name: 'quote-id', value: 'quoteId' },
    { name: 'broker-id', value: 'brokerId' },
    { name: 'broker-name', value: 'brokerName' },
  ],
  status: { name: 'Todas', value: 'all' },
  statusOptions: [
    { name: 'all', value: 'all' },
    { name: 'approved', value: 'approved' },
    { name: 'expired', value: 'expired' },
    { name: 'draft', value: 'draft' },
    { name: 'preEmission', value: 'preEmission' },
  ],
  sortBy: { name: 'newest', value: 'newest' },
  sortOptions: [
    { name: 'newest', value: 'newest' },
    { name: 'oldest', value: 'oldest' },
    { name: 'name-a-z', value: 'a-z' },
    { name: 'name-z-a', value: 'z-a' },
  ],
  currentPage: 1,
  offset: 5,
  pageCount: 0,
  visiblePagesCount: 5,
};
