<template>
  <div class="stocks-list col-lg-4 px-0 py-4">
    <aside class="stocks-list__aside d-flex flex-column">
      <div class="stocks-list__invest-filters px-4">
        <multiselect
          v-model="filterBy"
          :options="categories"
          :show-no-results="false"
          :show-labels="false"
          :searchable="false"
          :allow-empty="false">
          >
          <template
            slot="singleLabel"
            slot-scope="{ option }">
            {{ option=='all' ? $t('commons.all') : option }}
          </template>
          <template
            slot="option"
            slot-scope="{option}">
            {{ option=='all' ? $t('commons.all') : option }}
          </template>
        </multiselect>

        <div class="form-group mt-4">
          <label
            for="query"
            class="sr-only">{{ $t('commons.search') }}</label>
          <input
            id="query"
            v-model="query"
            type="search"
            class="form-control"
            :placeholder="$t('commons.search')+'...'"
            @input="search($event.target.value)">
        </div>

        <m-switch-button
          v-model="showClientStocks"
          active-color="#2e4553"
          class="mt-4 mb-3 mx-1">
          {{ $t('stock-list.my-stock-lbl') }}
        </m-switch-button>
      </div>
      <div class="stocks-list__stocks pt-2">
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
            <div class="d-flex flex-column justify-content-center p-4 h-100">
              <h5 class="text-center">
                {{ $t('commons.empty') }}
              </h5>
            </div>
          </template>
        </m-response-control>

        <m-shadow-scroll
          v-else
          class="h-100"
          start-color="#fff"
          end-color="#ffffff00">
          <a
            v-for="stock in filteredStocks"
            :key="stock.id"
            :class="{'btn-primary': stock === selectedStock}"
            href="#"
            class="stocks-list__stocks-item btn d-flex justify-content-between border mb-2 mx-4 text-left"
            @click.prevent="selectStock(stock)">
            <span
              :class="{'text-white': stock === selectedStock}"
              class="pr-3">{{ stock.symbol }}</span>
            <span class="d-flex align-items-center">
              <strong>{{ stock.percentageChange30dString }}</strong>
              <span
                v-tooltip:top="$t('stock-list.variation-tooltip')"
                class="stocks-list__variation-icon mx-3 rounded-circle text-white
              d-flex justify-content-center align-items-center"
                :class="{'increase':stock.percentageChange30d > 0, 'decrease':stock.percentageChange30d < 0}">
                <font-awesome-icon
                  v-if="stock.percentageChange30d > 0"
                  icon="arrow-up" />
                <font-awesome-icon
                  v-if="stock.percentageChange30d < 0"
                  icon="arrow-down" />
              </span>
              <font-awesome-icon
                icon="chevron-right"
                size="xs" />
            </span>
          </a>
        </m-shadow-scroll>
      </div>
    </aside>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import {
  debounce, MSwitchButton, MShadowScroll, MResponseControl,
} from '@modyo/financial-commons';

export default {
  name: 'StocksList',
  components: {
    Multiselect,
    MSwitchButton,
    MShadowScroll,
    MResponseControl,
  },
  props: {
    allStocks: { type: Array, required: true },
    apiStatus: { type: [String, Boolean], required: true },
  },
  data() {
    return {
      query: '',
      showClientStocks: false,
      filteredStocks: [],
      filterBy: 'all',
    };
  },
  computed: {
    stocks() {
      if (this.showClientStocks) {
        this.resetFilters();
        return this.allStocks.filter((stock) => stock.investments);
      }
      return this.allStocks;
    },

    selectedStock() {
      return this.$store.state.selectedStock;
    },

    categories() {
      return ['all', ...(new Set(this.stocks.map((stock) => stock.classification)))];
    },
  },
  watch: {
    stocks: 'search',
    filterBy: 'filterStocks',
  },
  methods: {
    selectStock(stock) {
      this.$store.commit('SET_SELECTED_STOCK', stock);
    },
    resetFilters() {
      this.filterBy = 'all';
      this.query = '';
    },

    filterStocks() {
      const vm = this;
      this.filteredStocks = [];
      if (this.filterBy !== 'all') {
        this.query = '';
        this.filteredStocks = this.stocks.filter((stock) => stock.classification === vm.filterBy);
      } else {
        this.filteredStocks = this.stocks;
      }
    },

    search: debounce(function search() {
      const vm = this;
      this.filterBy = 'all';
      this.filteredStocks = [];
      if (this.query.length >= 3) {
        this.filteredStocks = this.stocks.filter((stock) => {
          const compare = stock.name.toLowerCase();
          return compare.indexOf(vm.query.toLowerCase()) >= 0;
        });
      } else {
        this.filteredStocks = this.stocks;
      }
    }, 200),

    openTooltip() {
      this.$el.querySelector('.variation-tooltip').classList.add('show');
    },

    closeTooltip() {
      this.$el.querySelector('.variation-tooltip').classList.remove('show');
    },
  },
};
</script>

<style lang="css" src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables";

.stocks-list__variation-icon {
  width: 1.25rem;
  height: 1.25rem;

  font-size: .8rem;

  &.increase {
    background-color: $primary-dark;
  }

  &.decrease {
    background-color: $tertiary-dark;
  }
}

@media (min-width: 992px) {
  .stocks-list,
  .stocks-list__aside,
  .stocks-list__stocks {
    height: 100%;
  }

  .stocks-list__stocks {
    overflow-x: visible;
    overflow-y: scroll;
  }
}
</style>
