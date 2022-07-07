<template>
  <div
    class="details-body pb-4 p-md-5"
    :class="{'details-body--header-padding':bodyTitleMobile.length>0}">
    <div
      v-if="!bodyView"
      class="details-body__content">
      <details-body-title class="mb-md-4" />
      <contractor-details />
      <insured-coverages-menu />
      <policy-value-details-menu />
      <funds-details-menu />
      <details-body-notes />
    </div>
    <component
      :is="bodyView"
      v-else />
  </div>
</template>
<script>
import DetailsBodyTitle from './DetailsBodyTitle.vue';
import ContractorDetails from './ContractorDetails.vue';
import InsuredCoveragesMenu from './Coverages/InsuredCoveragesMenu.vue';
import InsuredCoverages from './Coverages/InsuredCoverages.vue';
import PolicyValueDetailsMenu from './PolicyValueDetails/PolicyValueDetailsMenu.vue';
import PolicyBalance from './PolicyValueDetails/PolicyBalance.vue';
import PolicyValueHistory from './PolicyValueDetails/PolicyValueHistory.vue';
import FundsDetailsMenu from './FundsDetails/FundsDetailsMenu.vue';
import FundsBalance from './FundsDetails/FundsBalance.vue';
import FundsChangeHistory from './FundsDetails/FundsChangeHistory.vue';
import FundsCurrentPortfolio from './FundsDetails/FundsCurrentPortfolio.vue';
import DetailsBodyNotes from './DetailsBodyNotes.vue';

export default {
  name: 'DetailsBody',
  components: {
    DetailsBodyTitle,
    ContractorDetails,
    InsuredCoveragesMenu,
    InsuredCoverages,
    PolicyValueDetailsMenu,
    PolicyBalance,
    PolicyValueHistory,
    FundsDetailsMenu,
    FundsCurrentPortfolio,
    FundsChangeHistory,
    FundsBalance,
    DetailsBodyNotes,
  },
  computed: {
    bodyView() {
      return this.$store.state.bodyView;
    },
    bodyTitleMobile() {
      return this.$store.state.bodyTitleMobile;
    },
  },
};
</script>
<style lang="scss" scoped>
.details-body--header-padding {
  padding-top: 5.5rem;
}
</style>
