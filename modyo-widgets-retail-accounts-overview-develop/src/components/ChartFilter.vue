<template>
  <div class="row mb-3 mb-lg-4 g-0 px-3 px-md-4 pt-3">
    <div
      v-if="isSingleView"
      class="col-4 d-flex gap-2">
      <button
        class="filterBtn"
        :class="{'selected': currentSingleChart === 'balance' }"
        @click="toogleView('balance')">
        <span class="fw-500 fs-8">{{ $t('chartFilter.balance') }}</span>
      </button>
      <button
        class="filterBtn"
        :class="{'selected': currentSingleChart === 'expenses' }"
        @click="toogleView('expenses')">
        <span class="fw-500 fs-8 opacity-80">{{ $t('chartFilter.expenses') }}</span>
      </button>
    </div>
    <div
      class="col-8 d-none d-lg-flex justify-content-end gap-2"
      :class="{'offset-4': !isSingleView}">
      <button
        v-for="(item, index) in presets"
        :key="index"
        class="filterBtn"
        :class="{'selected': currentDateFilter === item.id}"
        @click="changeDate(item)">
        <span class="fw-500 fs-8 opacity-80">{{ item.name }}</span>
      </button>
      <vue-date-picker
        v-model="dateRange"
        :max-date="maxDate"
        color="#2e4553"
        range
        range-header-text="%d to %d"
        range-input-text="%d - %d"
        :locale="{ lang: $t('datepicker.lang')}"
        @onChange="setCurrentDateFilter(4)">
        <template #activator>
          <button
            class="filterBtn btn-block"
            :class="{'selected': currentDateFilter === 4}"
            type="button">
            <font-awesome-icon
              :icon="['far', 'calendar']"
              class="me-2 fs-8 opacity-80" />
            <span class="fw-500 fs-8 opacity-80">{{ showDate }}</span>
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="ms-2 fs-8 opacity-80" />
          </button>
        </template>
      </vue-date-picker>
    </div>
    <div
      class="col-8 d-flex d-lg-none justify-content-end gap-1"
      :class="{'offset-4': !isSingleView}">
      <vue-date-picker
        v-model="dateRange"
        :max-date="maxDate"
        color="#2e4553"
        :name="$t('datepicker.name')"
        :locale="{ lang: $t('datepicker.lang')}"
        range
        range-header-text="%d to %d"
        range-input-text="%d - %d"
        fullscreen-mobile
        :range-presets="presets">
        <template #activator>
          <button
            class="filterBtn btn-block"
            type="button">
            <font-awesome-icon
              :icon="['far', 'calendar']"
              class="me-2 opacity-80" />
            <span class="fw-500 fs-8 opacity-80">{{ showDate }}</span>
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="ms-2 opacity-80" />
          </button>
        </template>
      </vue-date-picker>
    </div>
  </div>
</template>
<script>
import { sub, format } from 'date-fns';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default {
  name: 'ChartFilter',
  components: {
    VueDatePicker,
  },
  data() {
    return {
      apiStatus: false,
      maxDate: new Date(),
      currentDate: new Date(),
      dateRange: {},
    };
  },
  computed: {
    presets() {
      return [
        {
          id: 1,
          name: this.$t('presets.year', [1]),
          dates: {
            start: sub(new Date(), { years: 1 }),
            end: this.currentDate,
          },
        },
        {
          id: 2,
          name: this.$t('presets.month', [1]),
          dates: {
            start: sub(new Date(), { months: 1 }),
            end: this.currentDate,
          },
        },
        {
          id: 3,
          name: this.$t('presets.week', [1]),
          dates: {
            start: sub(new Date(), { weeks: 1 }),
            end: this.currentDate,
          },
        },
      ];
    },
    currentSingleChart() {
      return this.$store.state.currentView.singleChart;
    },
    isSingleView() {
      return this.$store.state.currentView.overview === 'single';
    },
    showDate() {
      return `${this.dateRange.start} - ${this.dateRange.end}`;
    },
    currentDateFilter() {
      return this.$store.state.currentDateFilter;
    },
  },
  mounted() {
    this.dateRange = this.$store.state.dateRange;
  },
  methods: {
    toogleView(value) {
      if (this.$store.state.currentView.singleChart !== value) {
        this.$store.commit('SET_SINGLE_CHART', value);
      }
    },
    formatDate(dates) {
      return {
        start: format(dates.start, 'yyyy-MM-dd'),
        end: format(dates.end, 'yyyy-MM-dd'),
      };
    },
    changeDate(item) {
      this.setCurrentDateFilter(item.id);
      this.$store.commit('UPDATE_DATE_RANGE', this.formatDate(item.dates));
      this.dateRange = this.$store.state.dateRange;
    },
    setCurrentDateFilter(id) {
      if (this.currentDateFilter !== id) {
        this.$store.commit('SET_CURRENT_DATE_FILTER', id);
      }
    },
  },
};
</script>
<style lang="scss">

.vd-wrapper {
  display: "block";

  flex: none;
}

.filterBtn {
  display: inline-flex;

  align-items: center;

  padding: 8px;

  color: #333;

  background: transparent;
  border: 1px solid #d2d6e5;
  border-radius: 5px;

  transition: .3s;

  &.selected {
    background: rgb(255, 255, 255);
    box-shadow: inset 0 0 0 1.5px #a3afb4, 0 2px 5px rgba(165, 174, 204, .26);
  }
}

</style>
