<template>
  <div class="payment px-4 d-flex flex-column justify-content-between">
    <div class="payment__title text-left text-lg-center">
      <p class="text-primary h5 font-weight-bold pb-4">
        {{ $t('payment.title') }}
      </p>
    </div>
    <div
      v-if="activeAccount"
      class="account__selected mb-3 d-block d-lg-none"
      @click="handleClick(true)">
      <div class="account__info py-3 px-4 border rounded-lg d-flex justify-content-between align-items-center">
        <font-awesome-icon
          icon="chevron-left"
          class="mr-4" />
        <div class="flex-grow-1">
          <p class="mb-0 text-primary font-weight-bold">
            {{ $t('account.title') }}
          </p>
          <small
            class="d-block text-primary payment-info">
            Nº {{ activeAccount.accountNumber }}
          </small>
        </div>
        <p class="mb-0 h5 text-primary font-weight-bold">
          {{ activeAccount.availableBalance | currency(currencyFormat) }}
        </p>
      </div>
    </div>

    <div class="payment__options">
      <span
        :class="{'disabled': isInputDisabled || (activeAccount && Number(activeAccount.availableBalance)<minimumDebt)}"
        class="payment__option d-block">
        <input
          id="minimumAmountRadio"
          v-model="amountOption"
          :disabled="isInputDisabled || (activeAccount && Number(activeAccount.availableBalance)<minimumDebt)"
          name="amountOption"
          type="radio"
          value="minimumDebt">
        <label
          class="d-flex justify-content-between align-items-center mb-3 px-4 rounded-lg"
          for="minimumAmountRadio">
          <span class="mr-2">{{ $t('payment.minimum-amount-radio') }}</span>
          <span
            :class="{
              'text-primary font-weight-bold': activeAccount!=null ||
                (activeAccount && Number(activeAccount.availableBalance)<minimumDebt)
            }">
            {{ minimumDebt | currency(currencyFormatDebt) }}
          </span>
        </label>
      </span>

      <span
        :class="{'disabled': isInputDisabled || (activeAccount && Number(activeAccount.availableBalance)<billedDebt)}"
        class="payment__option d-block">
        <input
          id="invoicedAMountRadio"
          v-model="amountOption"
          :disabled="isInputDisabled || (activeAccount && Number(activeAccount.availableBalance)<billedDebt)"
          name="amountOption"
          type="radio"
          value="billedDebt">
        <label
          class="d-flex justify-content-between align-items-center mb-3 px-4 rounded-lg"
          for="invoicedAMountRadio">
          <span class="mr-2">{{ $t('payment.invoiced-amount-radio') }} </span>
          <span
            :class="{
              'text-primary font-weight-bold': !isInputDisabled &&
                (activeAccount && Number(activeAccount.availableBalance)>=billedDebt)
            }">
            {{ billedDebt | currency(currencyFormatDebt) }}
          </span>
        </label>
      </span>

      <span
        :class="{'disabled': isInputDisabled ||
          (activeAccount && (Number(activeAccount.availableBalance)<=0 ||
            Number(activeAccount.availableBalance)<minimumDebt))}"
        class="payment__option d-block">
        <input
          id="otherAmountRadio"
          v-model="amountOption"
          :disabled="isInputDisabled ||
            (activeAccount && (Number(activeAccount.availableBalance)<=0 ||
              Number(activeAccount.availableBalance)<minimumDebt))"
          name="amountOption"
          type="radio"
          value="customAmount">
        <label
          class="d-flex justify-content-between align-items-center mb-3 px-4 rounded-lg"
          for="otherAmountRadio">{{ $t('payment.other-amount-radio') }}</label>
      </span>
    </div>

    <validation-observer
      ref="amountObserver"
      v-slot="{valid, invalid, errors, changed}"
      tag="div"
      class="payment__input my-2">
      <div
        :class="{
          'has-error': invalid,
          'disabled': amountOption == null ||
            activeAccount==null ||
            (activeAccount && Number(activeAccount.availableBalance)<minimumDebt)
        }"
        class="payment__amount d-flex flex-column align-items-end mb-2 py-2 px-4 rounded-lg">
        <label
          class="p mb-0"
          for="localAmount">
          {{ $t('payment.amount') }}
        </label>
        <validation-provider
          :rules="{min_value: minimumDebt}"
          slim>
          <money
            id="localAmount"
            ref="moneyInput"
            v-model="localAmount"
            v-bind="moneyOptions"
            :class="{
              'text-right': true,
              'is-danger': invalid && errors,
            }"
            :disabled="isInputDisabled ||
              amountOption != 'customAmount' ||
              // eslint-disable-next-line max-len
              (amountOption == 'customAmount' && activeAccount && Number(activeAccount.availableBalance)<minimumDebt)" />
        </validation-provider>
      </div>
      <small
        v-if="invalid && changed && (localAmount < minimumDebt)"
        class="d-block info-transaction text-danger help is-danger mb-2">
        {{ $t('payment.minimum-payment-msg') }}
      </small>
      <small
        v-if="valid && (localAmount < billedDebt)"
        class="d-block info-transaction text-secondary help is-danger">
        {{ $t('payment.lower-payment-msg') }}
      </small>
      <small
        v-if="!isLangEn && selectedDebt === 'international' && amount > 0"
        class="d-block info-transaction">
        {{ amount * exchangeRate | currency(currencyFormat) }} ({{ $t('payment.chilean-currency') }})
      </small>

      <div class="payment__actions pt-4">
        <div class="">
          <button
            :disabled="invalid"
            class="btn btn-primary btn-block py-3"
            @click="handleClick(false)">
            {{ $t('actions.continue') }}
          </button>
        </div>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { Money } from 'v-money-no-negative';
