<template>
  <div id="dashboard-app">
    <dashboard-tabs />
    <dashboard-filters />

    <m-table
      :headers="tableHeaders"
      :items="quotes"
      :is-loading="isLoading">
      <template #loading>
        <div class="container p-0 my-3">
          <m-loading-state
            v-bind="$attrs"
            :width="1140"
            :height="525">
            <rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width="1140"
              height="85" />

            <rect
              x="0"
              y="105"
              rx="4"
              ry="4"
              width="1140"
              height="85" />

            <rect
              x="0"
              y="210"
              rx="4"
              ry="4"
              width="1140"
              height="85" />

            <rect
              x="0"
              y="315"
              rx="4"
              ry="4"
              width="1140"
              height="85" />

            <rect
              x="0"
              y="420"
              rx="4"
              ry="4"
              width="1140"
              height="85" />
          </m-loading-state>
        </div>
      </template>

      <template #tableHeader="{headers}">
        <div
          v-for="(header, index) in headers"
          :key="index"
          class="col"
          :class="[{'col-1': header.hidden}, {'col-2': header.title === 'brokerName'}]">
          <h6
            class="small font-weight-bold py-4 mb-0"
            :class="{'sr-only': header.hidden}">
            {{ $t(`quote.headers.${header.title}`) }}
          </h6>
        </div>
      </template>

      <template #itemHeaderMobile="{item}">
        <span
          class="dashboard-mobile-header d-block btn-text-group p-4"
          :class="[item.status]">
          <span class="d-flex align-items-center justify-content-between">
            <span class="d-block font-weight-bold pb-1">
              {{ item.brokerName }}
              <span
                class="d-block"
                :class="item.status">
                {{ $t(`quote.status.${item.status}`) }}
              </span>
            </span>

            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="mobile-header__icon" />
          </span>

          <hr class="mobile-header__ruler mb-0 py-0">
        </span>
      </template>

      <template #itemBody="{item}">
        <div
          class="dashboard-list__item d-flex flex-column flex-lg-row
          justify-content-between align-items-center pt-0 pb-4 pt-lg-4 px-2 px-lg-0 mb-lg-3"
          :class="item.status">
          <div class="col-12 col-lg-2 d-none d-lg-block">
            <p class="mb-0">
              {{ item.brokerName }}
            </p>
          </div>

          <div class="col-12 col-lg d-flex justify-content-between align-items-center d-lg-block mb-2 mb-lg-0">
            <p class="mb-0 d-lg-none text-secondary">
              {{ $t('quote.headers.brokerId') }}
            </p>
            <p class="mb-0">
              {{ item.brokerId }}
            </p>
          </div>

          <div class="col-12 col-lg d-flex justify-content-between align-items-center d-lg-block mb-2 mb-lg-0">
            <p class="mb-0 d-lg-none text-secondary">
              {{ $t('quote.headers.totalCost') }}
            </p>
            <p class="mb-0">
              {{ item.totalCost | currency(currencyFormat) }}
            </p>
          </div>

          <div class="col-12 col-lg d-none d-lg-block">
            <p
              class="mb-0"
              :class="[item.status]">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                size="xs"
                class="mr-1" />
              {{ $t(`quote.status.${item.status}`) }}
            </p>
          </div>

          <div class="col-12 col-lg d-flex justify-content-between align-items-center d-lg-block mb-2 mb-lg-0">
            <p class="mb-0 d-lg-none text-secondary">
              {{ $t('quote.headers.quoteId') }}
            </p>
            <p class="mb-0">
              {{ item.quoteId }}
            </p>
          </div>

          <div class="col-12 col-lg d-flex justify-content-between align-items-center d-lg-block mb-2 mb-lg-0">
            <p class="mb-0 d-lg-none text-secondary">
              {{ $t('quote.headers.modificationDate') }}
            </p>
            <p class="mb-0">
              {{ item.modificationDate | date }}
            </p>
          </div>

          <div class="dashboard-mobile__actions col d-lg-none text-center mt-4">
            <a
              href="#"
              class="btn text-left btn-outline-tertiary py-2 mx-2">
              <font-awesome-icon
                :icon="['fas', 'upload']"
                size="lg"
                class="mr-3" />
              {{ $t('quote.actions.issue-policy') }}
            </a>
            <a
              href="#"
              class="btn text-left btn-outline-tertiary py-2 mx-2">
              <font-awesome-icon
                :icon="['fas', 'pencil-alt']"
                size="lg"
                class="mr-3" />
              {{ $t('quote.actions.edit-quote') }}
            </a>
            <a
              href="#"
              class="btn text-left btn-outline-tertiary py-2 mx-2">
              <font-awesome-icon
                :icon="['fas', 'eye']"
                size="lg"
                class="mr-3" />
              {{ $t('quote.actions.see-quote') }}
            </a>
          </div>

          <div class="dashboard-desktop__actions d-none d-lg-block col-lg-1 text-center">
            <v-popover
              offset="4">
              <button
                class="btn"
                title="more actions">
                <font-awesome-icon
                  :icon="['fas', 'ellipsis-v']"
                  size="lg" />
              </button>

              <template slot="popover">
                <a
                  href="#"
                  class="btn btn-link btn-block text-left my-2">
                  <font-awesome-icon
                    :icon="['fas', 'upload']"
                    size="lg"
                    class="mr-3" />
                  {{ $t('quote.actions.issue-policy') }}
                </a>
                <a
                  href="#"
                  class="btn btn-link btn-block text-left my-2">
                  <font-awesome-icon
                    :icon="['fas', 'pencil-alt']"
                    size="lg"
                    class="mr-3" />
                  {{ $t('quote.actions.edit-quote') }}
                </a>
                <a
                  href="#"
                  class="btn btn-link btn-block text-left my-2">
                  <font-awesome-icon
                    :icon="['fas', 'eye']"
                    size="lg"
                    class="mr-3" />
                  {{ $t('quote.actions.see-quote') }}
                </a>
              </template>
            </v-popover>
          </div>
        </div>
      </template>
    </m-table>

    <m-pagination
      :current-page="currentPage"
      :page-count="pageCount"
      :visible-pages-count="visiblePagesCount"
      class="list__pagination"
      @nextPage="pageChangeHandle('next')"
      @previousPage="pageChangeHandle('previous')"
      @loadPage="pageChangeHandle" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';
