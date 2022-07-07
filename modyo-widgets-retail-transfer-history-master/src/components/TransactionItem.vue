<template>
  <div
    v-if="activeTab !== 'statements'"
    :class="[transaction.subject, transaction.transactionType]"
    class="card transaction rounded overflow-hidden mb-2">
    <div
      :id="`transactionHeader${transaction.id}`"
      class="card-header transaction__header p-0">
      <button
        :data-target="`#transactionInfo${transaction.id}`"
        :aria-controls="`#transactionInfo${transaction.id}`"
        class="transaction__button btn btn-block text-left p-3 collapsed rounded-0"
        type="button"
        aria-expanded="false"
        data-toggle="collapse">
        <div class="d-flex justify-content-between align-items-center">
          <div class="transaction__text text-capitalize">
            <p class="text-truncate mb-0 text-primary font-weight-bold">
              {{ transaction.description }}
            </p>
            <small class="d-block text-primary payment-info">
              {{ $t('transaction-item.balance') }}: {{ transaction.balance | currency(currencyFormat) }}
            </small>
          </div>

          <div class="transaction__amount mr-3">
            <p
              class="font-weight-bold mb-0"
              :class="transaction.subject === 'income' ? 'text-success' : 'text-primary'">
              {{ transaction.subject === 'income' ? '+' : '-' }}
              {{ transaction.amount | currency(currencyFormat, transaction.subject) }}
            </p>
          </div>

          <div class="transaction__icon">
            <font-awesome-icon
              icon="chevron-down"
              size="sm" />
          </div>
        </div>
      </button>
    </div>

    <div
      :id="`transactionInfo${transaction.id}`"
      class="transaction__info collapse"
      :aria-labelledby="`transactionHeader${transaction.id}`"
      data-parent="#transactionsList">
      <div class="card-body transacion__body p-3">
        <h6>{{ $t('transaction-item.details') }}</h6>

        <div class="d-lg-flex">
          <div class="mr-5">
            <p class="text-capitalize mb-0">
              <small>{{ $t('transaction-item.product') }}:
                <span class="ml-2 font-weight-bold">{{ transaction.description }}</span>
              </small>
            </p>
            <p class="text-capitalize mb-0">
              <small>{{ $t('transaction-item.amount') }}:
                <span class="ml-2 font-weight-bold">
                  {{ transaction.subject === 'income' ? '+' : '-' }}
                  {{ transaction.amount | currency(currencyFormat) }}
                </span>
              </small>
            </p>
          </div>
          <div>
            <p class="text-capitalize mb-0">
              <small>
                {{ $t('transaction-item.number') }}:
                <span class="ml-2 font-weight-bold">{{ transaction.referenceCode }}</span>
              </small>
            </p>
            <p class="text-capitalize mb-0">
              <small>{{ $t('transaction-item.balance') }}:
                <span class="ml-2 font-weight-bold">
                  {{ transaction.balance | currency(currencyFormat) }}
                </span>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    :class="[transaction.subject, transaction.transactionType]"
    class="card transaction px-4 mb-2">
    <div
      :id="`transactionHeader${transaction.id}`"
      class="card-header transaction__header px-0">
      <div class="d-flex justify-content-between align-items-center">
        <div class="transaction__text text-capitalize">
          <p class="ellipsis mb-0 text-primary font-weight-bold">
            {{ transaction.description }}
          </p>
        </div>

        <div class="transaction__icon">
          <font-awesome-icon
            icon="file-pdf"
            size="2x" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency, date } from '@modyo/financial-commons';

export default {
  name: 'TransactionItem',
  filters: {
    currency,
    date,
  },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    activeTab() {
      return this.$store.state.activeTab;
    },

    filterBy() {
      return this.$store.state.filterBy;
    },

    currencyFormat() {
      return this.$t('currency.format');
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.transaction.card {
  border: 0;
}

.transaction__header.card-header {
  background-color: #fff;
  border-color: $secondary-20;
}

.transaction__text {
  flex: 1 auto;

  margin-right: 20px;

  overflow: hidden;

  font-size: 14px;
}

.transaction__amount {
  flex: 0 auto;

  font-size: 14px;

  p {
    white-space: nowrap;
  }
}

.transaction__button:not(.collapsed) {
  .transaction__icon {
    transform: rotate(180deg);
  }
}

.transaction__icon {
  flex: 0 auto;
}

.transacion__body {
  h6 {
    font-size: 14px;
    color: $primary-80;
  }

  p {
    color: $primary-80;
  }
}

</style>
