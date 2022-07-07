<template>
  <div class="transactions-list d-flex flex-column h-100 overflow-hidden pt-4">
    <div class="transactions-list-header mt-md-2 mx-4 mx-lg-5">
      <h5 class="text-primary font-weight-bold flex-fill">
        {{ $t('transactions-list.title') }}
      </h5>
    </div>

    <div class="transactions-list__filters mt-2 mt-lg-4 px-4 px-lg-5 d-flex flex-wrap">
      <div class="filters__select mr-2 mr-sm-3">
        <multiselect
          v-model="filterBy"
          track-by="value"
          label="name"
          :options="filters"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          :searchable="false">
          <template
            slot="singleLabel"
            slot-scope="{ option }">
            {{ option.name }}
          </template>
        </multiselect>
      </div>

      <div class="filters__date mr-2 mr-sm-3">
        <vue-date-picker
          v-model="fromToDates"
          :format="dateFormats.short"
          :max-date="maxDate"
          :locale="{lang: dateFormats.lang}"
          :range-presets="rangePresets"
          color="#2e4553"
          :name="$t('transactions-list.select-period')"
          fullscreen-mobile
          validate
          range
          no-input
          @input="setNewDates">
          <template #activator="{ date }">
            <button
              ref="activator"
              class="filters-date__btn-mobile btn btn-link d-lg-none p-2"
              type="button">
              <font-awesome-icon
                icon="calendar" />
            </button>
            <button
              ref="activator"
              class="filters-date__btn btn d-none d-lg-inline-block p-2 border"
              type="button">
              <font-awesome-icon
                icon="calendar"
                class="mr-2" />
              {{ date }}
            </button>
          </template>
        </vue-date-picker>
      </div>

      <div class="filters__search-icon">
        <button
          class="btn"
          :class="{'btn-primary': showSearch}"
          @click="toggleSearch">
          <span class="sr-only">{{ $t('actions.search') }}</span>
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>

    <div
      v-show="showSearch"
      class="filters__search-bar mt-3 mx-4 mx-lg-5">
      <label
        for="query"
        class="sr-only">{{ $t('actions.search') }}</label>
      <input
        id="query"
        v-model="query"
        type="search"
        class="form-control py-2"
        :placeholder="$t('actions.search')">
    </div>

    <m-response-control
      v-if="apiStatus"
      class="text-center py-5"
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
        <div class="transactions-list--empty">
          <font-awesome-icon
            icon="exclamation-triangle"
            size="2x"
            class="mb-2" />
          <p>{{ $t('transactions-list.empty') }}</p>
        </div>
      </template>
    </m-response-control>

    <m-shadow-scroll
      v-if="!apiStatus && transactions.length > 0"
      id="transactionsList"
      class="transactions-list__items mt-4">
      <div
        v-for="(group, keyName, index) in groupedTransactions"
        :key="index"
        class="accordion mb-4 mx-4 mx-lg-5">
        <p class="text-primary font-weight-bold mb-2">
          {{ keyName }}
        </p>
        <transaction-item
          v-for="transaction in group"
          :key="transaction.id"
          :transaction="transaction" />
      </div>
    </m-shadow-scroll>
  </div>
</template>

<script>
import {
  MShadowScroll, MResponseControl, date, groupBy,
} from '@modyo/financial-commons';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import Multiselect from 'vue-multiselect';
import TransactionItem from './TransactionItem.vue';