import {
  currency, date, MPagination, MTable, MLoadingState,
} from '@modyo/financial-commons';

import DashboardTabs from './components/DashboardTabs.vue';
import DashboardFilters from './components/DashboardFilters.vue';

VTooltip.options.popover.defaultClass = 'vue-popover-theme';
VTooltip.options.popover.defaultBaseClass = 'v-tooltip v-popover';
VTooltip.options.popover.defaultWrapperClass = 'v-wrapper';
VTooltip.options.popover.defaultInnerClass = 'v-tooltip-inner v-popover-inner';
VTooltip.options.popover.defaultArrowClass = 'v-tooltip-arrow v-popover-arrow';

export default {

  name: 'Dashboard',
  filters: {
    currency,
    date,
  },
  directives: {
    tooltip: VTooltip,
    'close-popover': VClosePopover,
  },
  components: {
    DashboardTabs,
    DashboardFilters,
    MTable,
    MPagination,
    MLoadingState,
    VPopover,
  },
  data() {
    return {
      currencyFormat: this.$t('currency.format'),
    };
  },
  computed: {
    ...mapState([
      'quotes',
      'tableHeaders',
      'currentPage',
      'pageCount',
      'visiblePagesCount',
      'isLoading',
    ]),
  },

  async created() {
    await this.$store.dispatch('getTableHeaders');
    await this.$store.dispatch('getQuotes');
  },

  methods: {
    ...mapMutations(['setCurrentPage']),
    async pageChangeHandle(value) {
      this.setCurrentPage(value);
      await this.$store.dispatch('getQuotes');
    },
  },

};
</script>

<style lang="scss" scoped>
@import "scss/variables";
</style>
