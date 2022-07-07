<template>
  <div class="policy-value-history">
    <div class="policy-value-history__title d-none d-md-block">
      <span class="font-weight-bold">
        {{ $t('body.policy-value-details') }}
      </span>
      <span>
        <font-awesome-icon
          icon="chevron-right"
          class="text-success mx-3" />
      </span>
      <span>{{ $t('policy.historical-value') }}</span>
    </div>
    <div
      class="policy-value-history__basic-details d-flex align-items-md-center flex-column flex-md-row
      mx-4 mb-4 mt-md-4 mb-md-0 mx-md-0 px-3 py-1 p-md-0">
      <div class="policy-value-history__subtitle-detail d-flex align-items-center py-2 py-md-0">
        <div>
          {{ $t('commons.insured-amount') }}
          <strong class="d-md-block">{{ insuredAmount }}</strong>
        </div>
      </div>
      <div class="policy-value-history__subtitle-detail d-flex align-items-center py-2 py-md-0">
        <div>
          {{ $t('commons.total-premium') }}
          <strong class="d-md-block">{{ totalPremium }}</strong>
        </div>
      </div>
      <div class="policy-value-history__subtitle-detail d-flex align-items-center py-2 py-md-0">
        <div>
          {{ $t('commons.total-rescue') }}
          <strong class="d-md-block">{{ totalRescue }}</strong>
        </div>
      </div>
    </div>
    <div class="policy-value-history__content mt-4 d-flex flex-column rounded p-md-4">
      <div class="policy-value-history__filters px-4 px-md-0">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label for="">{{ $t('commons.year-selection') }}</label>
              <multiselect
                id="year"
                v-model="year"
                :options="yearsOptions"
                :show-labels="false"
                :allow-empty="false"
                :max-height="350" />
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled mb-0 mt-4">
        <li
          v-for="(history,historyIndex) in policyValueHistory"
          :key="historyIndex"
          class="policy-value-history__list-item"
          :class="{'mt-md-2':historyIndex!==0}">
          <div class="policy-value-history__list-card card">
            <div
              :id="`policy-value-${historyIndex}-heading`"
              class="card-header p-0">
              <h2 class="mb-0">
                <button
                  class="policy-value-history__button btn btn-link btn-block
                  text-left d-flex justify-content-between align-items-center py-3 px-4"
                  type="button"
                  data-toggle="collapse"
                  :data-target="`#policy-value-${historyIndex}`"
                  aria-expanded="true"
                  :aria-controls="`policy-value-${historyIndex}`">
                  <div class="row flex-fill">
                    <span
                      class="policy-value-history__button-detail col-sm-6 col-md-6 col-lg-4
                    d-flex align-items-center text-capitalize">
                      {{ history.date | monthYear }}
                    </span>
                    <span
                      class="policy-value-history__button-detail col-sm-6 col-md-6 col-lg-4
                      d-flex align-items-center text-secondary">
                      <span class="mx-md-auto">
                        {{ $t('commons.final-balance') }}: {{ history.currency }} {{ history.balance }}
                      </span>
                    </span>
                  </div>
                  <font-awesome-icon icon="chevron-down" />
                </button>
              </h2>
            </div>
            <div
              :id="`policy-value-${historyIndex}`"
              class="collapse"
              :aria-labelledby="`policy-value-${historyIndex}-heading`">
              <div class="card-body">
                <div class="distribution-table overflow-auto">
                  <table class="table-striped-rounded table table-striped mb-0 text-secondary">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="text-primary">
                          {{ $t('commons.date') }}
                        </th>
                        <th
                          scope="col"
                          class="text-primary">
                          {{ $t('commons.transfer-details') }}
                        </th>
                        <th
                          scope="col"
                          class="text-primary text-right"
                          style="width: 1px;">
                          {{ $t('commons.value') }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row,rowIndex) in history.details"
                        :key="rowIndex">
                        <td>
                          {{ row.date }}
                        </td>
                        <td>
                          {{ row.description }}
                        </td>
                        <td class="text-right text-nowrap">
                          {{ row.value }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import { date as DateFormat } from '@modyo/financial-commons';

export default {
  name: 'PolicyValueHistory',
  filters: {
    monthYear(value) {
      const lang = window.liquid ? window.liquid.lang : 'es-CL';
      return DateFormat(new Date(value), 'MMMM yyyy', lang.split('-')[0]);
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      insuredAmount: 'UF 2.163,83',
      totalPremium: 'UF 163,83',
      totalRescue: 'UF 00,00',
      year: 2020,
      yearsOptions: [
        2020,
        2019,
        2018,
        2017,
        2016,
        2015,
      ],
    };
  },
  computed: {
    policyValueHistory() {
      return this.$store.state.policyValueHistory;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.policy-value-history__title {
  font-size: 1.275em;
}

.policy-value-history__basic-details {
  border: 1px solid $tertiary-60;
  border-radius: .25rem;
}

.policy-value-history__subtitle-detail {
  font-size: .875em;

  + .policy-value-history__subtitle-detail {
    border-top: 1px solid $tertiary-60;
  }
}

.policy-value-history__button-detail {
  &:first-child {
    font-weight: 500;
  }
}

.policy-value-history__button {
  font-size: 1rem;

  background-color: #fff;

  &:hover,
  &:focus {
    background-color: $tertiary-10;
  }
}

@media (min-width: 768px) {
  .policy-value-history__basic-details {
    border: none;
  }

  .policy-value-history__content {
    border: 1px solid $secondary-20;
  }

  .policy-value-history__subtitle-detail {
    + .policy-value-history__subtitle-detail {
      border-top: none;

      &::before {
        width: 1px;
        height: 1.5rem;
        margin: 0 2rem;

        content: "";

        background-color: $tertiary-60;
      }
    }
  }

  .policy-value-history__button-detail {
    + .policy-value-history__button-detail {
      &::before {
        width: 1px;
        height: 2rem;

        content: "";

        background-color: $primary-20;
      }
    }
  }
}
@media (max-width: 767.98px) {
  .policy-value-history__list-card {
    border-top-color: $secondary-10;
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-radius: 0;

    button {
      border-radius: 0;
    }

    .card-header {
      border-bottom: none;
    }

    .collapse.show {
      border-top: 1px solid $secondary-10;
    }
  }

  .policy-value-history__list-item {
    &:last-child {
      border-bottom: 1px solid $secondary-10;
    }
  }
}
</style>
