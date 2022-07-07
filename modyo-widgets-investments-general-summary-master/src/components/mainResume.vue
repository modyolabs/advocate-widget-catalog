<template>
  <div
    class="general-summary__main-resume row no-gutters align-items-center
    bg-tertiary-20 p-lg-4 rounded-bottom overflow-hidden"
    :class="{
      'first-tab-item': main.activeTab==='perGroup',
      'last-tab-item': main.activeTab==='perCurrency'
    }">
    <div class="col-lg-4 col-xl-5 d-none d-lg-block">
      <doughnut-chart
        ref="myChart"
        class="mx-auto"
        :width="240"
        :height="240"
        :chart-data="chartData"
        :options="chartOptions" />
    </div>
    <div class="col-lg-8 col-xl-7">
      <div class="d-flex justify-content-between">
        <table class="general-summary__main-resume-table table table-borderless mb-0 rounded-bottom overflow-hidden">
          <thead>
            <tr>
              <th scope="col" />
              <th
                scope="col"
                class="px-0">
                <strong class="text-right d-block">{{ $t('commons.amount') }}</strong>
              </th>
              <th
                scope="col"
                class="pr-2 pr-sm-4 pr-lg-0">
                <strong class="text-right d-none d-lg-block">{{ $t('commons.percentage') }}</strong>
                <strong class="text-right d-block d-lg-none">{{ $t('commons.percentage-abbr') }}</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in sortedItems"
              :key="item.id"
              class="general-summary__main-resume-table-row">
              <td class="text-left pl-2 pl-sm-4 align-middle">
                <span class="d-flex align-items-center">
                  <font-awesome-icon
                    icon="circle"
                    class="mr-2 d-none d-lg-block"
                    :style="{color: item.color[1]}" />
                  <span class="d-block">
                    {{ item.name }}
                  </span>
                </span>
              </td>
              <td class="px-0 align-middle">
                <span class="d-block text-right text-nowrap">
                  {{ item.amount.originValue | currency(getCurrencyFormat(item.amount)) }}
                </span>
              </td>
              <td class="px-2 px-sm-4 pr-lg-0 align-middle">
                <span class="d-block text-right">{{ item.amount.percentage | percentageFormat }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { currency } from '@modyo/financial-commons';
import { getCurrencyFormat, percentageFormat } from '../helpers';
import DoughnutChart from './DoughnutChart';

export default {
  name: 'MainResume',
  components: {
    DoughnutChart,
  },
  filters: {
    currency,
    percentageFormat,
  },
  props: {
    items: { type: Array, required: true },
    tabType: { type: String, required: true },
  },
  data() {
    return {
      chartData: {
        label: 'Resumen General',
        labels: [],
        datasets: [{
          backgroundColor: [],
          data: [],
        }],
      },
      chartOptions: {
        responsive: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const name = data.labels[tooltipItem.index];
              const datael = data.datasets[0].data[tooltipItem.index].toFixed(2).toString().replace(/\./, ',');
              return `${name} : ${datael}%`;
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(['main']),
    sortedItems() {
      const { items } = this;
      let sortBy;
      switch (this.$i18n.locale) {
        case 'en-US':
          sortBy = 'usd';
          break;
        case 'es-CL':
          sortBy = 'clp';
          break;
        /*
        Missing case: 'eur'
        */
        default: break;
      }

      return items.sort((x) => {
        if (x.amount.currency === sortBy) return -1;
        if (x.amount.value === 0) return 1;
        return 0;
      });
    },
  },
  watch: {
    items: {
      handler: 'prepareData',
      immediate: true,
    },
  },
  methods: {
    getCurrencyFormat,
    prepareData() {
      const labels = [];
      const data = [];
      const colors = [];
      this.items.forEach((item) => {
        labels.push(item.name);
        data.push(item.amount.percentage);
        colors.push(item.color[1]);
      });
      this.chartData.labels = labels;
      this.chartData.datasets[0].data = data;
      this.chartData.datasets[0].backgroundColor = colors;
      this.updateChart();
    },

    updateChart() {
      if (this.$refs.myChart) {
        this.$refs.myChart.renderChart(this.chartData, this.chartOptions);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.general-summary__main-resume {
  border-top-left-radius: .35rem;
  border-top-right-radius: .35rem;

  &.first-tab-item {
    border-top-left-radius: 0;
  }
}

@media (max-width: 320px) {
  .table {
    font-size: .8rem;
  }
}

@media (max-width: 575.98px) {
  .general-summary__main-resume {
    &.last-tab-item {
      border-top-right-radius: 0;
    }
  }
}

@media (max-width: 991.98px) {
  .general-summary__main-resume {
    padding-bottom: 1px;
  }

  .general-summary__main-resume-table {
    .general-summary__main-resume-table-row:nth-child(odd) {
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
