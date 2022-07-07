<template>
  <div class="col-lg-8 stocks-details p-4 h-100 overflow-auto">
    <div
      v-if="!selectedStock"
      class="stocks-detail__empty d-flex flex-column justify-content-center align-items-center p-4">
      <h3>{{ $t('stock-details.title') }}</h3>
      <p>
        {{ $t('stock-details.subtitle') }}
      </p>
    </div>

    <div
      v-else
      class="stocks-details__content">
      <div
        class="stocks-details__header d-flex align-items-start flex-column">
        <a
          href="#"
          class="d-lg-none"
          @click.prevent="unsetSelectedStock">
          <font-awesome-icon
            icon="arrow-left"
            class="mr-2" />
          {{ $t('commons.back-btn') }}
        </a>
        <p class="text-muted mb-0 mb-lg-2 mt-4 mt-lg-0">
          {{ selectedStock.classification }}
        </p>
        <h3 class="mb-0 text-primary">
          <strong>{{ selectedStock.name }}</strong>
        </h3>
      </div>

      <div class="stocks-details__body d-flex flex-column justify-content-between mt-4 mt-lg-0">
        <div class="d-block d-lg-none mb-lg-3">
          <ul class="nav nav-pills row no-gutters justify-content-between justify-content-lg-start">
            <li class="nav-item col-6 pr-2">
              <a
                :class="tabChart ? 'active btn-light text-white' : 'border'"
                href="#"
                class="nav-link text-center"
                @click="tabChart = true">{{ $t('stock-details.graph-btn') }}</a>
            </li>
            <li class="nav-item col-6 pl-2">
              <a
                :class="!tabChart ? 'active btn-light text-white' : 'border'"
                href="#"
                class="nav-link text-center"
                @click="tabChart = false">{{ $t('stock-details.info') }}</a>
            </li>
          </ul>
        </div>

        <div class="row no-gutters align-items-center bg-white p-lg-4 rounded my-4">
          <div
            class="col-lg-3 d-lg-block order-2 order-lg-0"
            :class="{'d-none': tabChart}">
            <div
              class="pr-2 text-lg-center
            d-flex flex-row flex-lg-column justify-content-center justify-content-between">
              <div class="mb-lg-4 flex-fill">
                <div>
                  <p class="mb-2 bg-tertiary text-white rounded-lg d-inline-block px-2 font-weight-light">
                    {{ $t('stock-details.closing-peak') }}
                  </p>
                </div>
                <strong>{{ selectedStock.peakPurchasePrice.valueString }}</strong>
                <p class="mb-1">
                  {{ $t('commons.price') }}
                </p>
                <strong>{{ selectedStock.peakPurchasePrice.quantity | formatNum }}</strong>
                <p class="mb-0">
                  {{ $t('commons.quantity') }}
                </p>
              </div>

              <div class="flex-fill pl-4 pl-lg-0">
                <div>
                  <p class="mb-2 bg-tertiary text-white rounded-lg d-inline-block px-2 font-weight-light">
                    {{ $t('stock-details.selling-peak') }}
                  </p>
                </div>
                <strong>{{ selectedStock.peakSellingPrice.valueString }}</strong>
                <p class="mb-1">
                  {{ $t('commons.price') }}
                </p>
                <strong>{{ selectedStock.peakSellingPrice.quantity | formatNum }}</strong>
                <p class="mb-0">
                  {{ $t('commons.quantity') }}
                </p>
              </div>
            </div>
          </div>
          <div
            :class="{'d-none': !tabChart}"
            class="col-lg-9">
            <line-chart
              :chart-data="chartData"
              :options="chartOptions"
              :height="200" />
            <div class="d-flex filter-graphic-detail align-items-center justify-content-between mt-3">
              <button
                :class="{'active': graphicPeriod == 1}"
                class="btn btn-light btn-sm mr-1 flex-fill"
                @click="graphicPeriod = 1">
                {{ $tc('stock-details.graph.filter.days', 1 ) }}
              </button>
              <button
                :class="{'active': graphicPeriod == 5}"
                class="btn btn-light btn-sm mx-1 flex-fill"
                @click="graphicPeriod = 5">
                {{ $tc('stock-details.graph.filter.days', 5 ) }}
              </button>
              <button
                :class="{'active': graphicPeriod == 30}"
                class="btn btn-light btn-sm mx-1 flex-fill"
                @click="graphicPeriod = 30">
                {{ $tc('stock-details.graph.filter.days', 30 ) }}
              </button>
              <button
                :class="{'active': graphicPeriod == 182}"
                class="btn btn-light btn-sm mx-1 flex-fill"
                @click="graphicPeriod = 182">
                {{ $tc('stock-details.graph.filter.months', 6 ) }}
              </button>
              <button
                :class="{'active': graphicPeriod == 365}"
                class="btn btn-light btn-sm ml-1 flex-fill"
                @click="graphicPeriod = 365">
                {{ $tc('stock-details.graph.filter.years', 1 ) }}
              </button>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between flex-column flex-lg-row">
          <div class="d-flex flex-row flex-lg-column">
            <p class="mb-0 font-weight-bolder mr-3 mr-lg-0">
              {{ $t('stock-details.traded-stocks') }}<span class="d-lg-none">:</span>
            </p>
            <p class="mb-0">
              {{ selectedStock.tradedShares.quantity | formatNum }}
            </p>
          </div>
          <div class="d-flex flex-row flex-lg-column">
            <p class="mb-0 font-weight-bolder mr-3 mr-lg-0">
              {{ $t('commons.amount') }}<span class="d-lg-none">:</span>
            </p>
            <p class="mb-0">
              {{ selectedStock.tradedShares.valueString }}
            </p>
          </div>
          <div class="d-flex flex-row flex-lg-column">
            <p class="mb-0 font-weight-bolder mr-3 mr-lg-0 text-center">
              {{ $t('stock-details.last-price') }}<span class="d-lg-none">:</span>
            </p>
            <p class="mb-0">
              {{ selectedStock.price.valueString }}
            </p>
          </div>
          <div class="d-flex flex-row flex-lg-column">
            <p class="mb-0 font-weight-bolder mr-3 mr-lg-0">
              {{ $t('stock-details.variation') }}<span class="d-lg-none">:</span>
            </p>
            <p class="mb-0">
              {{ selectedStock.variationString }}
            </p>
          </div>
          <div class="d-flex flex-row flex-lg-column">
            <p class="mb-0 font-weight-bolder mr-3 mr-lg-0">
              {{ $t('stock-details.max') }}<span class="d-lg-none">:</span>
            </p>
            <p class="mb-0">
              {{ selectedStock.highestPrice.valueString }}
            </p>
          </div>
          <div class="d-flex flex-row flex-lg-column">
            <p class="mb-0 font-weight-bolder mr-3 mr-lg-0">
              {{ $t('stock-details.min') }}<span class="d-lg-none">:</span>
            </p>
            <p class="mb-0">
              {{ selectedStock.lowestPrice.valueString }}
            </p>
          </div>
        </div>
        <p class="mb-0 text-lg-right text-muted mt-3">
          <small>* {{ $t('stock-details.last-day-values-msg') }}</small>
        </p>
      </div>

      <div class="mutual-funds-details__footer row no-gutters mt-4">
        <div class="col-6 pr-lg-3 pr-2">
          <button
            class="btn btn-primary btn-block"
            data-toggle="modal"
            data-target="#input">
            {{ $t('stocks-buy.buy-btn') }}
          </button>
        </div>
        <div class="col-6 pl-lg-3 pl-2">
          <button
            :disabled="isSellDisabled"
            class="btn btn-primary btn-block"
            data-toggle="modal"
            data-target="#rescue">
            {{ $t('stocks-sell.sell-btn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNum } from '@modyo/financial-commons';
import LineChart from './LineChart';

export default {
  name: 'StocksDetails',
  filters: {
    formatNum,
  },
  components: {
    LineChart,
  },
  data() {
    return {
      isLoading: true,
      tabChart: true,
      graphicPeriod: 30,
      chartOptions: {
        responsive: true,
        title: { display: false },
        legend: { display: false },
        scales: { xAxes: [{ display: false }] },
      },
    };
  },
  computed: {
    chartData() {
      let data = this.$store.state.graphicData;
      if (data === null || !data.length) {
        data = [];
      }
      const periodData = data.slice(-1 * this.graphicPeriod);
      return {
        labels: periodData,
        datasets: [{
          backgroundColor: '#4bc0c0',
          borderColor: '#4bc0c0',
          data: periodData,
          pointRadius: 2,
          pointHoverRadius: 6,
          pointHoverBorderColor: '#777',
          pointHoverBorderWidth: 4,
          fill: false,
        }],
      };
    },
    selectedStock() {
      return this.$store.state.selectedStock;
    },

    clientStocks() {
      return this.$store.state.clientStocks;
    },

    isSellDisabled() {
      if (this.selectedStock.investments) {
        return false;
      }
      return true;
    },
  },
  watch: {
    selectedStock(stock) {
      if (stock) {
        this.fetchGraphicData();
      }
    },
  },
  methods: {
    unsetSelectedStock() {
      this.$store.commit('SET_SELECTED_STOCK', null);
      this.$store.commit('SET_GRAPHIC_DATA', null);
    },

    fetchGraphicData() {
      const vm = this;
      this.isLoading = true;
      this.$store.dispatch('GET_GRAPHIC_DATA', {
        stockId: this.selectedStock.id,
        quotaAmount: this.selectedStock.price.value,
      })
        .then(() => {
          vm.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

@media (min-width: 992px) {
  .stocks-detail__empty {
    height: 100%;
  }

  .stocks-details {
    background-color: $tertiary-20;
  }
}
</style>
