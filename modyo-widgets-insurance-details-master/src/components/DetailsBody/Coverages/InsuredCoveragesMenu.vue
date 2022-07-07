<template>
  <div class="insured-coverages-menu py-3 py-md-4 px-4 px-md-0">
    <h4 class="details-body__section-title">
      <span class="d-none d-md-block">
        {{ $t('body.coverages-main') }}
      </span>
      <span class="d-md-none">
        {{ $t('body.coverages') }}
      </span>
    </h4>
    <details-body-button
      v-for="(coverage,index) in policy.mainBeneficiary.coverages"
      :key="index"
      class="rounded mt-4"
      @click="openView('InsuredCoverages')">
      <div class="d-none d-md-flex align-items-center justify-content-between">
        <font-awesome-icon
          icon="shield-alt"
          size="lg"
          class="text-success mr-3" />
        {{ $t(`insurance.coverage-types.${coverage.nameId}`) }} / {{ $t('insurance.coverage-types.base') }}
      </div>
      <div class="d-none d-md-flex">
        {{ $t('commons.capital') }}
        <span class="text-uppercase ml-1">
          {{ coverage.currency }}
          {{ coverage.amount | currency(coverageAmountFormat) }}
        </span>
      </div>
      <span class="d-md-none">
        {{ $t('body.main-insured') }}
      </span>
    </details-body-button>
  </div>
</template>
<script>
import { currency } from '@modyo/financial-commons';
import DetailsBodyButton from '../DetailsBodyButton.vue';

export default {
  name: 'InsuredCoveragesMenu',
  filters: {
    currency,
  },
  components: {
    DetailsBodyButton,
  },
  data() {
    return {
      coverageAmountFormat: {
        decimal: ',',
        formatWithSymbol: false,
        precision: 2,
        separator: '.',
      },
    };
  },
  computed: {
    policy() {
      return this.$store.state.policy;
    },
    bodyView: {
      get() {
        return this.$store.state.bodyView;
      },
      set(value) {
        this.$store.commit('setBodyView', value);
      },
    },
  },
  methods: {
    openView(view) {
      this.bodyView = view;
      let subMenu = '';
      switch (view) {
        case 'InsuredCoverages':
          subMenu = this.$t('body.main-insured');
          break;
        default: break;
      }
      this.$store.commit('setBodyTitleMobile', [this.$t('body.coverages'), subMenu]);
    },
  },
};
</script>
