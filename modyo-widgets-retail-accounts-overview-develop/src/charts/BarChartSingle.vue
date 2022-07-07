<template>
  <div class="mb-4">
    <bar-chart
      ref="barChartSingle"
      :height="300"
      v-bind="barChartProps" />
  </div>
</template>

<script>
import 'chartjs-adapter-date-fns';
import { BarChart, useBarChart } from 'vue-chart-3';
import {
  defineComponent, onMounted,
} from '@vue/composition-api';

export default defineComponent({
  name: 'BarChartSingle',
  components: {
    BarChart,
  },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dataset } = props;
    const options = {
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
            drawBorder: false,
            display: false,
          },
          ticks: {
            color: '#333333B3',
            showLabelBackdrop: true,
            font: {
              size: 12,
              weight: 'bold',
            },
            backdropColor: 'white',
            backdropPadding: 4,
            callback: (value) => ((value >= 1000) ? `$${value / 1000}k` : `$${value}`),
            stepSize: 200,
          },
          stacked: true,
        },
      },
    };
    const chartData = {
      datasets: [dataset],
    };
    const { barChartProps, barChartRef: barChartSingle } = useBarChart({
      chartData,
      options,
    });

    const setFillColor = () => {
      const gradient = barChartSingle.value.chartInstance.ctx.createLinearGradient(0, 0, 0, 350);
      gradient.addColorStop(0, 'rgba(46,69,83,0.95)');
      gradient.addColorStop(1, 'rgba(46,69,83,0.1)');
      barChartSingle.value.chartInstance.data.datasets[0].backgroundColor = gradient;
    };

    onMounted(() => {
      setFillColor();
    });
    return {
      barChartProps, barChartSingle,
    };
  },
});
</script>
