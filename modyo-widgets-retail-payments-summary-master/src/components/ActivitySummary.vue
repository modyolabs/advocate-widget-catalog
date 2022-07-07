<template>
  <div class="row justify-content-center bg-tertiary-20 mb-4 px-2 px-sm-3 pb-4">
    <div class="col-10 d-flex justify-content-between align-items-center w-100 py-4">
      <h3 class="text-primary m-0">
        {{ $t('activity.title') }}
      </h3>
      <div>
        <multiselect
          v-model="selectedFilter"
          :options="filterBy"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          label="name"
          track-by="name"
          :searchable="false"
          @select="setDataRange" />
      </div>
    </div>
    <div class="col-12 col-md-6 px-4 mb-4 mb-md-0">
      <bar-chart
        class="d-flex justify-content-center"
        :height="250"
        :chart-data="chartData"
        :options="chartOptions" />
    </div>
    <div class="col-12 col-md-6 px-4 table-responsive">
      <table class="table table-borderless align-middle fs-5">
        <thead>
          <tr>
            <th scope="col" />
            <th
              scope="col"
              class="p-0">
              <span class="fs-6 fw-500 text-dark d-block text-end">{{ $t('activity.last-pay') }}</span>
            </th>
            <th
              scope="col"
              class="p-0">
              <span class="fs-6 fw-500 text-dark d-block text-end">{{ $t('activity.average') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(company, index) in companies"
            :key="index">
            <td>
              <span class="fs-6 fw-500 text-dark me-1 text-nowrap">{{ company.name }}</span>
              <span class="text-secondary-60 d-none d-sm-none d-md-none d-xxl-inline-block fs-8">
                - {{ company.department }}</span>
            </td>
            <td class="px-0">
              <span class="fs-6 fw-light text-dark d-block text-end">
                {{ company.activity.lastPayment | currency(currencyFormatMount) }}
              </span>
            </td>
            <td class="px-0">
              <span
                class="fs-6 fw-light text-dark d-block text-end">
                {{ company.activity.average | currency(currencyFormatMount) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-detail
      :month="month"
      :month-detail="activeMonthModal" />
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import Multiselect from 'vue-multiselect';
import bootstrap from 'bootstrap/dist/js/bootstrap';
import currency from '../filters/currency';
import BarChart from './BarChart';
import ModalDetail from './ModalDetail.vue';

export default {
  name: 'ActivitySummary',
  components: {
    Multiselect,
    BarChart,
    ModalDetail,
  },
  props: {
  },
  data() {
    return {
      activeMonthModal: [],
      month: '',
    };
  },
  computed: {
    companies() {
      return this.$store.state.companies;
    },
    filterBy() {
      return this.$store.state.filterBy;
    },
    selectedFilter: {
      get() {
        return this.$store.state.selectedFilter;
      },
      set(newRange) {
        this.$store.commit('SET_RANGE', newRange);
      },
    },
    currencyFormatMount() {
      return this.$t('currency.format');
    },
    activity() {
      return this.$store.state.activity;
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
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              callback(value) {
                return value.slice(0, 3).toUpperCase();
              },
            },
          }],
          yAxes: [{
            ticks: {
              callback(value) {
                const price = currency(value, this.currencyFormatMount);
                return price.slice(0, price.length - 3);
              },
            },
          }],
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const name = data.labels[tooltipItem.index];
              const datael = currency(data.datasets[0].data[tooltipItem.index], this.currencyFormatMount);
              return `${name} : ${datael}`;
            },
          },
        },
        onClick: this.handleBarClick,
      };
    },
  },
  methods: {
    handleBarClick(event, array) {
      if (array.length !== 0) {
        const position = array[0]._index;
        this.activeMonthModal = this.activity[position].payments;
        this.month = this.activity[position].month;
        const modal = document.getElementById('modalDetail');
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
        modalInstance.show();
      }
    },
    setDataRange(range) {
      this.$store.dispatch('GET_ACTIVITY', range.value);
    },
    getChartData() {
      let data = [];
      const labels = this.activity.map((item) => item.month);
      const backgroundColor = '#34495E';
      data = this.activity.map((item) => item.total);
      return {
        labels, data, backgroundColor,
      };
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
