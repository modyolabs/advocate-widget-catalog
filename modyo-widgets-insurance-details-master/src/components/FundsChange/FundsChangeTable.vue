<template>
  <div
    v-if="selectedFund"
    class="funds-change-table">
    <h6
      class="funds-change-table__title font-weight-normal mt-4 d-none d-md-block">
      {{ selectedFund==='CUSTOM-PORTFOLIO' ?
        $t('funds.change.selector.create-custom') :
        $t('funds.name',{fund:$t(`funds.types.${selectedFund}`)}) }}
    </h6>
    <div class="distribution-table w-100 mt-4 mt-md-0">
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
              v-for="(row,rowIndex) in bodyItems"
              :key="rowIndex">
              <td
                v-for="(cell,cellIndex) in row"
                :key="cellIndex">
                <span v-if="selectedFund!=='CUSTOM-PORTFOLIO' || cellIndex!==1">
                  {{ cell }}
                </span>
                <div
                  v-else
                  class="funds-change-table__dist input-group bg-white rounded-lg border mx-auto">
                  <input
                    v-model.number="bodyItems[rowIndex][cellIndex]"
                    type="text"
                    class="form-control border-0 text-right"
                    placeholder="0"
                    maxlength="2"
                    :aria-label="$t('funds.table.percentage')"
                    :aria-describedby="`percentage-${rowIndex}-${cellIndex}`"
                    @keydown="isNumber($event)">
                  <div class="input-group-append">
                    <span
                      :id="`percentage-${rowIndex}-${cellIndex}`"
                      class="input-group-text bg-transparent border-0">%</span>
                  </div>
                </div>
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
            <tr
              v-if="selectedFund==='CUSTOM-PORTFOLIO'"
              class="funds-change-table__total-dist">
              <td class="py-4">
                <strong>{{ $t('funds.change.table.total-dist') }}</strong>
              </td>
              <td
                class="py-4"
                colspan="5">
                <strong
                  class="d-block mb-1"
                  :class="{
                    'text-info': totalCustomDist < 100,
                    'text-success': totalCustomDist === 100,
                    'text-danger': totalCustomDist > 100
                  }">{{ totalCustomDist }}%</strong>
                <div class="progress">
                  <div
                    class="funds-change-table__custom-progress-bar progress-bar"
                    :class="{
                      'bg-info': totalCustomDist < 100,
                      'bg-success': totalCustomDist === 100,
                      'bg-danger': totalCustomDist > 100
                    }"
                    role="progressbar"
                    :style="{width: `${totalCustomDist}%`}"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100" />
                </div>
                <i18n
                  v-if="totalCustomDist === 100"
                  class="d-block mt-4 text-right text-success"
                  path="funds.change.table.total-dist-message"
                  tag="span">
                  <strong>{{ $t('funds.change.table.total-dist-complete') }}</strong>
                </i18n>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="selectedFund==='CUSTOM-PORTFOLIO'"
        class="funds-change-table__total-dist--mobile d-flex p-3 d-lg-none bg-white align-items-center">
        <p class="funds-change-table__total-dist-label--mobile m-0">
          {{ $t('funds.change.table.total-dist') }}
        </p>
        <div class="flex-fill ml-3">
          <strong
            class="d-block mb-1"
            :class="{
              'text-info': totalCustomDist < 100,
              'text-success': totalCustomDist === 100,
              'text-danger': totalCustomDist > 100
            }">{{ totalCustomDist }}%</strong>
          <div class="progress">
            <div
              class="funds-change-table__custom-progress-bar progress-bar"
              :class="{
                'bg-info': totalCustomDist < 100,
                'bg-success': totalCustomDist === 100,
                'bg-danger': totalCustomDist > 100
              }"
              role="progressbar"
              :style="{width: `${totalCustomDist}%`}"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100" />
          </div>
          <i18n
            v-if="totalCustomDist === 100"
            class="d-block mt-2 mt-lg-4 text-right text-success"
            path="funds.change.table.total-dist-message"
            tag="span">
            <strong>{{ $t('funds.change.table.total-dist-complete') }}</strong>
          </i18n>
        </div>
      </div>
    </div>
    <button
      :disabled="selectedFund==='CUSTOM-PORTFOLIO' && totalCustomDist !== 100"
      class="funds-change-table__request-change-btn btn-block-mobile btn
      mt-4 px-4 py-3 rounded-lg font-weight-light"
      href=""
      @click="SetConfirmation">
      {{ $t('funds.change.table.request') }}
    </button>
  </div>
</template>
<script>
import isNumber from '../../commons/isNumber';

export default {
  name: 'FundsChangeTable',
  props: {
    selectedFund: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      date: '21/05/2020',
    };
  },
  computed: {
    bodyItems() {
      if (this.selectedFund === 'CUSTOM-PORTFOLIO') return this.fundsChange.customPortfolio;
      return this.fundsChange.funds[this.selectedFund];
    },
    totalCustomDist() {
      return this.fundsChange.customPortfolio.reduce((a, b) => parseFloat(a) + parseFloat(b[1] || 0), 0);
    },
    fundsChange: {
      get() {
        return this.$store.state.fundsChange;
      },
      set(value) {
        this.$store.commit('SET_FUNDS_CHANGE', value);
      },
    },
  },
  methods: {
    isNumber,
    SetConfirmation() {
      this.fundsChange.fundsDetails = this.bodyItems;
      this.fundsChange.screen = 'FundsChangeConfirmation';
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.funds-change-table__request-change-btn {
  font-size: 1rem;
  color: #fff;

  background-color: $primary;

  &:disabled {
    pointer-events: none;

    background-color: $secondary-20;
    opacity: 1;
  }

  &:hover,
  &:focus {
    color: #fff;

    background-color: $primary-dark;
  }
}

.funds-change-table__title {
  font-size: 1rem;
}

.funds-change-table__dist {
  width: 5.5rem;
}

@media (max-width: 991.98px) {
  .funds-change-table__total-dist {
    display: none;
  }

  .funds-change-table__total-dist-label--mobile {
    max-width: 80px;
  }
}
</style>
