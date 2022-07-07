<template>
  <div>
    <bar-chart
      ref="barChartRef"
      :height="300"
      v-bind="barChartProps" />
  </div>
</template>

<script>
import 'chartjs-adapter-date-fns';
import { BarChart, useBarChart } from 'vue-chart-3';
import {
  computed,
  defineComponent, onMounted, watch,
} from '@vue/composition-api';

export default defineComponent({
  name: 'BarChartGeneral',
  components: {
    BarChart,
  },
  props: {
    datasets: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props, { root }) {
    const { options } = props;
    const chartData = {
      datasets: props.datasets[0],
    };
    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,
    });
    // console.log(barChartRef.value.chartInstance);

    const overview = computed(() => root.$store.state.chartVisualization.overview);
    const accounts = computed(() => root.$store.state.chartVisualization.accounts);
    const toggleAccounts = (value) => {
      for (let i = 1; i < props.datasets[0].length; i += 1) {
        barChartRef.value.chartInstance.setDatasetVisibility(i, value);
      }
      barChartRef.value.chartInstance.update();
    };

    const setFillColor = () => {
      const gradient = barChartRef.value.chartInstance.ctx.createLinearGradient(0, 0, 0, 350);
      gradient.addColorStop(0, 'rgba(46,69,83,0.95)');
      gradient.addColorStop(1, 'rgba(46,69,83,0.1)');
      barChartRef.value.chartInstance.data.datasets[0].backgroundColor = gradient;
    };

    watch(() => overview.value,
      () => {
        barChartRef.value.chartInstance.setDatasetVisibility(0, overview.value);
        barChartRef.value.chartInstance.update();
      });
    watch(() => accounts.value,
      () => {
        barChartRef.value.chartInstance.data.datasets[0].fill = overview.value && !accounts.value;
        barChartRef.value.chartInstance.data.datasets[0].borderColor = overview.value && accounts.value ? '#CED2D4' : '#2E4553';
        toggleAccounts(accounts.value);
      });

    root.$store.commit('SET_CHART_REF', barChartRef);
    onMounted(() => {
      setFillColor();
      toggleAccounts(accounts.value);
    });
    return {
      barChartProps, barChartRef,
    };
  },
});

</script>
