<template>
  <div
    id="transfer-app"
    class="py-lg-5">
    <div class="transfer__container container-lg p-0">
      <h2 class="h5 mb-0 border-bottom px-lg-5 px-4 text-primary py-3 d-none d-lg-block">
        {{ $t('main.title') }}
      </h2>

      <div class="transfer__steps d-flex d-lg-none justify-content-center p-4">
        <button
          class="transfer__step rounded-circle mr-2 text-center border-0"
          :class="step === 1? 'bg-primary text-white' : 'bg-light'"
          @click="goTo(1)">
          1
        </button>
        <button
          class="transfer__step rounded-circle mx-1 text-center border-0"
          :class="step === 2? 'bg-primary text-white' : 'bg-light'"
          :disabled="!fromAccount"
          @click="goTo(2)">
          2
        </button>
        <button
          class="transfer__step rounded-circle ml-2 text-center border-0"
          :class="step === 3? 'bg-primary text-white' : 'bg-light'"
          :disabled="!toAccount">
          3
        </button>
      </div>

      <div
        class="row animated-row no-gutters px-lg-5 py-lg-3"
        :style="{'min-height': stepHeight+'px'}">
        <div
          ref="transfer_step_1"
          :class="{'active': step === 1}"
          class="col-lg-4 pr-lg-3 px-4 px-lg-0">
          <accounts-list
            :has-filter="true"
            :balance="balance"
            account-type="from">
            <div slot="title">
              <h4 class="h5 mb-0">
                {{ $t('main.transfer-from') }}
              </h4>
            </div>
          </accounts-list>
        </div>
        <div
          ref="transfer_step_2"
          :class="step === 2? 'active' : ''"
          class="col-lg-4 px-lg-2 px-4 px-lg-0">
          <accounts-list account-type="to">
            <div slot="title">
              <h4 class="h5 mb-0">
                {{ $t('main.transfer-to') }}
              </h4>
            </div>
          </accounts-list>
        </div>
        <div
          ref="transfer_step_3"
          :class="step === 3? 'active' : ''"
          class="col-lg-4 pl-lg-3 px-4 px-lg-0">
          <div class="transfer__card card rounded-sm border">
            <div class="card-header p-3 border-bottom">
              <h4 class="h5 mb-0">
                {{ $t('commons.amount') }}
              </h4>
            </div>
            <div class="card-body overflow-auto d-block d-lg-flex align-items-center justify-content-center">
              <div
                v-if="fromAccount && toAccount"
                class="d-block d-lg-none mb-3 from-account">
                <p class="mb-0">
                  {{ $t('commons.from') }}: <strong>{{ fromAccount.name }}</strong>
                </p>
                <p class="mb-0">
                  {{ $t('commons.to') }}: <strong>{{ toAccount.name }}</strong>
                </p>
              </div>
              <div>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span
                      v-if="currencyFilter.value === 'Peso'"
                      class="input-group-text p-3 text-muted">$</span>
                    <span
                      v-else-if="currencyFilter.value === 'Dólar'"
                      class="input-group-text p-3 text-muted">US$</span>
                    <span
                      v-else-if="currencyFilter.value === 'Euro'"
                      class="input-group-text">€</span>
                  </div>
                  <money
                    v-model.number="amount"
                    v-bind="moneyOptions"
                    :disabled="isInputDisabled"
                    name="monto"
                    class="form-control h-auto p-3 text-right" />
                </div>
                <small
                  class="text-right d-block mt-3">
                  {{ $t('main.remaining-balance') }}:
                  <strong>{{ finalBalance | currency(currencyFormat) }}</strong>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-lg-5 px-4 py-3 border-top mt-4 mt-lg-0 text-right">
        <button
          :disabled="isButtonDisabled"
          class="btn btn-primary btn-lg px-5 d-none d-lg-inline-block">
          {{ $t('main.transfer-btn') }}
        </button>
        <button
          :disabled="isButtonDisabled"
          class="btn btn-primary btn-lg px-5 d-lg-none btn-block">
          {{ $t('main.transfer-btn') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Money } from 'v-money-no-negative';
import { currency } from '@modyo/financial-commons';
import accountsList from './components/accountsList.vue';

export default {
  name: 'InvestmentTransferApp',
  filters: {
    currency,
  },
  components: {
    accountsList,
    Money,
  },
  data() {
    return {
      stepHeight: 400,
    };
  },
  computed: {
    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(newValue) {
        this.$store.commit('SET_AMOUNT', newValue);
      },
    },
    fromAccount() {
      return this.$store.state.fromAccount;
    },
    toAccount() {
      return this.$store.state.toAccount;
    },
    step() {
      if (this.fromAccount && this.toAccount) {
        return 3;
      }
      if (this.fromAccount && !this.toAccount) {
        return 2;
      }
      return 1;
    },
    currencyFilter() {
      return this.$store.state.currencyFilter;
    },
    isInputDisabled() {
      if (this.fromAccount && this.toAccount) {
        return false;
      }
      return true;
    },
    isButtonDisabled() {
      if (this.fromAccount && this.toAccount && this.amount) {
        return false;
      }
      return true;
    },
    finalBalance() {
      return this.balance.originValue - this.amount || 0;
    },
    balance() {
      if (this.fromAccount) {
        const selectedCurrency = this.fromAccount.currencies.find(
          (account) => account.name === this.currencyFilter.value,
        );
        return selectedCurrency.amount;
      }
      return {};
    },
    currencyFormat() {
      const format = this.$t('currency.format');
      if (this.currencyFilter.value !== 'Peso') {
        format.precision = 2;
      } else {
        format.precision = 0;
      }

      return format;
    },
    moneyOptions() {
      if (this.currencyFilter.value === 'Peso') {
        return {
          decimal: ',',
          thousands: '.',
          precision: 0,
          masked: false,
          maxlength: this.amountMaxLength,
        };
      }
      return {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false,
        maxlength: this.amountMaxLength + 3,
      };
    },
    amountMaxLength() {
      if (this.balance) {
        const availableBalanceLength = Math.round(parseFloat(this.balance.originValue)).toString().length;
        const dots = Math.round(availableBalanceLength / 3); // each thousandths is a dot
        const decimals = this.$t(`currency.${this.balance.currency}`).precision;
        return availableBalanceLength + dots + decimals;
      }
      return 9;
    },
  },
  watch: {
    step() {
      this.getStepHeight();
    },
    amount(newValue) {
      if (this.balance && newValue > this.balance.originValue) this.amount = this.balance.originValue;
    },
  },
  created() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      this.$store.dispatch('GET_ACCOUNTS')
        .then(() => {
          this.getStepHeight();
        });
    },
    goTo(step) {
      if (step === 1) {
        this.amount = 0;
        this.$store.commit('SET_FROM_ACCOUNT', null);
        this.$store.commit('SET_TO_ACCOUNT', null);
      } else if (step === 2) {
        this.amount = 0;
        this.$store.commit('SET_TO_ACCOUNT', null);
      }
    },
    getStepHeight() {
      setTimeout(() => {
        switch (this.step) {
          case 2:
            this.stepHeight = this.$refs.transfer_step_2.scrollHeight;
            break;
          case 3:
            this.stepHeight = this.$refs.transfer_step_3.scrollHeight;
            break;
          default:
            this.stepHeight = this.$refs.transfer_step_1.scrollHeight;
            break;
        }
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

@media (max-width: 991.98px) {
  #transfer-app {
    min-height: 100%;

    background-color: #fff;
  }

  .transfer__steps {
    position: relative;

    &::before {
      position: absolute;
      top: 50%;

      width: 100%;
      height: 2px;
      margin-top: -1px;

      content: "";

      background-color: $tertiary-20;
    }

    .transfer__step {
      position: relative;
      z-index: 100;

      width: 40px;
      height: 40px;

      font-size: 14px;
      line-height: 40px;
    }
  }

  .animated-row {
    position: relative;

    width: 100%;
    overflow: hidden;

    transition: all .5s ease-out;

    > [class^="col-"] {
      position: absolute;
      left: 100%;

      opacity: 0;

      transition: all .5s ease-in-out;

      &.active {
        left: 0;

        opacity: 1;

        animation: fadeIn .5s ease-in-out;
      }
    }
  }
}

@media (min-width: 992px) {
  .transfer__container {
    background-color: #fff;
  }

  .transfer__card {
    height: 400px;
  }
}

@keyframes fadeIn {
  0% {
    left: 100%;

    opacity: 0;
  }
}
</style>
