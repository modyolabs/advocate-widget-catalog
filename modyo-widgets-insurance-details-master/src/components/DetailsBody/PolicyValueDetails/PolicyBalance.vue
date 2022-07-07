<template>
  <div class="policy-balance">
    <div class="policy-balance__title d-none d-md-block">
      <span class="font-weight-bold">
        {{ $t('body.policy-value-details') }}
      </span>
      <span>
        <font-awesome-icon
          icon="chevron-right"
          class="text-success mx-3" />
      </span>
      <span>{{ $t('commons.last-balance') }}</span>
    </div>
    <div
      class="policy-balance__basic-details d-flex align-items-md-center flex-column flex-md-row
      mx-4 mb-4 mt-md-4 mb-md-0 mx-md-0 px-3 py-1 p-md-0">
      <div class="policy-balance__subtitle-detail d-flex align-items-center py-2 py-md-0">
        <div>
          {{ $t('commons.report-date') }}
          <strong class="d-md-block">{{ reportDate }}</strong>
        </div>
      </div>
      <div class="policy-balance__subtitle-detail d-flex align-items-center py-2 py-md-0">
        <div>
          {{ $t('commons.update-date') }}
          <strong class="d-md-block">{{ updateDate }}</strong>
        </div>
      </div>
      <div class="policy-balance__subtitle-detail d-flex align-items-center py-2 py-md-0">
        <div>
          {{ $t('commons.total-balance') }}
          <strong class="d-md-block">{{ total }} / {{ totalUF }}</strong>
        </div>
      </div>
    </div>
    <div
      class="policy-balance__content mt-4 d-flex flex-column rounded p-md-4">
      <div class="px-4 px-md-0 d-flex align-items-center">
        <div
          class="policy-balance__btn-group btn-group mx-auto col-md-6 col-lg-4 p-0"
          role="group"
          aria-label="Basic example">
          <button
            type="button"
            class="policy-balance__view-selector-btn btn btn-block flex-fill px-0 py-2"
            :class="{'btn-primary':currentView==='accounts'}"
            @click="currentView='accounts'">
            {{ $t('commons.accounts') }}
          </button>
          <button
            type="button"
            class="policy-balance__view-selector-btn btn btn-block flex-fill m-0 px-0 py-2"
            :class="{'btn-primary':currentView==='portfolio-summary'}"
            @click="currentView='portfolio-summary'">
            {{ $t('body.portfolio-summary') }}
          </button>
        </div>
      </div>
      <ul
        v-if="currentView==='accounts'"
        class="list-unstyled mb-0 mt-4">
        <li
          v-for="(history,historyIndex) in policyBalance"
          :key="historyIndex"
          class="policy-balance__list-item"
          :class="{'mt-md-2':historyIndex!==0}">
          <div class="policy-balance__list-card card">
            <div
              :id="`policy-balance-${historyIndex}-heading`"
              class="card-header p-0">
              <h2 class="mb-0">
                <button
                  class="policy-balance__button btn btn-link btn-block
                  text-left d-flex justify-content-between align-items-center py-3 px-4"
                  type="button"
                  data-toggle="collapse"
                  :data-target="`#policy-balance-${historyIndex}`"
                  aria-expanded="true"
                  :aria-controls="`policy-balance-${historyIndex}`">
                  <div class="row flex-fill">
                    <span
                      class="policy-balance__button-detail col-md-6 col-lg-4
                    d-flex align-items-center text-capitalize">
                      {{ history.description }}
                    </span>
                    <span
                      class="policy-balance__button-detail col-md-6 col-lg-4
                      align-items-center text-secondary d-none d-md-flex">
                      <span class="mx-auto">
                        {{ $t('commons.balance') }}: {{ history.currency }} {{ history.balance }}
                      </span>
                    </span>
                  </div>
                  <font-awesome-icon icon="chevron-down" />
                </button>
              </h2>
            </div>
            <div
              :id="`policy-balance-${historyIndex}`"
              class="collapse"
              :aria-labelledby="`policy-balance-${historyIndex}-heading`">
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
                          {{ $t('commons.fee-number') }}
                        </th>
                        <th
                          scope="col"
                          class="text-primary text-right">
                          {{ $t('funds.table.header.fee-value') }}
                        </th>
                        <th
                          scope="col"
                          class="text-primary text-right">
                          {{ $t('commons.fund-value') }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row,rowIndex) in history.details"
                        :key="rowIndex">
                        <td>
                          {{ row[0] }}
                        </td>
                        <td>
                          {{ row[1] }}
                        </td>
                        <td class="text-right text-nowrap">
                          {{ row[2] }}
                        </td>
                        <td class="text-right text-nowrap">
                          <span class="d-block">{{ row[3] }}</span>
                          <span class="d-block">{{ row[4] }}</span>
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
      <div
        v-else
        class="mt-4 mt-lg-0">
        <funds-current-portfolio :show-title="false" />
      </div>
    </div>
  </div>
</template>
<script>
import FundsCurrentPortfolio from '../FundsDetails/FundsCurrentPortfolio.vue';

export default {
  name: 'PolicyBalance',
  components: {
    FundsCurrentPortfolio,
  },
  data() {
    return {
      currentView: 'accounts',
      total: '$6.762.537',
      totalUF: 'UF 240,00',
      reportDate: '16/05/2020',
      updateDate: '15/05/2020',
    };
  },
  computed: {
    policyBalance() {
      return this.$store.state.policyBalance;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.policy-balance__title {
  font-size: 1.125em;
}

.policy-balance__basic-details {
  border: 1px solid $tertiary-60;
  border-radius: .25rem;
}

.policy-balance__subtitle-detail {
  font-size: .875em;

  + .policy-balance__subtitle-detail {
    border-top: 1px solid $tertiary-60;
  }
}

.policy-balance__button {
  font-size: 1rem;

  background-color: #fff;

  &:hover,
  &:focus {
    background-color: $tertiary-10;
  }
}

.policy-balance__button-detail {
  + .policy-balance__button-detail {
    &::before {
      width: 1px;
      height: 2rem;

      content: "";

      background-color: $primary-20;
    }
  }
}

.policy-balance__btn-group {
  border: .5px solid $gray-500;
  border-radius: .3125rem;
}

@media (min-width: 768px) {
  .policy-balance__basic-details {
    border: none;
  }

  .policy-balance__content {
    border: 1px solid $secondary-20;
  }

  .policy-balance__subtitle-detail {
    + .policy-balance__subtitle-detail {
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
}

@media (max-width: 767.98px) {
  .policy-balance__list-card {
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

  .policy-balance__list-item {
    &:last-child {
      border-bottom: 1px solid $secondary-10;
    }
  }
}
</style>
