<template>
  <div id="documents__statements">
    <div class="d-flex justify-content-between flex-column flex-lg-row">
      <h3 class="h5 mb-4 text-primary d-none d-lg-block">
        <strong>{{ $t('documents.legacy-statements.title') }}</strong>
      </h3>
      <list-filters
        :date-filter="dateFilter"
        :is-range="isRange"
        view="month"
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
        class="documents__statements-item d-flex align-items-center
        justify-content-between py-2 px-3 bg-white rounded"
        :class="index!=documents.length-1 ? 'mb-2' : false">
        <div class="d-flex flex-column">
          <small class="text-muted d-block">{{ $t('documents.legacy-statements.item-lbl') }}</small>
          <p class="mb-0">
            {{ item.name }}
          </p>
        </div>
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
import { subMonths, endOfMonth } from 'date-fns';
import { debounce, MResponseControl } from '@modyo/financial-commons';
import listFilters from './listFilters.vue';

export default {

  name: 'DocumentsStatements',
  components: {
    listFilters,
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
      isRange: true,
      dateFilter: true,
    };
  },
  computed: {
    documents() {
      return this.$store.state.documents;
    },
    activeComponent() {
      return this.$store.state.activeComponent;
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
    this.$store.commit('SET_FROM_DATE', subMonths(new Date(), 6));
    this.$store.commit('SET_TO_DATE', subMonths(new Date(), 1));
    this.$store.commit('SET_MAX_TO_DATE', endOfMonth(subMonths(new Date(), 1)));
    this.fetchDocuments();
  },
  methods: {
    updateFrom(date) {
      this.fromDate = date;
      this.fetchDocuments();
    },

    updateTo(date) {
      this.toDate = date;
      this.fetchDocuments();
    },

    fetchDocuments: debounce(function fetchDocs() {
      const ep = 'consolidatedStatement';
      this.$store.dispatch('GET_DOCUMENTS', {
        enpoint: ep,
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
  .documents__statements-item,
  .no-documents-alert {
    border: 1px solid $primary-10;
  }
}
</style>
