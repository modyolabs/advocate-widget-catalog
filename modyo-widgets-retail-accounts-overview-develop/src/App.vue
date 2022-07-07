<template>
  <div
    id="accounts-overview-app"
    class="bg-white py-4 py-xl-5 px-lg-5">
    <div class="row mb-3 mb-md-5 mx-2">
      <div class="col-12 col-md-8">
        <header-account />
      </div>
    </div>

    <div
      class="row g-0 g-md-4"
      :class="{
        'gap-4 mb-4 mb-md-0': currentView.overview === 'general',
        'gap-0 mb-0': currentView.overview === 'single'}">
      <div
        class="col-12 col-md-8 bg-white mt-0">
        <div
          v-if="currentView.overview === 'general'">
          <div
            class="bg-tertiary-20 rounded-3 text-center">
            <general-overview />
          </div>
          <carrousel
            class="carousel-top" />
        </div>
        <div v-else>
          <div
            class="bg-tertiary-20 rounded-3 text-center mb-5">
            <single-overview />
          </div>
        </div>
      </div>
      <div
        :class="{
          'col mx-4 my-0 m-md-0 ': currentView.overview === 'general',
          'col-4 m-0': currentView.overview === 'single'}">
        <div
          v-if="currentView.overview === 'general'"
          class="custom-bg rounded-3 p-0 p-md-4">
          <view-trends />
        </div>
        <carrousel
          v-else
          class="ps-md-4" />
      </div>
    </div>
    <div class="d-block d-md-none">
      <upcoming-movements
        class="mx-4" />
    </div>

    <div
      class="row gap-4 g-0 g-md-4 mb-5">
      <div class="col-12 col-md-8 latest-transactions">
        <transactions-list />
      </div>
      <div class="col d-none d-md-block">
        <shortcuts />
      </div>
    </div>
    <vue-bottom-sheet
      ref="bottomSheet"
      class="d-md-none"
      max-height="70%">
      <insighst-list class="p-3 pt-0" />
    </vue-bottom-sheet>
  </div>
</template>

<script>
import VueBottomSheet from '@webzlodimir/vue-bottom-sheet';
import HeaderAccount from './components/HeaderAccount.vue';
import GeneralOverview from './components/GeneralOverview.vue';
import SingleOverview from './components/SingleOverview.vue';
import ViewTrends from './components/ViewTrends.vue';
import Carrousel from './components/Carrousel.vue';
import InsighstList from './components/InsightsList.vue';
import Shortcuts from './components/Shortcuts.vue';
import TransactionsList from './components/TransactionsList.vue';
import UpcomingMovements from './components/UpcomingMovements.vue';

export default {
  name: 'App',
  components: {
    HeaderAccount,
    GeneralOverview,
    SingleOverview,
    ViewTrends,
    Carrousel,
    Shortcuts,
    TransactionsList,
    InsighstList,
    VueBottomSheet,
    UpcomingMovements,
  },
  computed: {
    currentView() {
      return this.$store.state.currentView;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },
  mounted() {
    this.$store.commit('SET_BOTTOM_SHEET_REF', this.$refs.bottomSheet);
  },
};
</script>

<style src="./scss/fonts.css"></style>

<style lang="scss" scoped>
@import "scss/variables";

.carousel-top {
  position: relative;
  top: -50px;
}

.bg-tertiary-20 {
  background-color: $tertiary-20;
}
.custom-bg {
  background-color: "white";
}

@media screen and (min-width: 768px) {
  .custom-bg {
    background-color: $tertiary-20;
  }
}
</style>
