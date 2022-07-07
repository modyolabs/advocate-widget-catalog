<template id="summary-annualy-evolution-template">
  <div class="general-summary__annually-evolution row no-gutters">
    <div class="col-lg-12 p-lg-4 overflow-auto">
      <table
        class="general-summary__annually-evolution-table
      table table-borderless mb-0 rounded-bottom overflow-hidden">
        <thead>
          <tr>
            <th />
            <th
              v-for="year in annualy.headers"
              :key="year"
              class="text-right px-lg-0 py-3 pt-lg-0 text-primary">
              {{ year }}
              <p class="mb-0 text-primary">
                {{ $t('commons.amount') }}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row,rowIndex) in annualy.rows"
            :key="row.name"
            class="general-summary__annually-evolution-table-row">
            <td
              class="py-3 pt-lg-0 px-lg-0"
              :class="{
                'font-weight-bold': row.name == 'Patrimonio Inicial' || row.name == 'Patrimonio Final',
                'pb-lg-0': rowIndex === annualy.rows.length-1
              }">
              {{ row.name }}
            </td>
            <td
              v-for="year in row.years"
              :key="year.name"
              :class="{
                'font-weight-bold': (row.name == 'Patrimonio Inicial' || row.name == 'Patrimonio Final'),
                'pb-lg-0': rowIndex === annualy.rows.length-1
              }"
              class="text-right px-lg-0 py-3 pt-lg-0 text-nowrap">
              <span>{{ year.amount.originValue | currency(getCurrencyFormat(year.amount)) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { currency } from '@modyo/financial-commons';
import { getCurrencyFormat } from '../helpers';

export default {
  name: 'AnnualyEvolution',
  filters: {
    currency,
  },
  props: {
    annualy: { type: Object, required: true },
  },
  methods: {
    getCurrencyFormat,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.general-summary__annually-evolution-table th,
.general-summary__annually-evolution-table-row td {
  &:first-child {
    padding-left: 1.5rem;
  }

  &:last-child {
    padding-right: 1.5rem;
  }
}

@media (max-width: 320px) {
  .table {
    font-size: .75rem;
  }

  .general-summary__annually-evolution-table th,
  .general-summary__annually-evolution-table-row td {
    &:first-child {
      padding-left: .25rem;
    }

    &:last-child {
      padding-right: .25rem;
    }
  }
}

@media (max-width: 575.98px) {
  .general-summary__annually-evolution-table th,
  .general-summary__annually-evolution-table-row td {
    padding-right: .25rem;
    padding-left: .25rem;
  }
}

@media (max-width: 991.98px) {
  .general-summary__annually-evolution {
    padding-bottom: 1px;
  }

  .general-summary__annually-evolution-table {
    .general-summary__annually-evolution-table-row:nth-child(odd) {
      background-color: #fff;

      td:first-child {
        border-left: 1px solid $tertiary-20;
      }

      td:last-child {
        border-right: 2px solid $tertiary-20;
      }

    }
  }
}
</style>
