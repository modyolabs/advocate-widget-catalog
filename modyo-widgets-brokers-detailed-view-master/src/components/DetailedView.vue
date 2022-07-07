<template>
  <div
    id="detailed-view"
    class="h-100 d-flex flex-column justify-content-between">
    <detailed-view-header
      :main-title="mainTitle"
      @on-download="()=>{}" />

    <detailed-view-body
      class="pt-4 pt-md-5 overflow-auto flex-fill"
      :title="bodyTitle"
      :status="bodyStatus"
      :data-columns-items="dataColumnsItems"
      :agreements="agreements"
      :table-data="table"
      :data-columns-cols="dataColumnsCols"
      :historical-table-data="historicalTable" />
    <detailed-view-footer
      :action-text="footerActionName"
      @footer-btn-click="showEmailModal" />
  </div>
</template>
<script>
import { currency } from '@modyo/financial-commons';

import DetailedViewHeader from './DetailedViewHeader.vue';
import DetailedViewBody from './DetailedViewBody.vue';
import DetailedViewFooter from './DetailedViewFooter.vue';

export default {
  name: 'DetailedView',
  components: {
    DetailedViewHeader,
    DetailedViewBody,
    DetailedViewFooter,
  },
  /* Quote Data */
  /*
  data() {
    const vm = this;
    return {
      mainTitle: this.$t('header.main-title', { number: '98729873' }),
      bodyTitle: this.$t('body.quote-title'),
      bodyStatus: this.$t('body.status.quoted'),
      footerActionName: this.$t('footer.sign'),
      dataColumnsItems: this.$t('_quote-data.data-columns-items'),
      agreements: this.$t('_quote-data.agreements'),
      table: {
        header: this.$t('_quote-data.table').header,
        body: this.$t('_quote-data.table').body
          .map((row) => row.map((item, index) => (index === 0 ? item : currency(item, vm.$t('currency.format'))))),
      },
      dataColumnsCols: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
      },
      historicalTable: undefined,
    };
  },
  */
  // Policy Data
  data() {
    const vm = this;
    return {
      mainTitle: this.$t('header.main-title', { number: '98729873' }),
      bodyTitle: this.$t('body.policy-title'),
      bodyStatus: this.$t('body.status.valid'),
      footerActionName: this.$t('footer.sign'),
      dataColumnsItems: this.$t('_policy-data.data-columns-items'),
      agreements: this.$t('_policy-data.agreements'),
      table: {
        header: this.$t('_policy-data.table').header,
        body: this.$t('_policy-data.table').body
          .map((row) => row.map((item, index) => (index === 0 ? item : currency(item, vm.$t('currency.format'))))),
      },
      historicalTable: {
        header: this.$t('_policy-data.historical-table').header,
        body: this.$t('_policy-data.historical-table').body
          .map((row) => row.map((item, index) => (index !== row.length - 1
            ? item
            : currency(item, vm.$t('currency.format'))))),
      },
      dataColumnsCols: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
      },
    };
  },
  methods: {
    showEmailModal() {
      this.$store.commit('SET_SHOW_EMAIL_MODAL', true);
    },
  },
};
</script>
