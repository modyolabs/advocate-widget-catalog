<template>
  <div>
    <chart-filter />
    <div
      v-if="singleChartView === 'balance' && Object.keys(barDataset).length != 0"
      class="d-flex align-items-center">
      <div class="flex-fill">
        <bar-chart-single
          class="p-0 px-md-4 pt-md-4 pb-md-5 mb-0 mb-md-4"
          :dataset="barDataset" />
      </div>
      <div class="mb-4 d-none d-md-block">
        <upcoming-movements />
      </div>
    </div>
    <div
      v-if="singleChartView === 'expenses'">
      <doughnut-chart-single
        :title="infoDoughnut"
        :labels="labelsDoughnut"
        :dataset="doughnutDataset" />
      <category-list
        class="categoryList-top" />
    </div>
  </div>
</template>

<script>
import ChartFilter from './ChartFilter.vue';
import BarChartSingle from '../charts/BarChartSingle.vue';
import DoughnutChartSingle from '../charts/DoughnutChartSingle.vue';
import CategoryList from './CategoryList.vue';
import UpcomingMovements from './UpcomingMovements.vue';

export default {
  name: 'SingleOverview',
  components: {
    BarChartSingle,
    DoughnutChartSingle,
    ChartFilter,
    CategoryList,
    UpcomingMovements,
  },
  data() {
    return {
      barDataset: {},
      doughnutDataset: {},
      infoDoughnut: {},
      labelsDoughnut: [],
    };
  },
  computed: {
    singleChartView() {
      return this.$store.state.currentView.singleChart;
    },
    transactionsByGroup() {
      return Object.values(this.$store.state.groupedTransactions);
    },
    selectedAccount() {
      return this.$store.state.selectedAccount;
    },
  },
  mounted() {
    this.getBarData();
    this.getDoughnutData();
  },
  methods: {
    mapDataToChart(data) {
      return data.map((item) => ({
        x: new Date(item.date),
        y: item.amount,
      }));
    },
    getBarData() {
      this.barDataset = {
        type: 'line',
        data: this.mapDataToChart(this.selectedAccount.trx),
        tension: 0.4,
        fill: true,
        borderColor: '#2E4553',
        borderWidth: 3,
        backgroundColor: '',
      };
    },
    getDoughnutData() {
      this.infoDoughnut = {
        total: this.selectedAccount.totalBudget,
        name: this.$t('charts.totalExpenses'),
      };
      this.labelsDoughnut = this.transactionsByGroup.map(({ category }) => category);
      this.doughnutDataset = {
        type: 'doughnut',
        backgroundColor: this.transactionsByGroup.map((item) => item.color),
        data: this.transactionsByGroup.map((item) => item.total),
        hoverRadius: 4,
      };
    },
  },
};
</script>

<style lang="scss" scoped>

.categoryList-top {
  position: relative;
  top: 50px;
}
</style>
