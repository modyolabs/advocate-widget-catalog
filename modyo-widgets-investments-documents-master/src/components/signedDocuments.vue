<template>
  <div id="documents__signed">
    <div class="d-flex justify-content-between flex-column flex-lg-row">
      <h3 class="h5 mb-4 text-primary d-none d-lg-block">
        <strong>{{ $t('documents.signed-documents.title') }}</strong>
      </h3>
      <list-filters
        view="date"
        :date-filter="dateFilter"
        :is-range="isRange"
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
        v-for="item in documents"
        :key="item.id"
        class="documents__signed-item d-flex align-items-center
        mb-2 py-2 px-3 bg-white rounded justify-content-between">
        <p class="mb-0">
          {{ item.name }}<small class="d-block light">{{ item.issued | date }}</small>
        </p>
        <div
          v-if="item.sign"
          class="ml-auto">
          <a
            :href="item.document"
            target="_blanc"
            class="btn btn-secondary">
            <font-awesome-icon
              icon="file-pdf"
              class="mr-lg-2" />
            <span class="d-none d-lg-inline">{{ $t('commons.download') }}</span>
          </a>
        </div>
        <div
          v-else
          class="ml-auto">
          <button
            data-toggle="modal"
            data-target="'#sign-modal"
            class="btn btn-secondary">
            <font-awesome-icon
              icon="file-pdf"
              class="mr-2" />
            <span class="d-none d-sm-inline">{{ $t('documents.unsigned-documents.sign-btn') }}</span>
          </button>
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
  name: 'SignedDocuments',
  filters: {
    date,
  },
  components: {
    listFilters,
    MResponseControl,
  },
  data() {
    return {
      endpoint: 'signDocuments',
      apiStatus: false,
      dateFilter: true,
      isRange: true,
    };
  },
  computed: {
    documents() {
      return this.$store.state.documents;
    },
    fromDate() {
      return this.$store.state.fromDate;
    },
    toDate() {
      return this.$store.state.toDate;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.commit('SET_FROM_DATE', subMonths(new Date(), 1));
    this.$store.commit('SET_TO_DATE', new Date());
    this.$store.commit('SET_MAX_TO_DATE', new Date());
    this.fetchDocuments();
  },
  methods: {
    fetchDocuments: debounce(function fetchDocs() {
      this.$store.dispatch('GET_DOCUMENTS', {
        enpoint: this.endpoint,
        params: {
          tag: 'signed',
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
  .documents__signed-item,
  .no-documents-alert {
    border: 1px solid $primary-10;
  }
}
</style>
