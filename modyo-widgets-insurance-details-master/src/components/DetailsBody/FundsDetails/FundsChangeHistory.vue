<template>
  <div class="funds-change-history">
    <div class="funds-change-history__title d-none d-md-block">
      <span class="font-weight-bold">
        {{ $t('body.funds-details') }}
      </span>
      <span>
        <font-awesome-icon
          icon="chevron-right"
          class="text-success mx-3" />
      </span>
      <span>{{ $t('funds.change.history') }}</span>
    </div>
    <div class="funds-change-history__content mt-0 mt-md-4">
      <ul class="list-unstyled mb-0">
        <li
          v-for="(history,historyIndex) in fundsChangeHistory"
          :key="historyIndex"
          class="funds-change-history__list-item"
          :class="{'mt-md-2':historyIndex!==0}">
          <div class="funds-change-history__list-card card">
            <div
              :id="`fund-change-${historyIndex}-heading`"
              class="card-header p-0">
              <h2 class="mb-0">
                <button
                  class="funds-change-history__button btn btn-link btn-block
                  text-left d-flex justify-content-between align-items-center py-3 px-4"
                  type="button"
                  data-toggle="collapse"
                  :data-target="`#fund-change-${historyIndex}`"
                  aria-expanded="true"
                  :aria-controls="`fund-change-${historyIndex}`">
                  <div class="row flex-fill">
                    <span class="funds-change-history__button-detail col-md-4 d-flex align-items-center">
                      {{ $tc('commons.order-number',history.number) }}
                    </span>
                    <span class="funds-change-history__button-detail col-md-4 d-md-flex align-items-center">
                      <span class="mx-auto d-none d-md-block">
                        {{ $t('commons.status') }}: {{ $t(`status.${history.status}`) }}
                      </span>
                      <span class="d-md-none text-secondary">
                        {{ $t(`status.${history.status}`) }}
                      </span>
                    </span>
                    <span class="funds-change-history__button-detail col-md-4 d-md-flex d-none align-items-center">
                      <span class="mx-auto">{{ $t('commons.date') }}: {{ history.date }}</span>
                    </span>
                  </div>
                  <font-awesome-icon icon="chevron-down" />
                </button>
              </h2>
            </div>
            <div
              :id="`fund-change-${historyIndex}`"
              class="collapse"
              :aria-labelledby="`fund-change-${historyIndex}-heading`">
              <div class="card-body pt-3 pb-4 py-md-5">
                <div class="d-md-none text-secondary">
                  {{ $t('commons.date') }}: {{ history.date }}
                </div>
                <div class="mt-2">
                  {{ $t('funds.change.result-portfolio-dist') }}
                  <div class="distribution-table mt-4 overflow-auto">
                    <table class="table-striped-rounded table table-striped mb-0 text-secondary">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="text-primary">
                            {{ $t('funds.table.header.funds') }}
                          </th>
                          <th
                            scope="col"
                            class="text-primary">
                            {{ $t('funds.table.header.distribution') }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row,rowIndex) in history.result"
                          :key="rowIndex">
                          <td>
                            {{ row[0] }}
                          </td>
                          <td>
                            {{ row[1] }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mt-4 mt-md-5 border-top pt-4 pt-md-5">
                  {{ $t('funds.change.modified-portfolio-dist') }}
                  <div class="distribution-table mt-4">
                    <table class="table-striped-rounded table table-striped mb-0 text-secondary">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="text-primary">
                            {{ $t('funds.table.header.funds') }}
                          </th>
                          <th
                            scope="col"
                            class="text-primary">
                            {{ $t('funds.table.header.distribution') }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row,rowIndex) in history.before"
                          :key="rowIndex">
                          <td>
                            {{ row[0] }}
                          </td>
                          <td>
                            {{ row[1] }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
export default {
  name: 'FundsChangeHistory',
  computed: {
    fundsChangeHistory() {
      return this.$store.state.fundsChangeHistory;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.funds-change-history__title {
  font-size: 1.125em;
}

.funds-change-history__button {
  font-size: 1rem;

  background-color: #fff;

  &:hover,
  &:focus {
    background-color: $tertiary-10;
  }
}

.funds-change-history__button-detail {
  &:first-child {
    font-weight: 500;
  }

  + .funds-change-history__button-detail {
    &::before {
      width: 1px;
      height: 2rem;

      content: "";

      background-color: $primary-20;
    }
  }
}

@media (max-width: 767.98px) {
  .funds-change-history__list-card {
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

  .funds-change-history__list-item {
    &:last-child {
      border-bottom: 1px solid $secondary-10;
    }
  }
}
</style>
