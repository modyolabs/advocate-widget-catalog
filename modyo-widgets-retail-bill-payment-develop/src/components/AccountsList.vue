<template>
  <div class="transactions-list my-4">
    <div
      v-if="isLoadingBills"
      class="container-lg text-center py-5">
      <div
        class="loading spinner-border"
        role="status" />
      <span class="visually-hidden">{{ $t('commons.loading') }}</span>
    </div>
    <div
      v-else
      id="billList">
      <div
        v-for="(bill, index) in commonBills"
        :key="bill.id"
        class="accordion mb-4">
        <account-item
          :bill="bill"
          :index="index" />
      </div>
      <div
        v-if="billsScheduled.length > 0"
        class="text-primary fw-500 mb-3 h5">
        {{ $t('bill.auto-payment') }}:
      </div>
      <div
        v-for="(bill, index) in billsScheduled"
        :key="bill.id"
        class="accordion mb-4">
        <account-item
          :bill="bill"
          :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountItem from './AccountItem.vue';

export default {
  name: 'AccountsList',
  components: {
    AccountItem,
  },
  data() {
    return {

    };
  },
  computed: {
    isLoadingBills() {
      return this.$store.state.isLoadingBills;
    },
    bills() {
      return this.$store.state.bills;
    },
    commonBills() {
      return this.bills.filter((bill) => !bill.isScheduled);
    },
    billsScheduled() {
      return this.bills.filter((bill) => bill.isScheduled);
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.fw-500 {
  font-weight: 500;
}
.transactions-list--empty {
  width: 300px;
  margin: auto;
  margin-top: 100px;

  color: $primary-60;

  text-align: center;
}

.transactions-list__items {
  height: 100%;
  overflow: auto;
}

.transactions-list__filters {
  .filters__select {
    flex: 1 0 auto;

    .multiselect {
      color: $secondary-100;
    }

    .multiselect__tags {
      border-color: $tertiary-100;

      &:hover {
        border-color: $secondary-100;
      }
    }
  }

  .filter__date {
    flex: 1 0 auto;
  }

  .filters-date__btn.btn {
    font-size: 14px;
    color: $secondary-100;

    background-color: #fff;

    border-color: $tertiary-100;

    &:hover {
      border-color: $secondary-100;
    }
  }

  .filters__search-bar {
    flex: 1 0 100%;

    .form-control {
      height: initial;
    }
  }
}

@media (max-width: 991.98px) {
  #billList {
    padding-bottom: 5rem;
  }
}

</style>
