<template>
  <div
    id="modalDetail"
    ref="modalDetail"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalDetailMonthly"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-primary">
            {{ month }}
          </h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="row px-md-4 py-md-5 align-items-center bg-white g-0">
            <div class="col-4 d-none d-md-block">
              <doughnut-chart
                class="d-flex m-auto align-items-center doughnut"
                :chart-data="chartData"
                :options="chartOptions" />
            </div>
            <div class="col-12 col-md-8 table-responsive">
              <table class="table table-borderless mb-0 rounded-bottom">
                <thead>
                  <tr>
                    <th scope="col" />
                    <th
                      scope="col"
                      class="px-0">
                      <span class="fw-500 d-block text-end">
                        {{ $t('activity.amount') }}
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-0">
                      <span class="fw-500 d-block text-end">
                        {{ $t('activity.pay-day') }}
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-0">
                      <span class="fw-500 d-block text-end">Id</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(detail, index) in monthDetail"
                    :key="detail.id">
                    <td class="text-start pl-2 pl-sm-4 align-middle">
                      <span class="d-inline-block text-nowrap">
                        <font-awesome-icon
                          icon="circle"
                          class="me-2 d-none d-md-inline-block"
                          :style="{color: colorsGraph[index]}" />
                        <span class="fw-500 text-dark text-nowrap">
                          {{ detail.company }}
                        </span>
                        <span class="fst-normal fs-8 text-secondary-60 d-none d-lg-inline-block">
                          - {{ detail.department }}
                        </span>
                      </span>
                    </td>
                    <td class="px-0">
                      <span class="d-block text-dark fst-normal text-end text-nowrap">
                        {{ detail.amount | currency(currencyFormatMount) }}
                      </span>
                    </td>
                    <td class="px-0">
                      <span class="d-block fw-light text-secondary text-end">{{ detail.payDate | dateFilter }}</span>
                    </td>
                    <td class="px-0">
                      <span class="d-block fw-light text-secondary text-end">{{ detail.id }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/require-default-prop */

import DoughnutChart from './DoughnutChart';
import dateFilter from '../filters/formatDate';

export default {
  name: 'ModalDetail',
  components: {
    DoughnutChart,
  },
  filters: {
    dateFilter,
  },
  props: {
    monthDetail: Array,
    month: String,
  },
  computed: {
    currencyFormatMount() {
      return this.$t('currency.format');
    },
    colorsGraph() {
      return this.$store.state.colorsGraph;
    },
    chartData() {
      const { labels, data, backgroundColor } = this.getChartData();
      return {
        labels,
        datasets: [{
          data,
          backgroundColor,
        }],
      };
    },
    chartOptions() {
      return {
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
      };
    },
  },
  methods: {
    getChartData() {
      let data = [];
      let labels = [];
      let backgroundColor = [];
      if (this.monthDetail.length >= 1) {
        labels = this.monthDetail.map(({ company }) => company);
        backgroundColor = this.colorsGraph;
        const amounts = this.monthDetail.map(({ amount }) => amount);
        const totalAmount = amounts.reduce((prev, curr) => prev + curr);
        data = amounts.map((a) => (a * 100) / totalAmount);
      }
      return {
        labels, data, backgroundColor,
      };
    },
  },
};

</script>

<style scoped>
table {
  border-spacing: 1.5em 0;
  border-collapse: separate;
}
@media (min-width: 768px) {
  .doughnut {
    width: 120px;
    height: 120px;
  }
}
@media (min-width: 992px) {
  .doughnut {
    width: 250px;
    height: 250px;
  }
}
</style>
