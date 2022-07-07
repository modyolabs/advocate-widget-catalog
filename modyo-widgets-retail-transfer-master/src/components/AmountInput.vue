<template>
  <div class="transfer px-4 d-flex flex-column justify-content-between">
    <div
      v-if="toAccount && !toOthers"
      class="account__selected mb-3 d-block d-lg-none"
      @click="handleClick(true)">
      <div class="account__info py-3 px-4 border rounded-lg d-flex justify-content-between align-items-center">
        <font-awesome-icon
          icon="chevron-left"
          class="mr-4" />
        <div class="flex-grow-1">
          <p class="mb-0 text-primary font-weight-bold">
            {{ $t('account.destination-account') }}
          </p>
          <small
            class="d-block text-primary transfer-info">
            Nº {{ toAccount.accountNumber }}
          </small>
        </div>
        <p class="mb-0 h5 text-primary font-weight-bold">
          {{ toAccount.availableBalance | currency(currencyFormat) }}
        </p>
      </div>
    </div>

    <div
      v-if="toOthers && toAccount"
      class="account__selected mb-3 d-block d-lg-none"
      @click="handleClick(true)">
      <div class="account__info py-3 px-4 border rounded-lg d-flex justify-content-between align-items-center">
        <font-awesome-icon
          icon="chevron-left"
          class="mr-4" />
        <div class="flex-grow-1">
          <p class="mb-0 text-primary font-weight-bold">
            Transferir a {{ toAccount.fullname }}
          </p>
          <p class="mb-0 text-primary transfer-info text-capitalize">
            {{ toAccount.bank.name }} - {{ toAccount.accountNumber }}
          </p>
        </div>
      </div>
    </div>

    <validation-observer
      ref="amountObserver"
      v-slot="{invalid, errors, changed}"
      tag="div"
      class="transfer__input">
      <validation-provider
        :rules="{min_value: minAmount}"
        slim>
        <label
          class="sr-only"
          for="transfer-amount">{{ $t('transfer.amount') }}</label>
        <money
          id="transfer-amount"
          ref="moneyInput"
          v-model="amount"
          v-bind="moneyOptions"
          class="transfer__amount d-flex flex-column align-items-end mb-2 py-2 px-4 rounded-lg"
          :class="{'text-right': true, 'is-danger': invalid && errors}"
          :disabled="isInputDisabled" />
      </validation-provider>
      <small
        v-if="invalid && changed && (amount < minAmount)"
        class="d-block info-transaction text-danger help is-danger mb-2">
        <i18n
          path="transfer.minimum-transfer-msg">
          {{ minAmount | currency(currencyFormat) }}
        </i18n>
      </small>

      <div class="transfer__actions pt-4">
        <div class="">
          <button
            :disabled="invalid || disableContinue"
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

  data() {
    return {
      currencyFormat: this.$t('currency.format'),
    };
  },
  computed: {
    fromAccount() {
      return this.$store.getters.fromAccount || null;
    },

    toAccount() {
      return this.$store.getters.toAccount || null;
    },

    toOthers() {
      return this.$store.state.toOthers;
    },

    scheduled() {
      return this.$store.state.scheduled;
    },

    frequency() {
      return this.$store.state.frequency;
    },

    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        this.$store.commit('SET_AMOUNT', value);
      },
    },

    minAmount() {
      return this.$store.state.minAmount;
    },

    isInputDisabled() {
      return !this.fromAccount
        || !this.toAccount
        || (this.toOthers
          && this.toAccountId !== -1
          && this.toAccount
          && this.filteredContacts.indexOf(this.toAccount) < 0)
        || this.availableBalance <= 0;
    },

    stepper() {
      return this.$store.state.stepper;
    },

    isLangEn() {
      return this.$store.state.lang === 'en-US';
    },

    moneyOptions() {
      if (this.isLangEn) {
        return {
          prefix: '$',
          decimal: '.',
          thousands: ',',
          precision: 2,
          maxlength: this.amountMaxLength + 3,
        };
      }
      return {
        prefix: '$',
        decimal: ',',
        thousands: '.',
        precision: 0,
        maxlength: this.amountMaxLength,
      };
    },

    amountMaxLength() {
      if (this.fromAccount) {
        const availableBalanceLength = Math.round(parseFloat(this.fromAccount.availableBalance)).toString().length;
        const dots = Math.round(availableBalanceLength / 3); // each thousandths is a dot
        return availableBalanceLength + dots;
      }
      return 9;
    },

    toAccountId() {
      return this.$store.state.toAccountId;
    },

    filteredContacts() {
      return this.$store.state.filteredContacts;
    },

    disableContinue() {
      return this.fromAccount.availableBalance <= 0
      || this.fromAccount === this.toAccount
      || (this.toOthers
        && this.toAccountId !== -1
        && this.toAccount
        && this.filteredContacts.indexOf(this.toAccount) < 0)
      || (this.toOthers && this.toAccountId === -1 && !this.payeeAccount)
      || (this.scheduled && !this.frequency);
    },

    payeeAccount() {
      return this.$store.state.payeeAccount;
    },

    availableBalance() {
      if (this.fromAccount) return parseFloat(this.fromAccount.availableBalance);
      return 0;
    },
  },
  watch: {
    amount(newValue) {
      if (
        this.fromAccount && newValue > parseFloat(this.fromAccount.availableBalance)
        && parseFloat(this.fromAccount.availableBalance) > 0) {
        this.amount = parseFloat(this.fromAccount.availableBalance);
      }
    },
    fromAccount: {
      deep: true,
      handler() {
        this.amount = 0;
      },
    },
  },
  methods: {
    handleClick(prev) {
      if (prev) {
        this.$store.commit('SET_AMOUNT', 0);
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

.transfer__option {
  position: relative;
}

.transfer__option input {
  position: absolute;

  opacity: 0;

  appearance: none;
}

.transfer__option label {
  height: 80px;

  cursor: pointer;

  background: #fff;
}

.transfer__option input:checked + label {
  background-color: $tertiary-40;
}

.transfer__option input:disabled + label {
  color: $primary-40;
}

.transfer__amount {
  background-color: #fff;

  &:disabled {
    opacity: .6;
  }

  .v-money {
    width: 100%;

    font-size: 24px;
    font-weight: 700;
    color: $primary-100;

    border: 0;
  }
}

.transfer .account__selected {
  cursor: pointer;
  user-select: none;
}

</style>
