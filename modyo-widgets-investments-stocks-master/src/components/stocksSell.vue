<template>
  <div
    id="rescue"
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
            {{ $t('stocks-sell.title') }}
          </h4>
          <div>
            <button
              class="stocks-sell__step btn mr-1 rounded-circle p-2 text-center"
              :class="step == 1 ? 'bg-light font-weight-bold text-primary' : false"
              @click="step = 1">
              1
            </button>
            <button
              class="stocks-sell__step btn mx-1 rounded-circle p-2 text-center"
              :class="step == 2 ? 'bg-light font-weight-bold text-primary' : false"
              :disabled="!selectedFromAccount || !selectedToAccount"
              @click="step = 2">
              2
            </button>
            <button
              class="stocks-sell__step btn ml-1 rounded-circle p-2 text-center"
              :class="step == 3 ? 'bg-light font-weight-bold text-primary' : false"
              :disabled="isButtonDisabled"
              @click="step = 3">
              3
            </button>
            <button
              class="stocks-sell__step btn ml-1 rounded-circle p-2 text-center"
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
            <div class="form-group mt-4">
              <label for="">{{ $t('stocks-sell.select-account') }}</label>
              <multiselect
                v-model="selectedFromAccount"
                :disabled="confirmed"
                :options="stock.investments ? stock.investments : []"
                :show-no-results="false"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false">
                <template
                  slot="singleLabel"
                  slot-scope="{ option }">
                  {{ option.name }}
                </template>
                <template
                  slot="option"
                  slot-scope="{option}">
                  {{ option.name }}
                </template>
              </multiselect>
              <small
                v-if="selectedFromAccount"
                class="mt-2 d-block">
                <span class="text-muted mr-2">
                  {{ $t('stock-sell.stocks') }}:
                </span>
                {{ selectedFromAccount.quantityString }}
              </small>
            </div>
            <div class="form-group mt-4">
              <label for="">{{ $t('stock-sell.select-to-account') }}</label>
              <multiselect
                v-model="selectedToAccount"
                :disabled="confirmed"
                :options="accounts"
                :show-no-results="false"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false">
                <template
                  slot="singleLabel"
                  slot-scope="{ option }">
                  {{ option.name }}
                </template>
                <template
                  slot="option"
                  slot-scope="{option}">
                  {{ option.name }}
                </template>
              </multiselect>
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
              <label for="">{{ $t('stocks-sell.sell-btn') }}</label>
              <multiselect
                v-model="sellBy"
                :disabled="confirmed"
                :options="sellOptions"
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

            <div v-if="sellBy.value === 'byStocks'">
              <div class="form-group mt-4">
                <label for="">{{ $t('commons.quantity') }}</label>
                <input
                  v-model.number="quantity"
                  :disabled="confirmed"
                  type="number"
                  name="monto"
                  class="form-control form-control-lg text-right"
                  @keydown="(quantity.toString().length < maxlength) || $event.preventDefault()">
              </div>
              <div class="form-group mt-4">
                <label for="">{{ $t('stocks-sell.minimum-price-per-stock') }}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <money
                    v-model.number="amountPerShare"
                    :disabled="confirmed"
                    maxlength="15"
                    v-bind="{decimal: ',', thousands: '.', precision: 0, masked: false}"
                    name="monto"
                    class="form-control form-control-lg text-right" />
                </div>
              </div>
            </div>

            <div v-if="sellBy.value === 'byAmount'">
              <div class="form-group mt-4">
                <label for="">{{ $t('commons.amount') }}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <money
                    v-model.number="amount"
                    :disabled="confirmed"
                    v-bind="{decimal: ',', thousands: '.', precision: 0, masked: false}"
                    maxlength="15"
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

            <div class="form-group mt-4 mb-0">
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
                class="btn btn-link btn-block text-left pl-0 stocks-sell__btn-sm"
                data-dismiss="modal">
                {{ $t('commons.cancel-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                type="button"
                class="btn btn-secondary btn-block stocks-sell__btn-sm"
                @click="step = 1">
                {{ $t('commons.back-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                :disabled="isButtonDisabled"
                type="button"
                class="btn btn-primary btn-block stocks-sell__btn-sm"
                @click="step = 3">
                {{ $t('commons.next-btn') }}
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="step === 3">
          <div class="modal-body p-4">
            <h4 class="mb-0 text-primary">
              {{ stock.name }}
              <small class="d-block text-muted mt-1">{{ selectedFromAccount.name }}</small>
            </h4>
            <table class="table table-bordered mt-4 mb-0">
              <tr>
                <td>{{ $t('stocks-sell.investment-account') }}:</td>
                <td>{{ selectedFromAccount.name }}</td>
              </tr>
              <tr>
                <td>{{ $t('stocks-sell.fund') }}:</td>
                <td>{{ stock.name }}</td>
              </tr>
              <tr>
                <td>{{ $t('stocks-sell.to-account') }}:</td>
                <td>{{ selectedToAccount.name }}</td>
              </tr>
              <tr>
                <td>{{ $t('commons.type') }}:</td>
                <td>{{ $t('commons.sale') }}</td>
              </tr>
              <tr v-if="sellBy.value === 'byStocks'">
                <td>{{ $t('commons.quantity') }}:</td>
                <td>{{ quantity | formatNum }}</td>
              </tr>
              <tr v-if="sellBy.value === 'byStocks'">
                <td>{{ $t('commons.price-per-stock') }}:</td>
                <td>{{ amountPerShare | currency($t('currency.format')) }}</td>
              </tr>
              <tr v-if="sellBy.value === 'byAmount'">
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
                class="btn btn-link btn-block text-left pl-0 stocks-sell__btn-sm"
                data-dismiss="modal">
                {{ $t('commons.cancel-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                type="button"
                class="btn btn-secondary btn-block stocks-sell__btn-sm"
                @click="step = 2">
                {{ $t('commons.back-btn') }}
              </button>
            </div>
            <div class="col-4 col-lg-3 m-0 pl-2">
              <button
                v-if="!confirmed"
                :disabled="isButtonDisabled"
                type="button"
                class="btn btn-primary btn-block stocks-sell__btn-sm"
                @click="step = 4; confirmed=true">
                {{ $t('commons.confirm') }}
              </button>
              <button
                v-else
                :disabled="isButtonDisabled"
                type="button"
                class="btn btn-primary btn-block stocks-sell__btn-sm"
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
                {{ $t('stocks-sell.success-msg') }}.
              </p>
              <span
                class="stocks-sell__check-icon mt-2 rounded-circle d-inline-block d-flex
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

const sellOptions = [{
  i18nKey: 'stocks-sell.options.per-stocks',
  value: 'byStocks',
}, {
  i18nKey: 'stocks-sell.options.per-amount',
  value: 'byAmount',
}];

export default {
  name: 'StocksSell',
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
      selectedFromAccount: null,
      selectedToAccount: null,
      sellBy: sellOptions[0],
      quantity: 0,
      amountPerShare: 0,
      validity: 'today',
      validityDate: addDays(new Date(), 1),
      minDate: new Date(),
      sellOptions,
      confirmed: false,
      maxlength: 12,
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
    stock() {
      return this.$store.state.selectedStock || {};
    },
    isButtonDisabled() {
      if (this.sellBy.value === 'byStocks') {
        if (this.amountPerShare && this.quantity && this.validityDate) {
          return false;
        }
      } else if (this.amount && this.validityDate) {
        return false;
      }
      return true;
    },
  },
  watch: {
    stock(stock) {
      if (stock.investments) {
        [this.selectedFromAccount] = stock.investments;
      }
    },

    validity(value) {
      if (value === 'today') {
        this.validityDate = new Date();
      } else {
        this.validityDate = addDays(new Date(), 1);
      }
    },
  },
  mounted() {
    const vm = this;
    $(this.$el).on('hidden.bs.modal', () => {
      vm.step = 1;
      vm.amount = 0;
      vm.quantity = 0;
      vm.amountPerShare = 0;
      [vm.sellBy] = sellOptions;
      vm.validity = 'today';
      vm.validityDate = addDays(new Date(), 1);
      [vm.selectedFromAccount] = vm.stock.investments;
      [vm.selectedToAccount] = vm.accounts;
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
          [vm.selectedToAccount] = vm.accounts;
          vm.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.stocks-sell__step {
  width: 2rem;
  height: 2rem;

  line-height: 1rem;
}

.stocks-sell__check-icon {
  background-color: lighten($green, 25);
}

@media (max-width: 320px) {
  .stocks-sell__btn-sm {
    padding-right: .25rem;
    padding-left: .25rem;

    font-size: .95rem;
  }
}
</style>