export default {
  name: 'TransactionsList',
  filter: {
    date,
    groupBy,
  },
  components: {
    VueDatePicker,
    Multiselect,
    TransactionItem,
    MShadowScroll,
    MResponseControl,
  },

  data() {
    return {
      apiStatus: false,
      query: '',
      activeTransaction: null,
      dateFormats: this.$t('date.format'),
      localFromDate: null,
      localToDate: null,
      maxDate: new Date(),
      showSearch: false,
      filters: [
        { name: this.$t('transactions-list.filters.all'), value: 'all' },
        { name: this.$t('transactions-list.filters.income'), value: 'income' },
        { name: this.$t('transactions-list.filters.outgoing'), value: 'outgoing' },
      ],
      rangePresets: [
        {
          name: this.$t('date.format.this-month'),
          dates: {
            start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
          },
        },
        {
          name: this.$t('date.format.last-month'),
          dates: {
            start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
          },
        },
        {
          name: this.$t('date.format.last-3-months'),
          dates: {
            start: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
            end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
          },
        },
        {
          name: this.$t('date.format.last-6-months'),
          dates: {
            start: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
            end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
          },
        },
      ],
    };
  },
  computed: {
    fromToDates: {
      get() {
        return {
          start: this.$store.state.fromDate,
          end: this.$store.state.toDate,
        };
      },
      set(values) {
        const { start, end } = values;
        this.localFromDate = start;
        this.localToDate = end;
      },
    },

    transactions() {
      return this.$store.state.transactions;
    },

    activeTab() {
      return this.$store.state.activeTab;
    },

    filterBy: {
      get() {
        const filter = this.$store.state.filterBy;
        if (filter) return filter;
        return this.filters[0];
      },
      set(payload) {
        return this.$store.commit('SET_FILTER_BY', payload);
      },
    },

    filteredTransactions() {
      return this.transactions.filter((transaction) => {
        if (this.filterBy.value === 'all') {
          if (!this.query.length) {
            return transaction;
          }
          return this.isInQuery(transaction);
        } if (!this.query.length) {
          return transaction.subject === this.filterBy.value;
        }
        return this.isInQuery(transaction) && transaction.subject === this.filterBy.value;
      });
    },

    groupedTransactions() {
      const groupKey = 'bookingDate';
      return this.$options.filter.groupBy(this.filteredTransactions, (item) => {
        const isoDate = new Date(item[groupKey]);
        const GMTZeroDate = new Date(isoDate.valueOf() + new Date().getTimezoneOffset() * 60 * 1000);
        const key = this.$options.filter.date(GMTZeroDate, this.dateFormats.long, this.dateFormats.lang);
        return key;
      });
    },
  },
  created() {
    this.getTransactions();
  },
  methods: {
    toggleSearch() {
      this.query = '';
      this.showSearch = !this.showSearch;
    },

    isInQuery(transaction) {
      return this.searchByDescription(transaction) || this.searchByAmount(transaction);
    },

    searchByDescription(transaction) {
      return transaction.description.toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
    },

    searchByAmount(transaction) {
      if (Object.prototype.hasOwnProperty.call(transaction, 'amount')) {
        return transaction.amount.indexOf(this.query) >= 0;
      }
      return true;
    },

    getTransactions() {
      this.apiStatus = 'isLoading';
      this.$store.dispatch('GET_TRANSACTIONS')
        .then((payload) => {
          this.apiStatus = payload.length > 0 ? false : 'isEmpty';
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
    setNewDates() {
      this.$store.commit('SET_FROM_DATE', this.localFromDate);
      this.$store.commit('SET_TO_DATE', this.localToDate);
      this.getTransactions();
    },
  },
};
</script>

<style src="@mathieustan/vue-datepicker/dist/vue-datepicker.min.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables";

.transactions-list--empty {
  width: 300px;
  margin: auto;
  margin-top: 100px;

  color: $primary-60;

  text-align: center;
}

.transactions-list__items {
  height: 100%;
  overflow: auto;
}

.transactions-list__filters {
  .filters__select {
    flex: 1 0 auto;

    .multiselect {
      color: $secondary-100;
    }

    .multiselect__tags {
      border-color: $tertiary-100;

      &:hover {
        border-color: $secondary-100;
      }
    }
  }

  .filter__date {
    flex: 1 0 auto;
  }

  .filters-date__btn.btn {
    font-size: 14px;
    color: $secondary-100;

    background-color: #fff;

    border-color: $tertiary-100;

    &:hover {
      border-color: $secondary-100;
    }
  }

  .filters__search-icon {
    flex: 0 1 auto;
  }

  .filters__search-bar {
    flex: 1 0 100%;

    .form-control {
      height: initial;
    }
  }
}

</style>