import { currency } from '@modyo/financial-commons';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'AmountInput',
  filters: {
    currency,
  },
  components: {
    Money,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    exchangeRate: {
      type: Number,
      default: 798,
    },
  },
  data() {
    return {
      localAmount: 0,
    };
  },
  computed: {
    activeAccount() {
      return this.$store.getters.activeAccount || null;
    },

    amount() {
      return this.$store.state.amount;
    },

    amountOption: {
      get() {
        return this.$store.state.amountOption;
      },
      set(value) {
        this.$store.commit('SET_AMOUNT_OPTION', value);
      },
    },

    activeCard() {
      return this.$store.getters.activeCard || null;
    },

    selectedDebt() {
      return this.$store.state.selectedDebt;
    },

    isInputDisabled() {
      if (this.activeAccount && this.activeCard) {
        return false;
      }
      return true;
    },

    stepper() {
      return this.$store.state.stepper;
    },

    totalDebt() {
      if (this.activeCard) {
        if (this.selectedDebt === 'international') { return (parseFloat(this.activeCard.usedQuotaUSD)).toFixed(2); }
        return parseInt(this.activeCard.usedQuotaCLP, 10);
      }
      return 0;
    },

    billedDebt() {
      if (this.totalDebt) {
        if (this.selectedDebt === 'international') { return (parseFloat(this.totalDebt * 0.7)).toFixed(2); }
        return parseInt(this.totalDebt * 0.7, 10);
      }
      return 0;
    },

    minimumDebt() {
      if (this.billedDebt) {
        if (this.selectedDebt === 'international') { return (parseFloat(this.billedDebt * 0.7)).toFixed(2); }
        return parseInt(this.billedDebt * 0.2, 10);
      }
      return 0;
    },

    moneyOptions() {
      if (this.selectedDebt === 'national') {
        return {
          prefix: '$',
          decimal: ',',
          thousands: '.',
          precision: 0,
          maxlength: this.amountMaxLength,
        };
      }
      return {
        prefix: '$',
        decimal: '.',
        thousands: ',',
        precision: 2,
        maxlength: this.amountMaxLength + 3, // comma and decimals
      };
    },

    amountMaxLength() {
      if (this.activeAccount) {
        // Limit by this.activeAccount.availableBalance
        if (this.billedDebt > parseFloat(this.activeAccount.availableBalance)) {
          const availableBalanceLength = Math.round(parseFloat(this.activeAccount.availableBalance)).toString().length;
          const dots = Math.round(availableBalanceLength / 3); // each thousandths is a dot
          return availableBalanceLength + dots;
        }
        // Limit by this.billedDebt
        const availableBalanceLength = Math.round(this.billedDebt).toString().length;
        const dots = Math.round(availableBalanceLength / 3); // each thousandths is a dot
        return availableBalanceLength + dots;
      }
      return 12;
    },

    currencyFormat() {
      return this.$t('currency.format');
    },

    currencyFormatDebt() {
      return this.selectedDebt === 'national' ? this.$t('currency.format') : this.$t('currency.format', 'en-US');
    },

    isLangEn() {
      return this.$store.state.lang === 'en';
    },
  },
  watch: {
    activeAccount: {
      handler() {
        // Reset local amount on active account change
        this.localAmount = 0;
      },
      deep: true,
    },

    localAmount(newValue) {
      if (this.activeAccount) {
        if (
          newValue > Math.round(this.activeAccount.availableBalance)
          && newValue < this.totalDebt
          && Math.round(this.activeAccount.availableBalance) > 0
        ) {
          this.localAmount = Math.round(this.activeAccount.availableBalance);
        } else if (newValue > this.billedDebt) this.localAmount = this.billedDebt;
      }

      this.$store.commit('SET_AMOUNT', this.localAmount);
    },

    amountOption() {
      if (this.amountOption === 'minimumDebt') {
        this.localAmount = parseFloat(this.minimumDebt);
      } else if (this.amountOption === 'billedDebt') {
        this.localAmount = parseFloat(this.billedDebt);
      } else {
        this.localAmount = 0;
        this.$nextTick(() => this.$refs.moneyInput.$el.focus());
      }
    },
  },
  methods: {
    handleClick(prev) {
      if (prev) {
        this.stepper.previous();
      } else {
        this.stepper.next();
        this.$store.commit('SET_STEP_ACTION', 'confirm');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.payment__option {
  position: relative;
}

.payment__option input {
  position: absolute;

  opacity: 0;

  appearance: none;
}

.payment__option label {
  height: 80px;

  cursor: pointer;

  background: #fff;
}

.payment__option input:checked + label {
  background-color: $tertiary-40;
}

.payment__option input:disabled + label {
  color: $primary-40;
}

.payment__input {
  color: $secondary-100;

  .disabled {
    color: $primary-40;
  }
}

.payment__amount {
  height: 80px;

  background-color: #fff;

  .v-money {
    width: 100%;

    font-size: 24px;
    font-weight: 700;
    color: $primary-100;

    background-color: #fff;
    border: 0;
  }

  &.disabled {
    .v-money {
      color: $primary-40;
    }
  }
}

.payment .account__selected {
  cursor: pointer;
  user-select: none;
}

</style>
