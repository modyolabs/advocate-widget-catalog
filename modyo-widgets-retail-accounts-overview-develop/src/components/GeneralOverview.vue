<template>
  <div>
    <chart-filter />
    <div class="d-flex align-items-center">
      <div class="flex-fill">
        <bar-chart
          v-if="datasets.length"
          class="p-0 px-md-4 pt-md-4 pb-md-5 mb-0 mb-md-4"
          :datasets="datasets"
          :options="options" />
      </div>
      <div class="mb-4 d-none d-md-block">
        <upcoming-movements />
      </div>
    </div>
  </div>
</template>

<script>
import ChartFilter from './ChartFilter.vue';
import BarChart from '../charts/BarChartGeneral.vue';
import UpcomingMovements from './UpcomingMovements.vue';

export default {
  name: 'GeneralOverview',
  components: {
    BarChart,
    ChartFilter,
    UpcomingMovements,
  },
  data() {
    return {
      options: {
        aspectRatio: 0,
        onResize(instance, size) {
          if (size.width <= 400) {
            this.config.options.scales.x.ticks.maxTicksLimit = 4;
            this.config.options.scales.y.ticks.maxTicksLimit = 4;
            this.config.options.scales.x.ticks.color = '#515A5E';
            this.config.options.scales.x.ticks.showLabelBackdrop = false;
          } else {
            this.config.options.scales.x.ticks.maxTicksLimit = 6;
            this.config.options.scales.y.ticks.maxTicksLimit = 6;
            this.config.options.scales.x.ticks.color = '#FFFFFF';
            this.config.options.scales.x.ticks.showLabelBackdrop = true;
          }
        },
        elements: {
          point: {
            radius: 1,
            hoverRadius: 5,
          },
        },
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          tooltip: {
            position: 'nearest',
            padding: 12,
            callbacks: {
              label(context) {
                let label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              drawBorder: false,
              display: false,
            },
            stacked: true,
            type: 'time',
            time: {
              unit: 'day',
              stepSize: 20,
            },
            ticks: {
              padding: 14,
              autoSkip: true,
              maxRotation: 0,
              font: {
                size: 12,
                weight: 'bold',
              },
              backdropColor: '#515A5E',
              backdropPadding: 4,
              callback: (value) => `${value.split(' ').reverse().join(' ')}.`,
            },
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: '#333333B3',
              showLabelBackdrop: true,
              font: {
                size: 12,
                weight: 'bold',
              },
              autoSkip: true,
              backdropColor: 'white',
              backdropPadding: 4,
              callback: (value) => ((value >= 1000) ? `$${value / 1000}k` : `$${value}`),
              stepSize: 3000,
            },
            stacked: true,
          },
        },
      },
      datasets: [],
    };
  },
  computed: {
    totalBudget() {
      return this.$store.state.totalBudget;
    },
    totalBudgetAccounts() {
      return this.$store.state.totalBudgetAccounts;
    },
    overviewState() {
      return this.$store.state.chartVisualization.overview;
    },
    accountsViewState() {
      return this.$store.state.chartVisualization.accounts;
    },
    activeGraphCmp() {
      return this.$store.state.currentView.singleChart;
    },
  },
  mounted() {
    this.datasets.push(this.getAllDatasets());
  },
  methods: {
    mapDataToChart(data) {
      return data.map((item) => ({
        x: new Date(item.date),
        y: item.total || item.budget,
      }));
    },
    getAllDatasets() {
      const lineDataset = {
        type: 'line',
        data: this.mapDataToChart(this.totalBudget.summary),
        tension: 0.4,
        fill: true,
        borderColor: '#2E4553',
        borderWidth: 3,
        order: 2,
      };
      const barDatasets = this.totalBudgetAccounts.map((dataset) => ({
        type: 'bar',
        data: this.mapDataToChart(dataset.summary),
        backgroundColor: dataset.color,
        borderRadius: 6,
      }));
      return [lineDataset, ...barDatasets];
    },
  },
};
</script>
