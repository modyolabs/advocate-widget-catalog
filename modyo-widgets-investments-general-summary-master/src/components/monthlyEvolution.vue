<template>
  <div class="row no-gutters">
    <div class="general-summary__monthly-evolution-filters col-lg-3 px-4 py-2 p-lg-4">
      <div class="row">
        <div class="col-6 col-lg-12 mb-0 mb-sm-2">
          <div class="form-group mb-0 mb-lg-2">
            <label
              for=""
              class="mb-1 small">{{ $t('investment-evolution.year') }}</label>
            <multiselect
              v-model="selectedYear"
              track-by="name"
              class="rounded-0"
              :show-no-results="false"
              :show-labels="false"
              :options="monthly.years"
              :searchable="false"
              :allow-empty="false">
              <template
                slot="singleLabel"
                slot-scope="{ option }">
                {{ option.name }}
              </template>
              <template
                slot="option"
                slot-scope="{option}">
                {{ option.name }}
              </template>
            </multiselect>
          </div>
        </div>

        <div class="col-6 col-lg-12">
          <div class="form-group mb-0">
            <label
              for=""
              class="mb-1 small">{{ $t('investment-evolution.month') }}</label>
            <multiselect
              v-model="selectedMonth"
              track-by="name"
              :show-no-results="false"
              :show-labels="false"
              :options="sortedMonths"
              :searchable="false"
              :allow-empty="false">
              <template
                slot="singleLabel"
                slot-scope="{ option }">
                {{ $t(`months[${option.monthNumber-1}]`) }}
              </template>
              <template
                slot="option"
                slot-scope="{option}">
                {{ $t(`months[${option.monthNumber-1}]`) }}
              </template>
            </multiselect>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-9 p-lg-4 general-summary__monthly-evolution-table">
      <div class="d-none d-sm-flex justify-content-end mb-lg-3 px-lg-0 px-4 text-primary">
        <strong>{{ $t('commons.amount') }}</strong>
      </div>
      <div
        v-for="(row,rowIndex) in selectedMonth.amounts"
        :key="row.name"
        class="general-summary__monthly-evolution-table-row d-flex justify-content-between p-lg-0 py-3 px-4"
        :class="{'mb-lg-3':rowIndex!==selectedMonth.amounts.length-1}">
        <span
          :class="{'font-weight-bold': row.name == 'Patrimonio Inicial' ||
            row.name == 'Patrimonio Final'}">
          {{ row.name }}
        </span>
        <span
          class="text-nowrap"
          :class="{'font-weight-bold': row.name == 'Patrimonio Inicial' ||
            row.name == 'Patrimonio Final'}">
          <span>{{ row.amount.originValue | currency(getCurrencyFormat(row.amount)) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { currency } from '@modyo/financial-commons';
import { getCurrencyFormat } from '../helpers';

export default {
  name: 'MonthlyEvolution',
  components: {
    Multiselect,
  },
  filters: {
    currency,
  },
  props: {
    monthly: { type: Object, required: true },
  },
  data() {
    return {
      selectedYear: null,
      selectedMonth: null,
      sortedMonths: [],
    };
  },
  watch: {
    selectedYear(newValue) {
      this.sortedMonths = newValue.months.sort((a, b) => a.monthNumber - b.monthNumber);
      [this.selectedMonth] = this.selectedYear.months;
    },
  },
  created() {
    [this.selectedYear] = this.monthly.years;
    [this.selectedMonth] = this.selectedYear.months;
  },
  methods: {
    getCurrencyFormat,
  },
};
</script>

<style lang="css" src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables";

.general-summary__monthly-evolution-filters {
  background: #fff;
  border: 1px solid $tertiary-20;
  border-right: 0;
  border-top-left-radius: .35rem;
  border-bottom-left-radius: .35rem;
}

@media (max-width: 320px) {
  .general-summary__monthly-evolution-table {
    font-size: .8rem;
  }
}

@media (max-width: 991.98px) {
  .general-summary__monthly-evolution-filters {
    background: transparent;
  }

  .general-summary__monthly-evolution-table {
    .general-summary__monthly-evolution-table-row:nth-child(odd) {
      background-color: #fff;
      border-right: 1px solid $tertiary-20;
      border-left: 1px solid $tertiary-20;
    }
  }
}
</style>
