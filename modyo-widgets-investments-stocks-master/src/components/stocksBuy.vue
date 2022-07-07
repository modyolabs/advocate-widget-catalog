<template>
  <div
    id="input"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    data-backdrop="static">
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content">
        <div class="modal-header align-items-center px-4 py-3">
          <h4 class="modal-title text-primary">
            {{ $t('stocks-buy.title') }}
          </h4>
          <div>
            <button
              class="stocks-buy__step btn mr-1 rounded-circle p-2 text-center"
              :class="step == 1 ? 'bg-light font-weight-bold text-primary' : false"
              @click="step = 1">
              1
            </button>
            <button
              class="stocks-buy__step btn mx-1 rounded-circle p-2 text-center"
              :class="step == 2 ? 'bg-light font-weight-bold text-primary' : false"
              :disabled="!selectedAccount"
              @click="step = 2">
              2
            </button>
            <button
              class="stocks-buy__step btn mx-1 rounded-circle p-2 text-center"
              :class="step == 3 ? 'bg-light font-weight-bold text-primary' : false"
              :disabled="isButtonDisabled"
              @click="step = 3">
              3
            </button>
            <button
              class="stocks-buy__step btn ml-1 rounded-circle p-2 text-center"
              :class="step == 4 ? 'bg-light font-weight-bold text-primary' : false"
              :disabled="isButtonDisabled || (!confirmed && step!=3)"
              @click="step = 4; confirmed=true">
              4
            </button>
          </div>
        </div>
        <div v-if="step === 1">
          <div class="modal-body p-4">
            <h4 class="mb-0 text-primary">
              {{ stock.name }}
            </h4>
            <div class="form-group mt-4 mb-0">
              <label for="">{{ $t('commons.select-account') }}</label>
              <multiselect
                v-model="selectedAccount"
                :disabled="confirmed"
                :options="accounts"
                :show-no-results="false"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false">
                >
                <template
                  slot="singleLabel"
                  slot-scope="{ option }">
                  {{ $t(option.name) }}
                </template>
                <template
                  slot="option"
                  slot-scope="{option}">
                  {{ $t(option.name) }}
                </template>
              </multiselect>
              <small
                v-if="selectedAccount"
                class="mt-2 d-block">
                <span class="text-muted mr-2">
                  {{ $t('commons.cash-balance') }}:
                </span>
                {{ balance | currency(currencyFormat) }}
              </small>
            </div>
          </div>
          <div class="modal-footer row no-gutters px-4">
            <div class="col-6 m-0 pr-2">
              <button
                v-if="!confirmed"
                type="button"
                class="btn btn-link btn-block"
                data-dismiss="modal">
                {{ $t('commons.cancel-btn') }}
              </button>
            </div>
            <div class="col-6 m-0 pl-2">
              <button
                type="button"
                class="btn btn-primary btn-block"
                @click="step = 2">
                {{ $t('commons.next-btn') }}
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="step === 2">
          <div class="modal-body p-4">
            <h4 class="mb-0 text-primary">
              {{ stock.name }}
            </h4>
            <div class="form-group mt-4">
              <label for="">{{ $t('stocks-buy.buy-btn') }}</label>
              <multiselect
                v-model="buyBy"
                :disabled="confirmed"
                :options="buyOptions"
                :show-no-results="false"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false">
                >
                <template
                  slot="singleLabel"
                  slot-scope="{ option }">
                  {{ $t(option.i18nKey) }}
                </template>
                <template
                  slot="option"
                  slot-scope="{option}">
                  {{ $t(option.i18nKey) }}
                </template>
              </multiselect>
            </div>
            <div v-if="buyBy.value === 'byStocks'">
              <div class="form-group mt-4">
                <label for="">{{ $t('commons.quantity') }}</label>
                <input
                  v-model.number="quantity"
                  :disabled="confirmed"
                  type="number"
                  class="form-control text-right"
                  min="1"
                  maxlength="20">
              </div>
              <div class="form-group mt-4">
                <label for="">{{ $t('stocks-buy.max-price-per-stock') }}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <money
                    v-model.number="amountPerShare"
                    v-bind="{decimal: ',', thousands: '.', precision: 0, masked: false}"
                    :disabled="confirmed"
                    :maxlength="amountPerShareMaxLength"
                    class="form-control form-control-lg text-right"
                    name="monto" />
                </div>
              </div>
            </div>
            <div v-if="buyBy.value === 'byAmount'">
              <div class="form-group mt-4">
                <label for="">{{ $t('commons.amount') }}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <money
                    v-model.number="amount"
                    :disabled="confirmed"
                    :maxlength="amountMaxLength"
                    v-bind="{decimal: ',', thousands: '.', precision: 0, masked: false}"
                    name="monto"
                    class="form-control form-control-lg text-right" />
                </div>
              </div>
            </div>

            <div class="form-group mt-4">
              <label for="">{{ $t('commons.validity') }}</label>
              <div class="custom-control custom-radio">
                <input
                  id="today-buy"
                  v-model="validity"
                  :disabled="confirmed"
                  type="radio"
                  value="today"
                  class="custom-control-input">
                <label
                  class="custom-control-label"
                  for="today-buy">
                  {{ $t('commons.only-today') }}
                </label>
              </div>
            </div>

            <div class="form-group mb-0">
              <label for="">{{ $t('commons.validity') }}</label>
              <div class="custom-control custom-radio">
                <input
                  id="through-buy"
                  v-model="validity"
                  :disabled="confirmed"
                  type="radio"
                  value="through"
                  class="custom-control-input">
                <label
                  class="custom-control-label"
                  for="through-buy">
                  {{ $t('commons.until') }}:
                </label>
              </div>
              <vue-date-picker
                v-if="validity !== 'today'"
                v-model="validityDate"
                :disabled="confirmed"
                class="mt-3"
                :min-date="minDate"
                :fullscreen-mobile="true"
                :locale="{lang: 'es'}"
                :z-index="2000">
                <template #activator="{ date }">
                  <button
                    ref="activator"
                    class="form-control btn d-flex btn-white border d-flex align-items-center text-left"
                    type="button">
                    <font-awesome-icon
                      icon="calendar"
                      class="mr-2" />
                    <span class="text-capitalize">{{ date }}</span>
                  </button>
                </template>
              </vue-date-picker>
            </div>
          </div>
          <div class="modal-footer row no-gutters px-4">
            <div class="col-4 col-lg-6 m-0 pr-2">
              <button
                v-if="!confirmed"
                type="button"
                class="btn btn-link btn-block text-left pl-0 stocks-buy__btn-sm"
                data-dismiss="modal">
                {{ $t('commons.cancel-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                type="button"
                class="btn btn-secondary btn-block stocks-buy__btn-sm"
                @click="step = 1">
                {{ $t('commons.back-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                :disabled="isButtonDisabled"
                type="button"
                class="btn btn-primary btn-block stocks-buy__btn-sm"
                @click="step = 3">
                {{ $t('commons.next-btn') }}
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="step === 3">
          <div class="modal-body p-4">
            <h4
              class="mb-0">
              {{ stock.name }}
              <small class="d-block text-muted mt-1">{{ selectedAccount.name }}</small>
            </h4>
            <table class="table table-bordered mt-4 mb-0">
              <tr>
                <td>{{ $t('commons.account') }}:</td>
                <td>{{ selectedAccount.name }}</td>
              </tr>
              <tr>
                <td>{{ $t('commons.name') }}:</td>
                <td>{{ stock.name }}</td>
              </tr>
              <tr>
                <td>{{ $t('commons.type') }}:</td>
                <td>{{ $t('commons.purchase') }}</td>
              </tr>
              <tr v-if="buyBy.value === 'byStocks'">
                <td>{{ $t('commons.quantity') }}:</td>
                <td>{{ quantity | formatNum }}</td>
              </tr>
              <tr v-if="buyBy.value === 'byStocks'">
                <td>{{ $t('commons.price-per-stock') }}:</td>
                <td>{{ amountPerShare | currency($t('currency.format')) }}</td>
              </tr>
              <tr v-if="buyBy.value === 'byAmount'">
                <td>{{ $t('commons.total-amount') }}:</td>
                <td>{{ amount | currency }}</td>
              </tr>
              <tr>
                <td>{{ $t('commons.validity') }}:</td>
                <td>{{ validityDate | date }}</td>
              </tr>
            </table>
          </div>
          <div class="modal-footer row no-gutters px-4">
            <div class="col-4 col-lg-6 m-0 pr-2">
              <button
                v-if="!confirmed"
                type="button"
                class="btn btn-link btn-block text-left pl-0 stocks-buy__btn-sm"
                data-dismiss="modal">
                {{ $t('commons.cancel-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                type="button"
                class="btn btn-secondary btn-block stocks-buy__btn-sm"
                @click="step = 2">
                {{ $t('commons.back-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                v-if="!confirmed"
                :disabled="isButtonDisabled"
                type="button"
                class="btn btn-primary btn-block stocks-buy__btn-sm"
                @click="step = 4; confirmed=true">
                {{ $t('commons.confirm') }}
              </button>
              <button
                v-else
                :disabled="isButtonDisabled"
                type="button"
                class="btn btn-primary btn-block stocks-buy__btn-sm"
                @click="step = 4">
                {{ $t('commons.next-btn') }}
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="step === 4">
          <div class="modal-body p-4">
            <h4 class="mb-0 text-primary">
              {{ stock.name }}
            </h4>
            <div
              class="p-4 mt-4 text-center d-flex align-items-center justify-content-between
              bg-light flex-column">
              <p class="h5">
                {{ $t('stocks-buy.success-msg') }}.
              </p>
              <span
                class="stocks-buy__check-icon mt-2 rounded-circle d-inline-block d-flex
                align-items-center justify-content-between p-2 text-white">
                <font-awesome-icon
                  icon="check" />
              </span>
            </div>
          </div>
          <div class="modal-footer row no-gutters justify-content-end px-4">
            <div class="col-4 m-0">
              <button
                type="button"
                class="btn btn-primary btn-block"
                data-dismiss="modal">
                {{ $t('commons.finish-btn') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDays } from 'date-fns';
import $ from 'jquery';
import { Money } from 'v-money-no-negative';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import Multiselect from 'vue-multiselect';
import { currency, date, formatNum } from '@modyo/financial-commons';

const buyOptions = [{
  i18nKey: 'stocks-buy.options.per-stocks',
  value: 'byStocks',
}, {
  i18nKey: 'stocks-buy.options.per-amount',
  value: 'byAmount',
}];

export default {
  name: 'StocksBuy',
  components: {
    Money,
    VueDatePicker,
    Multiselect,
  },
  filters: {
    currency,
    date,
    formatNum,
  },
  data() {
    return {
      step: 1,
      amount: 0,
      selectedAccount: null,
      buyBy: buyOptions[0],
      quantity: 1,
      amountPerShare: 1,
      validity: 'today',
      validityDate: addDays(new Date(), 1),
      minDate: new Date(),
      buyOptions,
      confirmed: false,
      currencyFormat: this.$t('currency.format'),
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.investmentAccounts;
    },
    balance() {
      if (this.selectedAccount) {
        return this.selectedAccount.currencies[0].amount.originValue;
      }
      return 0;
    },
    amountMaxLength() {
      if (this.selectedAccount) {
        const availableBalanceLength = Math.round(
          parseFloat(this.selectedAccount.currencies[0].amount.originValue),
        ).toString().length;
        const dots = Math.round(availableBalanceLength / 3); // each thousandths is a dot
        return availableBalanceLength + dots;
      }
      return 9;
    },
    amountPerShareMaxLength() {
      if (this.selectedAccount) {
        const availableBalanceLength = Math.round(
          parseFloat(this.selectedAccount.currencies[0].amount.originValue) / this.quantity,
        ).toString().length;
        const dots = Math.ceil(availableBalanceLength / 3) - 1; // each thousandths is a dot
        return availableBalanceLength + dots;
      }
      return 9;
    },
    stock() {
      return this.$store.state.selectedStock || {};
    },
    isButtonDisabled() {
      if (this.buyBy.value === 'byStocks') {
        if (this.amountPerShare && this.quantity && this.validityDate) {
          return false;
        }
        return true;
      }
      if (this.amount && this.validityDate) {
        return false;
      }
      return true;
    },
  },
  watch: {
    amount(newValue) {
      // eslint-disable-next-line max-len
      if (this.selectedAccount && newValue > this.selectedAccount.currencies[0].amount.originValue) {
        this.amount = this.selectedAccount.currencies[0].amount.originValue;
      }
    },
    quantity: 'refreshAmountPerShare',
    amountPerShare: 'refreshAmountPerShare',
  },
  mounted() {
    const vm = this;
    $(this.$el).on('hidden.bs.modal', () => {
      vm.step = 1;
      vm.amount = 0;
      vm.quantity = 0;
      vm.amountPerShare = 0;
      [vm.buyBy] = buyOptions;
      vm.validity = 'today';
      vm.validityDate = addDays(new Date(), 1);
      [vm.selectedAccount] = vm.accounts;
      vm.confirmed = false;
    });
  },
  created() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      const vm = this;
      this.$store.dispatch('GET_ACCOUNTS')
        .then(() => {
          [vm.selectedAccount] = vm.accounts;
          vm.isLoading = false;
        });
    },
    refreshAmountPerShare() {
      if (this.selectedAccount) {
        if (!this.quantity) {
          this.quantity = 1;
        }
        if (this.quantity > this.selectedAccount.currencies[0].amount.originValue) {
          this.quantity = this.selectedAccount.currencies[0].amount.originValue;
        }
        // eslint-disable-next-line max-len
        if (this.amountPerShare * this.quantity >= this.selectedAccount.currencies[0].amount.originValue) {
          this.amountPerShare = this.selectedAccount.currencies[0].amount.originValue / this.quantity;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.stocks-buy__step {
  width: 2rem;
  height: 2rem;

  line-height: 1rem;
}

.stocks-buy__check-icon {
  background-color: lighten($green, 25);
}

@media (max-width: 320px) {
  .stocks-buy__btn-sm {
    padding-right: .25rem;
    padding-left: .25rem;

    font-size: .95rem;
  }
}
</style>
