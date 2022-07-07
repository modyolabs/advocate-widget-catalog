<template>
  <div
    id="transfers-app"
    class="transfers py-lg-5">
    <div class="transfers__container container-lg p-0">
      <div class="transfers__row row no-gutters">
        <div class="col-lg-4 p-4">
          <h3 class="h5 text-primary d-none d-lg-block">
            {{ $t('main.title') }}
          </h3>
          <div class="row">
            <div class="form-group mt-lg-4 mb-0 col-sm-6 col-lg-12">
              <label for="">{{ $t('date.format.range') }}</label>
              <vue-date-picker
                v-model="dateRange"
                :max-date="maxDate"
                :format="dateFormats.short"
                :range="true"
                :fullscreen-mobile="true"
                :locale="{lang: dateFormats.lang}"
                color="#2e4553"
                @onChange="fetchMovements">
                <template #activator="{date}">
                  <button
                    ref="activator"
                    class="transfers__date-filter-btn form-control btn d-flex btn-white border align-items-center"
                    type="button">
                    <font-awesome-icon
                      icon="calendar"
                      class="mr-2" />
                    <span class="text-capitalize">{{ date }}</span>
                  </button>
                </template>
              </vue-date-picker>
            </div>
            <div class="form-group mt-3 mt-sm-0 mt-lg-4 mb-0 col-sm-6 col-lg-12">
              <label for="">{{ $t('main.transfer-type') }}</label>
              <div class="radio-pills-group d-flex justify-content-between mt-0 mb-0">
                <div class="radio-pill flex-fill">
                  <input
                    v-model="filter"
                    type="radio"
                    value="all">
                  <label
                    for=""
                    class="d-flex justify-content-center">{{ $t('main.filters.all') }}</label>
                </div>
                <div class="radio-pill flex-fill">
                  <input
                    v-model="filter"
                    type="radio"
                    value="CARGO">
                  <label
                    for=""
                    class="d-flex justify-content-center">{{ $t('main.filters.transfers') }}</label>
                </div>
                <div class="radio-pill flex-fill">
                  <input
                    v-model="filter"
                    type="radio"
                    value="ABONO">
                  <label
                    for=""
                    class="d-flex justify-content-center">{{ $t('main.filters.payments') }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="transfers__content col-lg-8 py-lg-4">
          <m-response-control
            v-if="apiStatus"
            class="h-100 d-flex justify-content-center align-items-center"
            :status="apiStatus">
            <template #loading>
              <div
                class="loading spinner-border"
                role="status">
                <span class="sr-only">{{ $t('commons.loading') }}</span>
              </div>
            </template>
            <template #error>
              <div class="d-flex flex-column justify-content-center p-4 h-100">
                <h5 class="text-center">
                  {{ $t('commons.try-again') }}
                </h5>
              </div>
            </template>
            <template #empty>
              <div class="d-flex flex-column justify-content-center p-4 h-100">
                <h5 class="text-center">
                  {{ $t('commons.empty') }}
                </h5>
              </div>
            </template>
          </m-response-control>
          <div
            v-else
            class="transfers__list d-flex">
            <div
              v-if="!filteredMovements.length"
              class="p-5 align-self-center mx-auto">
              <h4 class="text-center">
                {{ $t('main.no-movements') }}
              </h4>
            </div>
            <div
              v-else
              class="flex-fill">
              <div class="row no-gutters px-3 mx-4 d-none d-lg-flex">
                <div class="col-2">
                  <strong class="text-primary">{{ $t('commons.date') }}</strong>
                </div>
                <div class="col">
                  <strong class="text-primary">{{ $t('commons.description') }}</strong>
                </div>
                <div class="col">
                  <strong class="text-primary">{{ $t('commons.from') }}</strong>
                </div>
                <div class="col">
                  <strong class="text-primary">{{ $t('commons.to') }}</strong>
                </div>
                <div class="col text-right">
                  <strong class="text-primary">{{ $t('commons.amount') }}</strong>
                </div>
              </div>
              <div class="transfers__list-body">
                <div class="d-none d-lg-block px-4 pb-4 pt-2">
                  <div
                    v-for="movement in filteredMovements"
                    :key="movement.id"
                    class="row no-gutters border rounded-lg bg-white mt-2 p-3">
                    <div class="col-2">
                      {{ movement.date | date(dateFormats.long) }}
                    </div>
                    <div class="col">
                      {{ movement.description }}
                    </div>
                    <div class="col">
                      {{ movement.source.name }}
                      <small
                        v-if="movement.source.class === 'bank'"
                        class="d-block mt-1">
                        {{ movement.source.number }}
                      </small>
                    </div>
                    <div class="col">
                      {{ movement.target.name }}
                    </div>
                    <div class="col text-right">
                      {{ movement.amount.valueString }}
                    </div>
                  </div>
                </div>
                <div
                  id="movementsAccordion"
                  class="accordion d-lg-none pb-4">
                  <div
                    v-for="movement in filteredMovements"
                    :key="movement.id"
                    class="transfers__movements-accordion-card card rounded-0 border-left-0
                    border-right-0 px-0 border-top">
                    <div
                      :id="`movement${movement.id}`"
                      class="card-header p-0 bg-white">
                      <h2 class="mb-0">
                        <button
                          class="transfers__movements-accordion-btn btn btn-link btn-block collapsed
                          row d-flex justify-content-between align-items-center px-4 py-3 m-0 no-gutters"
                          type="button"
                          data-toggle="collapse"
                          :data-target="`#movement${movement.id}_collapse`"
                          :aria-controls="`movement${movement.id}_collapse`">
                          <span class="d-flex flex-column col text-left">
                            <small>{{ movement.date }}</small>
                            <span>{{ movement.description }}</span>
                          </span>
                          <span class="d-block col text-right">{{ movement.amount.valueString }}</span>
                          <font-awesome-icon
                            size="xs"
                            icon="chevron-up"
                            class="transfers__movements-card-collapse-icon ml-2 text-muted" />
                        </button>
                      </h2>
                    </div>
                    <div
                      :id="`movement${movement.id}_collapse`"
                      class="collapse bg-light px-2 border-top"
                      :aria-labelledby="`movement${movement.id}`"
                      data-parent="#movementsAccordion">
                      <div class="card-body py-3">
                        <div class="row no-gutters">
                          <div class="col-3 text-primary">
                            <strong>{{ $t('commons.from') }}:</strong>
                          </div>
                          <div class="col d-block pl-2">
                            {{ movement.source.name }}
                            <small
                              v-if="movement.source.class === 'bank'"
                              class="d-block">
                              {{ movement.source.number }}
                            </small>
                          </div>
                        </div>
                        <div class="row no-gutters mt-2">
                          <div class="col-3 text-primary">
                            <strong>{{ $t('commons.to') }}:</strong>
                          </div>
                          <div class="col pl-2">
                            {{ movement.target.name }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  format, parseISO, subDays,
} from 'date-fns';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import { date, MResponseControl } from '@modyo/financial-commons';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default {
  name: 'InvestmentsTransfers',
  components: {
    VueDatePicker,
    MResponseControl,
  },
  filters: {
    date,
  },
  data() {
    return {
      apiStatus: false,
      filteredMovements: [],
      filter: 'all',
      maxDate: new Date(),
      dateFormats: this.$t('date.format'),
      dateRange: {
        start: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        end: format(new Date(), 'yyyy-MM-dd'),
      },
    };
  },
  computed: {
    movements() {
      return this.$store.state.movements;
    },
  },
  watch: {
    filter() {
      this.filterMovements();
    },
  },
  created() {
    this.fetchMovements();
  },
  methods: {
    fetchMovements() {
      this.apiStatus = 'isLoading';
      const from = format(parseISO(this.dateRange.start), 'yyyy-MM-dd');
      const to = format(parseISO(this.dateRange.end), 'yyyy-MM-dd');

      this.$store.dispatch('GET_MOVEMENTS', { from, to })
        .then(() => {
          if (this.$store.state.movements.length <= 0) {
            this.apiStatus = 'isEmpty';
          } else {
            this.filterMovements();
            this.apiStatus = false;
          }
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
    filterMovements() {
      if (this.filter !== 'all') {
        this.filteredMovements = this.movements.filter((movement) => movement.type === this.filter);
      } else {
        this.filteredMovements = this.movements;
      }
      this.apiStatus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

.transfers,
.transfers__container,
.transfers__list {
  min-height: 100%;
}

.transfers {
  background-color: #fff;
}

.transfers__movements-accordion-card {
  .transfers__movements-accordion-btn {
    &.collapsed {
      .transfers__movements-card-collapse-icon {
        transform: rotate(180deg);
      }
    }
  }
}

@media (max-width: 320px) {
  .transfers__date-filter-btn {
    font-size: .9rem;
    line-height: .9rem;
  }
}

@media (min-width: 992px) {
  .transfers,
  .transfers__container,
  .transfers__row,
  .transfers__content,
  .transfers__list,
  .transfers__list-body {
    height: 100%;
  }

  .transfers {
    background-color: transparent;
  }

  .transfers__container {
    background-color: #fff;
  }

  .transfers__content {
    overflow: hidden;

    background-color: $tertiary-20;
  }

  .transfers__list-body {
    overflow-y: scroll;
  }
}
</style>
