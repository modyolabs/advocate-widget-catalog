<template>
  <div class="funds-current-portfolio">
    <div
      v-if="showTitle"
      class="funds-current-portfolio__title d-none d-md-block">
      <span class="font-weight-bold">
        {{ $t('body.funds-details') }}
      </span>
      <span>
        <font-awesome-icon
          icon="chevron-right"
          class="text-success mx-3" />
      </span>
      <span>{{ $t('body.current-portfolio') }}</span>
    </div>
    <div class="funds-current-portfolio__content mt-md-4 rounded px-4 pb-md-4">
      <h2
        class="funds-current-portfolio__content-title font-weight-normal text-center mb-0 mt-md-4"
        :class="{'d-md-none': !showTitle}">
        {{ $t('body.policy-value-distribution-percentage') }}*
      </h2>
      <div class="funds-current-portfolio__chart-container row py-sm-4 align-items-center justify-content-center">
        <div class="col-8 col-sm-4 col-md-4 col-lg-3 mt-4 mt-sm-0">
          <funds-distribution-chart
            :chart-data="dataCollection"
            :options="options" />
        </div>
        <div class="col-sm-8 col-md-8 col-lg-9 d-flex justify-content-center flex-column text-secondary mt-3 mt-sm-0">
          <div class="funds-current-portfolio__chart-legend pl-md-4 m-0 text-center text-md-left">
            <p
              v-for="(fund,fundIndex) in dataCollection.labels"
              :key="fundIndex"
              class="d-inline-flex d-sm-flex align-items-center py-sm-1 py-md-2 mb-0 ml-3 m-md-0">
              <span
                class="funds-current-portfolio__chart-legend-item-bar mr-2"
                :style="{'background-color':chartColors[fundIndex]}" />
              {{ fund }}
            </p>
          </div>
        </div>
      </div>
      <div class="distribution-table w-100 mt-4 mt-sm-0">
        <div class="overflow-auto">
          <table class="table-striped-rounded table table-striped mb-0 text-secondary">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="distribution-table__th align-middle">
                  {{ $t('funds.table.header.funds') }}
                </th>
                <th
                  scope="col"
                  class="distribution-table__th align-middle">
                  {{ $t('funds.table.header.distribution') }}
                </th>
                <th
                  scope="col"
                  class="distribution-table__th align-middle">
                  <span class="d-block d-lg-inline-block">{{ $t('funds.table.header.fee-value') }}</span>
                  <span class="d-block d-lg-inline-block ml-0 ml-md-1">{{ date }}</span>
                </th>
                <th
                  scope="col"
                  class="distribution-table__th align-middle">
                  <span class="d-block d-lg-inline-block">{{ $t('commons.profitability') }}</span>
                  <span class="d-block d-lg-inline-block ml-0 ml-md-1">{{ $t('commons.last-30-days') }}</span>
                </th>
                <th
                  scope="col"
                  class="distribution-table__th align-middle">
                  <span class="d-block d-lg-inline-block">{{ $t('commons.profitability') }}</span>
                  <span class="d-block d-lg-inline-block ml-0 ml-md-1">{{ $t('commons.last-12-months') }}</span>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row,rowIndex) in currentPortfolio"
                :key="rowIndex">
                <td
                  v-for="(cell,cellIndex) in row"
                  :key="cellIndex">
                  {{ cell }}
                </td>
                <td>
                  <a
                    href="#"
                    class="d-flex align-items-center">
                    <font-awesome-icon
                      class="distribution-table__download-btn"
                      icon="file-download"
                      size="lg" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center py-3 px-3 border-top bg-white rounded-bottom">
          <strong>{{ $t('commons.totals') }}</strong>
          <div class="d-flex flex-column">
            <strong>{{ total }}</strong>
            <span>{{ totalUF }}</span>
          </div>
        </div>
      </div>
      <div class="funds-current-portfolio__notes mt-4 text-secondary font-">
        <p class="mb-0">
          * {{ $t('funds.funds-distribution-percentages') }}:
          <span class="font-weight-light">{{ $t('funds.portfolio-summary-notes[0]') }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import FundsDistributionChart from './FundsDistributionChart.vue';
import ChartDefaultSettings from '../../Charts/ChartDefaultSettings';

export default {
  name: 'FundsCurrentPortfolio',
  components: {
    FundsDistributionChart,
  },
  props: {
    showTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      date: '21/05/2020',
      chartColors: ChartDefaultSettings.ChartColors,
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        elements: {
          center: {
            text: 'Fondos',
            sidePadding: 40, // Default is 20 (as a percentage)
            minFontSize: 16, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 16, // Default is 25 (in px), used for when text wraps
          },
        },
        plugins: {
          labels: {
            render: 'value',
            fontSize: 12,
            fontStyle: 'bold',
            fontColor: '#fff',
            fontFamily: ChartDefaultSettings.ChartFontFamily,
          },
        },
      },
      total: '$6.762.537',
      totalUF: 'UF 240,00',
    };
  },
  computed: {
    currentPortfolio() {
      return this.$store.state.fundsCurrentPortfolio;
    },
    dataCollection() {
      return {
        labels: this.currentPortfolio.map((fund) => fund[0]),
        datasets: [{
          backgroundColor: ChartDefaultSettings.ChartColors,
          data: this.currentPortfolio.map((fund) => parseFloat(fund[1])),
        }],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../scss/variables";

.funds-current-portfolio__title {
  font-size: 1.125em;
}

.funds-current-portfolio__content-title {
  font-size: 1rem;
}

.funds-current-portfolio__chart-legend-item-bar {
  width: 16px;
  height: 4px;

  border-radius: 4px;
}

@media (max-width: 575.98px) {
  .funds-current-portfolio__chart-legend {
    font-size: .75em;
  }
}

@media (max-width: 767.98px) {
  .funds-current-portfolio__notes {
    font-size: .875em;
  }
}

@media (min-width: 768px) {
  .funds-current-portfolio__content {
    border: 1px solid $secondary-20;
  }
}
</style>
