<template>
  <div class="d-flex flex-column gap-3">
    <div class="d-none d-md-block">
      <span class="fs-6 fw-bold text-dark-3">{{ $t('viewTrends.name') }}</span>
    </div>

    <div class="d-flex flex-row flex-md-column gap-3">
      <div class="form-check d-none d-md-block m-0 p-0">
        <input
          id="overviewCheck"
          class="form-check-input border border-secondary-dark rounded-3 me-3 ms-2"
          :checked="chartVisualization.overview"
          type="checkbox"
          name="overview"
          @click="toggleView('overview')">
        <label
          class="form-check-label fs-7 fw-bold text-dark-3 p-0 box-color"
          for="overviewCheck">
          {{ $t('viewTrends.overview') }}
        </label>
      </div>

      <div class="form-check d-none d-md-block m-0 p-0">
        <input
          id="accountsCheck"
          :checked="chartVisualization.accounts"
          class="form-check-input border border-secondary-dark rounded-3 me-3 ms-2"
          type="checkbox"
          name="accounts"
          @click="toggleView('accounts')">
        <label
          class="form-check-label fs-7 fw-bold text-dark-3"
          for="accountsCheck">
          {{ $t('viewTrends.accounts') }}
        </label>
      </div>
    </div>

    <div class="d-flex flex-row justify-content-between px-0 align-items-center d-md-none">
      <span class="fs-7 fw-bold text-dark-3">{{ $t('viewTrends.accounts') }}</span>
      <div class="d-flex flex-row gap-2">
        <button
          class="btn-accounts fw-500 fs-9"
          :class="{'selected': chartVisualization.overview}"
          @click="toggleViewExclusive('overview')">
          {{ $t('viewTrends.balance') }}
        </button>

        <button
          class="btn-accounts fw-500 fs-9"
          :class="{'selected': chartVisualization.accounts}"
          @click="toggleViewExclusive('accounts')">
          {{ $t('viewTrends.distribution') }}
        </button>
      </div>
    </div>

    <div
      class="row justify-content-between align-items-center
      gap-2 g-0 p-0 m-0 custom-height custom-overflow trend-list">
      <trend-item
        v-for="(account , index) in totalBudgetAccounts"
        :key="index"
        class="col-5 col-md-12 p-0 custom-flex"
        :index="index+1"
        :account="account" />
    </div>
  </div>
</template>
<script>
import TrendItem from './TrendItem.vue';

export default {
  name: 'ViewTrends',
  components: {
    TrendItem,
  },
  data() {
    return {
      toggle: false,
    };
  },
  computed: {
    chartVisualization() {
      return this.$store.state.chartVisualization;
    },
    totalBudgetAccounts() {
      return this.$store.state.totalBudgetAccounts;
    },
  },
  methods: {
    toggleView(view) {
      const visualization = this.chartVisualization;
      visualization[view] = !visualization[view];
      if (!visualization.overview && !visualization.accounts) {
        if (view === 'overview') visualization.accounts = !visualization.accounts;
        else visualization.overview = !visualization.overview;
      }
      this.$store.commit('SET_CHART_VISUALIZATION', visualization);
    },
    toggleViewExclusive(view) {
      const visualization = this.chartVisualization;
      if (view === 'overview') {
        visualization.overview = true;
        visualization.accounts = false;
      } else {
        visualization.overview = false;
        visualization.accounts = true;
      }
      this.$store.commit('SET_CHART_VISUALIZATION', visualization);
    },
  },
};
</script>
<style lang="scss">

@media screen and (min-width: 768px) {
  .custom-overflow {
    overflow: scroll;
  }
  .custom-height {
    height: 10rem;
  }
}

.form-check input,
.form-check label {
  cursor: pointer;
  user-select: none;
}

.btn-accounts {
  padding: 4px;

  color: #333;

  border: 1px solid #d2d6e5;
  border-radius: 5px;

  transition: .2s;

  &.selected {
    color: #a3afb4;

    border: 1px solid #a3afb4;
    box-shadow: 0 2px 5px rgba(165, 174, 204, .26);
  }
}

.trend-list {
  .custom-flex {
    flex: 1 0 auto;

    @media screen and (max-width: 768px) {
      &:last-of-type {
        flex: 0 0 calc(50% - .25rem);
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .custom-height {
    height: 17.5rem;
  }
}

input[type="checkbox"] {
  background: #fff;
}

input[type="checkbox"]:checked {
  background: #a3afb4;
}

.box-color::after {
  display: inline-block;

  width: 12px;
  height: 12px;
  margin-left: 10px;

  vertical-align: middle;

  content: "";

  background: #2e4553;
  border: 1px solid #d2d6e5;
  border-radius: 5px;
}

</style>
