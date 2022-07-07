<template>
  <div class="dashboard-filters border-bottom">
    <div class="container">
      <div class="row pt-lg-1 pb-lg-3 align-items-center align-items-lg-end justify-content-between flex-nowrap">
        <search-by
          :search-options="searchOptions"
          @search="setSearch"
          @clear-search="setSearch" />

        <filter-by
          :status-options="statusOptions"
          :max-date="maxDate"
          :start-date="startDate"
          :end-date="endDate"
          @set-filters="setFilters" />

        <sort-by
          :sort-options="sortOptions"
          @sort="setSort" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import FilterBy from './FilterBy.vue';
import SearchBy from './SearchBy.vue';
import SortBy from './SortBy.vue';

export default {
  name: 'DashboardFilters',
  components: {
    SortBy,
    SearchBy,
    FilterBy,
  },
  computed: {
    ...mapState([
      'query',
      'startDate',
      'endDate',
      'maxDate',
      'searchBy',
      'searchOptions',
      'status',
      'statusOptions',
      'sortBy',
      'sortOptions',
    ]),
  },
  methods: {
    ...mapMutations([
      'setQuery',
      'setStartDate',
      'setEndDate',
      'setSearchBy',
      'setStatus',
      'setSortBy',
    ]),

    ...mapActions(['getQuotes']),

    setSearch(payload) {
      this.setQuery(payload.query);
      this.setSearchBy(payload.field);
      this.getQuotes();
    },

    setFilters(payload) {
      this.setStatus(payload.status);
      this.setStartDate(payload.start);
      this.setEndDate(payload.end);
      this.getQuotes();
    },

    setSort(payload) {
      this.setSortBy(payload.sortBy);
      this.getQuotes();
    },
  },
};

</script>
