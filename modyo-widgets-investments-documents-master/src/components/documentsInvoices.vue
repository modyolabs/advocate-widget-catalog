<template>
  <div id="documents__invoices">
    <div class="d-flex justify-content-between">
      <h3 class="h5 mb-4 text-primary d-none d-lg-block">
        <strong>{{ $t('documents.invoices.title') }}</strong>
      </h3>
    </div>

    <list-filters
      :date-filter="dateFilter"
      :is-range="isRange"
      view="date"
      :filters="filters"
      :currency-filter="currencyFilter"
      @change="fetchDocuments" />

    <m-response-control
      v-if="apiStatus"
      class="text-center"
      :status="apiStatus">
      <template #loading>
        <div class="loading-icon d-flex justify-content-center align-content-center mt-5">
          <div
            class="spinner-border text-primary"
            role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </template>
      <template #error>
        <div class="mt-4">
          <p
            class="h5 font-weight-light bg-white rounded p-5 no-documents-alert text-center">
            {{ $t('commons.try-again') }}
          </p>
        </div>
      </template>
      <template #empty>
        <div class="mt-4">
          <p
            class="h5 font-weight-light bg-white rounded p-5 no-documents-alert text-center">
            {{ $t('commons.no-documents-on-period') }}
          </p>
        </div>
      </template>
    </m-response-control>

    <div
      v-else
      class="mt-4 mt-lg-0">
      <div
        v-for="(item, index) in filteredDocuments"
        :key="item.id"
        class="documents__invoices-item row no-gutters align-items-center
        p-2 px-lg-3 bg-white rounded"
        :class="index!=filteredDocuments.length-1 ? 'mb-2' : false">
        <p class="col col-4 mb-0 light">
          {{ item.date | date }}
        </p>
        <p class="col col-3 mb-0 text-center">
          {{ item.name }}
        </p>
        <p class="col col-3 mb-0 text-center">
          {{ $t('commons.number_abbr') }} {{ item.number }}
        </p>
        <div class="col col-2 text-right">
          <a
            :href="item.document"
            class="btn btn-secondary"
            target="_blank">
            <font-awesome-icon
              icon="file-pdf"
              class="mr-lg-2" />
            <span class="d-none d-lg-inline-block">{{ $t('commons.download') }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { subMonths } from 'date-fns';
import { date, debounce, MResponseControl } from '@modyo/financial-commons';
import listFilters from './listFilters.vue';

export default {
  name: 'DocumentsInvoices',
  filters: {
    date,
  },
  components: {
    listFilters,
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
      filteredDocuments: [],
      dateFilter: true,
      isRange: true,
      filters: [
        { label: this.$t('commons.all'), value: 'all' },
        { label: this.$t('commons.purchases'), value: 'purchase' },
        { label: this.$t('commons.sales'), value: 'sale' },
      ],
      currencyFilter: [
        { label: 'CLP', value: 'clp' },
        { label: 'USD', value: 'usd' },
        { label: 'EUR', value: 'eur' },
      ],
    };
  },
  computed: {
    documents() {
      return this.$store.state.documents;
    },
    activeFilter() {
      return this.$store.state.activeFilter;
    },
    activeCurrencyFilter() {
      return this.$store.state.activeCurrencyFilter;
    },
    fromDate() {
      return this.$store.state.fromDate;
    },
    toDate() {
      return this.$store.state.toDate;
    },
  },
  watch: {
    activeFilter: 'filterDocuments',
    activeCurrencyFilter: 'filterDocuments',
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.commit('SET_FROM_DATE', subMonths(new Date(), 1));
    this.$store.commit('SET_TO_DATE', new Date());
    this.$store.commit('SET_MAX_TO_DATE', new Date());
    this.$store.commit('SET_FILTER', 'all');
    this.fetchDocuments();
  },
  methods: {
    updateFrom(newDate) {
      this.fromDate = newDate;
      this.fetchDocuments();
    },

    updateTo(newDate) {
      this.toDate = newDate;
      this.fetchDocuments();
    },

    filterDocuments() {
      this.filteredDocuments = [];
      if (this.activeFilter !== 'all') {
        this.filteredDocuments = this.documents.filter(
          (item) => item.tag === this.activeFilter && item.amount.currency === this.activeCurrencyFilter,
        );
      } else {
        this.filteredDocuments = this.documents.filter((item) => item.amount.currency === this.activeCurrencyFilter);
      }
    },

    fetchDocuments: debounce(function fetchDocs() {
      const ep = 'electronicInvoice';
      this.$store.dispatch('GET_DOCUMENTS', {
        enpoint: ep,
        params: {
          from: this.fromDate,
          to: this.toDate,
        },
      }).then(() => {
        this.filterDocuments();
        this.apiStatus = !this.documents.length ? 'isEmpty' : false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
    }, 300),
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

@media (max-width: 991.98px) {
  .documents__invoices-item,
  .no-documents-alert {
    border: 1px solid $primary-10;
  }
}
</style>
