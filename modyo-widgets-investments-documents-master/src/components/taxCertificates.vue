<template>
  <div id="documents__tax-certificates">
    <div class="d-flex justify-content-between">
      <h3 class="h5 mb-4 text-primary d-none d-lg-block">
        <strong>{{ $t('certificates.tax-certificates.title') }}</strong>
      </h3>
      <list-filters
        :is-range="isRange"
        :date-filter="dateFilter"
        :date-format="dateFormat"
        view="year"
        @change="fetchDocuments" />
    </div>

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
        <div class="mt-4 mt-lg-0">
          <p
            class="h5 font-weight-light bg-white rounded p-5 no-documents-alert text-center">
            {{ $t('commons.try-again') }}
          </p>
        </div>
      </template>
      <template #empty>
        <div class="mt-4 mt-lg-0">
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
        v-for="(item,index) in documents"
        :key="item.id"
        class="documents__tax-certificate-item d-flex align-items-center justify-content-between
        py-2 px-3 bg-white rounded"
        :class="index!=documents.length-1 ? 'mb-2' : false">
        <p class="d-flex align-items-center mb-0">
          {{ item.name }}
        </p>
        <div class="ml-auto pl-3">
          <a
            :href="item.document"
            class="btn btn-secondary"
            target="_blank">
            <font-awesome-icon
              icon="file-pdf"
              class="mr-sm-2" />
            <span class="d-none d-sm-inline">{{ $t('commons.download') }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { startOfYear, endOfYear } from 'date-fns';
import { debounce, MResponseControl } from '@modyo/financial-commons';
import listFilters from './listFilters.vue';

export default {

  name: 'TaxCertificates',

  components: {
    listFilters,
    MResponseControl,
  },
  data() {
    return {
      endpoint: 'taxCertificates',
      isRange: false,
      apiStatus: false,
      dateFilter: true,
      dateFormat: 'YYYY',
    };
  },
  computed: {
    documents() {
      return this.$store.state.documents;
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
    fromDate() {
      this.fetchDocuments();
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.commit('SET_FROM_DATE', startOfYear(new Date()));
    this.$store.commit('SET_TO_DATE', new Date());
    this.$store.commit('SET_MAX_TO_DATE', endOfYear(new Date()));
    this.fetchDocuments();
  },
  methods: {
    fetchDocuments: debounce(function fetchDocs() {
      this.$store.dispatch('GET_DOCUMENTS', {
        enpoint: this.endpoint,
        params: {
          from: this.fromDate,
          to: this.toDate,
        },
      }).then(() => {
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
  .documents__tax-certificate-item,
  .no-documents-alert {
    border: 1px solid $primary-10;
  }
}
</style>
