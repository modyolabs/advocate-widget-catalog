<template>
  <div id="documents__risk-table">
    <h3 class="h5 mb-4 text-primary">
      <strong>{{ $t('main.document-types.risk-table-per-product') }}</strong>
    </h3>
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

    <div v-else>
      <div
        class="wrapper-documents bg-white"
        v-html="riskTable" />
    </div>
  </div>
</template>

<script>
import { MResponseControl } from '@modyo/financial-commons';

export default {
  name: 'RiskTable',
  components: {
    MResponseControl,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    riskTable() {
      return this.$store.state.riskTable;
    },
  },
  created() {
    this.fetchRiskTableData();
  },
  methods: {
    fetchRiskTableData() {
      this.apiStatus = 'isLoading';
      this.$store.dispatch('GET_RISK_TABLE_DATA')
        .then(() => {
          this.apiStatus = false;
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
  },
};
</script>
