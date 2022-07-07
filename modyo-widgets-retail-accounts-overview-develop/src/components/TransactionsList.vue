<template>
  <div class="transactions-list p-4">
    <div class="d-flex">
      <div class="fw-bold flex-fill title">
        {{ $t('transactions-list.latest-transactions') }}
      </div>
      <div class="w-25 d-none d-md-block">
        <div class="input-group border rounded-3">
          <span
            id="basic-addon1"
            class="input-group-text rounded-start border-0 bg-transparent">
            <font-awesome-icon icon="search" />
          </span>
          <input
            v-model="query"
            type="search"
            class="form-control py-2 border-0 query-transaction bg-transparent"
            :placeholder="$t('commons.search')+'...'">
        </div>
      </div>
    </div>

    <div
      v-if="isLoadingTransactions"
      class="loading text-center">
      <div
        class="loading spinner-border"
        role="status">
        <span class="sr-only">{{ $t('commons.loading') }}</span>
      </div>
    </div>

    <div
      v-if="!isLoadingTransactions && transactions.length === 0"
      class="transactions-list--empty">
      <font-awesome-icon
        icon="exclamation-triangle"
        size="2x"
        class="mb-2" />
      <p>{{ $t('transactions-list.empty') }}</p>
    </div>

    <div
      v-if="!isLoadingTransactions && transactions.length > 0"
      id="transactionsList"
      class="transactions-list__items mt-4">
      <div
        v-for="(group, keyName, index) in groupedTransactions"
        :key="index"
        class="accordion mb-4">
        <p class="text-primary fw-bold mb-2">
          {{ keyName }}
        </p>
        <transaction-item
          v-for="transaction in group"
          :key="transaction.id"
          :transaction="transaction" />
      </div>
    </div>
  </div>
</template>

<script>
import { date, groupBy } from '@fc-filters';
import TransactionItem from './TransactionItem.vue';

export default {
  name: 'TransactionsList',
  filter: {
    date,
    groupBy,
  },
  components: {
    TransactionItem,
  },

  data() {
    return {
      query: '',
      dateFormats: this.$t('date.format'),
      isLoadingTransactions: true,
    };
  },
  computed: {

    transactions() {
      return this.$store.state.transactions;
    },

    filteredTransactions() {
      return this.transactions.filter((transaction) => this.isInQuery(transaction));
    },

    groupedTransactions() {
      const groupKey = 'bookingDate';
      return this.$options.filter.groupBy(this.filteredTransactions, (item) => {
        const isoDate = new Date(item[groupKey]);
        const GMTZeroDate = new Date(isoDate.valueOf() + new Date().getTimezoneOffset() * 60 * 1000);
        const key = this.$options.filter.date(GMTZeroDate, this.dateFormats.long, this.dateFormats.lang);
        return key;
      });
    },
  },
  mounted() {
    this.isLoadingTransactions = true;
    this.$store.dispatch('GET_TRANSACTIONS')
      .then(() => {
        this.isLoadingTransactions = false;
      });
  },
  methods: {
    isInQuery(transaction) {
      return this.searchByDescription(transaction) || this.searchByAmount(transaction);
    },

    searchByDescription(transaction) {
      return transaction.description.toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
    },

    searchByAmount(transaction) {
      if (Object.prototype.hasOwnProperty.call(transaction, 'amount')) {
        return transaction.amount.indexOf(this.query) >= 0;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.transactions-list--empty {
  width: 300px;
  margin: auto;
  margin-top: 100px;

  color: $primary-60;

  text-align: center;
}
.transactions-list {
  background-color: #fff;

  @media screen and (min-width: 768px) {
    background-color: $tertiary-20;
  }

  .title {
    color: #333;
  }
}
.transactions-list__items {
  // height: 500px;
  overflow: auto;
}
.query-transaction {
  font-size: 12px;
}

</style>
