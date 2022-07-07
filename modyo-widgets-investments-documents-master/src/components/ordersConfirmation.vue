<template>
  <div id="documents__orders-confirmation">
    <h3 class="h5 mb-4 text-primary d-none d-lg-block">
      <strong>{{ $t('documents.orders-confirmation.title') }}</strong>
    </h3>

    <list-filters
      :date-filter="dateFilter"
      :is-range="isRange"
      view="date"
      :filters="filters"
      :active-filter="activeFilter"
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
      class="mt-4">
      <div
        v-for="(item, index) in filteredDocuments"
        :key="item.id"
        class="documents__orders-confirmation-item d-flex
        mb-lg-2 p-2 px-lg-3 bg-white rounded flex-column flex-xl-row"
        :class="index != filteredDocuments.length-1 ? 'mb-3' : false">
        <div class="row no-gutters flex-fill">
          <div
            class="col-xl-1 d-flex flex-xl-column flex-row justify-content-between
            justify-content-xl-start">
            <strong>
              {{ $t('commons.sheet') }}<span class="d-inline d-xl-none">:</span>
            </strong>
            {{ item.number }}
          </div>
          <div
            class="col-xl-2 d-flex align-items-center justify-content-between d-xl-none">
            <strong>
              {{ $t('commons.date') }}<span class="d-inline d-xl-none">:</span>
            </strong>
            {{ item.date | date }}
          </div>
          <div
            class="col-xl-2 d-flex align-items-center flex-xl-column flex-row justify-content-between
            justify-content-xl-start">
            <span class="d-xl-none">
              <strong>{{ $t('commons.type') }}:</strong>
            </span>
            <strong
              v-if="item.type === 'Aporte'"
              class="badge badge-success mt-xl-1">{{ item.type }}</strong>
            <strong
              v-else
              class="badge badge-info mt-xl-1">{{ item.type }}</strong>
            <small class="mt-1 d-none d-xl-block">{{ item.date | date }}</small>
          </div>
          <div class="col-xl-3 d-flex flex-row flex-xl-column justify-content-between justify-content-xl-start">
            <strong>
              {{ item.market }}
              <span class="d-inline d-xl-none">:</span>
            </strong>
            <p class="mb-0 d-inline d-xl-block text-right text-xl-left">
              {{ item.name }}
            </p>
          </div>
          <div class="col-xl-2 d-flex flex-row flex-xl-column justify-content-between justify-content-xl-start">
            <span class="d-inline d-xl-block">
              <strong>
                {{ $t('commons.price') }}
                <span class="d-inline d-xl-none">:</span>
              </strong>
            </span>
            <p class="mb-0 d-inline d-xl-block">
              {{ item.priceString }}
            </p>
          </div>
          <div class="col-xl-2 d-flex flex-row flex-xl-column justify-content-between justify-content-xl-start">
            <span class="d-inline d-xl-block">
              <strong>
                {{ $t('commons.quantity') }}
                <span class="d-inline d-xl-none">:</span>
              </strong>
            </span>
            <p class="mb-0 d-inline d-xl-block">
              {{ item.quantity }}
            </p>
          </div>
          <div class="col-xl-2 d-flex flex-row flex-xl-column justify-content-between justify-content-xl-start">
            <span class="d-inline d-xl-block">
              <strong>
                {{ $t('commons.amount') }}
                <span class="d-inline d-xl-none">:</span>
              </strong>
            </span>
            <p class="mb-0 d-inline d-xl-block">
              {{ item.amount.valueString }}
            </p>
          </div>
        </div>
        <div class="d-xl-flex align-items-center">
          <span
            v-if="item.confirmed"
            class="text-right text-success font-weight-bold d-block">
            <font-awesome-icon icon="check" /> {{ $t('documents.orders-confirmation.confirmed') }}
          </span>
          <div
            v-else
            class="w-100">
            <a
              href="#"
              class="btn btn-primary d-none d-xl-block"
              @click.prevent="confirmDocument(item)">
              {{ $t('documents.orders-confirmation.confirm-btn') }}
            </a>
            <a
              href="#"
              class="btn btn-primary btn-block d-xl-none mt-3"
              @click.prevent="confirmDocument(item)">
              {{ $t('documents.orders-confirmation.confirm-btn') }}
            </a>
          </div>
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
  name: 'OrdersConfirmation',
  filters: {
    date,
  },
  components: {
    listFilters,
    MResponseControl,
  },
  data() {
    return {
      endpoint: 'orderConfirmation',
      apiStatus: false,
      filteredDocuments: [],
      dateFilter: true,
      isRange: true,
      filters: [
        { label: this.$t('documents.orders-confirmation.filters.to-confirm'), value: 'to_confirm' },
        { label: this.$t('documents.orders-confirmation.filters.confirmed'), value: 'confirmed' },
        { label: this.$t('documents.orders-confirmation.filters.all'), value: 'all' },
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
    maxToDate() {
      return this.$store.state.maxToDate;
    },
    toDate() {
      return this.$store.state.toDate;
    },
    fromDate() {
      return this.$store.state.fromDate;
    },
  },
  watch: {
    activeFilter: 'filterDocuments',
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.commit('SET_FILTER', 'to_confirm');
    this.$store.commit('SET_FROM_DATE', subMonths(new Date(), 1));
    this.$store.commit('SET_TO_DATE', new Date());
    this.$store.commit('SET_MAX_TO_DATE', new Date());
    this.fetchDocuments();
  },
  methods: {
    confirmDocument(doc) {
      const midDoc = {};

      if (doc) {
        midDoc.confirmed = true;
        midDoc.tag = 'confirmed';
      }
      this.filterDocuments();
      return midDoc;
    },
    filterDocuments() {
      this.filteredDocuments = [];
      if (this.activeFilter !== 'all') {
        this.filteredDocuments = this.documents.filter((item) => item.tag === this.activeFilter);
      } else {
        this.filteredDocuments = this.documents;
      }
    },

    fetchDocuments: debounce(function fetchDocs() {
      this.$store.dispatch('GET_DOCUMENTS', {
        enpoint: this.endpoint,
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
  .documents__orders-confirmation-item,
  .no-documents-alert {
    border: 1px solid $primary-10;
  }
}
</style>
