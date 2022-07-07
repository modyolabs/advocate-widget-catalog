<template>
  <div
    id="detailed-view"
    class="h-100 d-flex flex-column justify-content-between">
    <detailed-view-body
      class="pt-4 pt-md-5 overflow-auto flex-fill"
      :status="bodyStatus"
      :data-columns-items="dataColumnsItems"
      :agreements="agreements"
      :table-data="table"
      :data-columns-cols="dataColumnsCols" />
  </div>
</template>
<script>
import { currency } from '@modyo/financial-commons';

import DetailedViewBody from './DetailedViewBody.vue';

export default {
  name: 'DetailedView',
  components: {
    DetailedViewBody,
  },
  data() {
    const vm = this;
    return {
      bodyStatus: this.$t('body.status.valid'),
      dataColumnsItems: this.$t('_policy-data.data-columns-items'),
      agreements: this.$t('_policy-data.agreements'),
      table: {
        header: this.$t('_policy-data.table').header,
        body: this.$t('_policy-data.table').body
          .map((row) => row.map((item, index) => (index === 0 ? item : currency(item, vm.$t('currency.format'))))),
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
};
</script>
