<template>
  <div>
    <doughnut-chart
      ref="doughnutChartRef"
      :height="250"
      v-bind="doughnutChartProps" />
  </div>
</template>

<script>
import 'chartjs-adapter-date-fns';
import { defineComponent } from '@vue/composition-api';
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { currency } from '@fc-filters';

export default defineComponent({
  name: 'DoughnutChartSingle',
  components: {
    DoughnutChart,
  },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { dataset, title } = props;
    const options = {
      rotation: 270,
      circumference: 180,
      borderWidth: 0,
      layout: {
        padding: {
          left: 30,
          right: 30,
          top: 20,
        },
      },
      cutout: '65%',
      plugins: {
        title: {
          display: true,
          text: [title.name, currency(title.total)],
          font: {
            size: 20,
            weight: 'normal',
          },
          position: 'bottom',
          padding: -60,
        },
        legend: {
          display: false,
        },
      },
    };
    const chartData = {
      labels: props.labels,
      datasets: [dataset],
    };
    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData,
      options,
    });
    return {
      doughnutChartProps, doughnutChartRef,
    };
  },
});
</script>
