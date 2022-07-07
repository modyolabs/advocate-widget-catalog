<template>
  <div class="d-flex align-items-end justify-content-between">
    <div class="d-none d-md-flex flex-column title">
      <div
        :class="[singleChartActive ? 'fs-7' : 'fs-3']">
        <button
          v-if="singleChartActive"
          class="btn px-1 py-0"
          @click="goGeneralOverview">
          <font-awesome-icon
            icon="chevron-left" />
        </button>
        {{ $t('header.activity') }}
      </div>
      <div
        v-if="singleChartActive"
        class="fs-3">
        {{ selectedAccount.name }}
      </div>
    </div>
    <div class="d-flex flex-column text-start text-md-end text-dark-3">
      <div class="fs-8 d-none d-md-block">
        {{ $t('header.your-budget') }}
      </div>
      <div
        class="h1 d-block d-md-none m-0">
        <button
          v-if="singleChartActive"
          class="btn p-0 pe-1"
          @click="goGeneralOverview">
          <font-awesome-icon
            icon="chevron-left" />
        </button>
        {{ singleChartActive ? selectedAccount.name : $t('header.total-budget') }}
      </div>

      <div class="fw-bold d-none d-md-block fs-5">
        {{ totalAccount | currency(currencyFormat) }}
      </div>
      <div class="fw-bold d-block d-md-none fs-7">
        {{ totalAccount | currency(currencyFormat) }}
      </div>
    </div>
    <div class="d-block d-md-none me-3">
      <button
        type="button"
        class="btn btn-white position-relative"
        @click="open()">
        <font-awesome-icon
          class="fa-lg"
          :icon="['far', 'lightbulb']"
          style="width: 16px; height: auto;" />
        <span
          class="position-absolute top-0 start-100 translate-middle px-3 bg-primary rounded-pill text-white fs-8">
          {{ getInsightsLength }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderAccount',
  data() {
    return {
      refBottonCheat: null,
    };
  },
  computed: {
    currencyFormat() {
      return this.$t('currency.format');
    },
    singleChartActive() {
      return this.$store.state.currentView.overview === 'single';
    },
    totalAccount() {
      return this.$store.state.selectedAccount.totalBudget || this.$store.state.totalBudget.totalAmount;
    },
    selectedAccount() {
      return this.$store.state.selectedAccount;
    },
    getInsightsLength() {
      return this.$store.state.insights?.length;
    },
  },
  methods: {
    goGeneralOverview() {
      this.$store.commit('SET_SELECTED_ACCOUNT', {});
      this.$store.commit('SET_OVERVIEW_VIEW', 'general');
      this.$store.commit('SET_SINGLE_CHART', 'balance');
    },
    open() {
      this.$store.state.bottomSheetRef.open();
    },
  },
};

</script>

<style lang="scss" scoped>
@import "../scss/variables";

.title {
  color: $primary-dark;
}

</style>
