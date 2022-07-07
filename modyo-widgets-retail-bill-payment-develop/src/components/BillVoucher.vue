<template>
  <div
    class="row no-gutters h-100"
    :class="lang">
    <div class="col-12 col-lg-5 bg-white py-4 py-lg-5 px-4 px-lg-5 credit-cards-payment__voucher">
      <p class="h4 text-primary font-weight-bold border-bottom pb-3 d-none d-lg-block">
        {{ $t('payment-voucher.stub') }}
      </p>
      <div class="d-flex d-lg-none align-items-center mb-4 mt-3">
        <font-awesome-icon
          icon="check-circle"
          size="3x"
          :style="{color: '#53c737'}" />

        <div class="h4 ms-3 my-0 text-primary font-weight-bold">
          {{ $t('payment-voucher.success') }}
        </div>
      </div>

      <h3 class="primary-80 d-none d-lg-block">
        {{ $t('payment-voucher.from') }}
      </h3>
      <h5 class="primary-80 d-block d-lg-none">
        {{ $t('payment-voucher.from') }}
      </h5>
      <div class="d-flex justify-content-between border-bottom pb-4 text-secondary">
        <p class="">
          {{ $t('payment-voucher.transaction-account') }}
        </p>
        <p class="">
          Nº 2934809849
        </p>
      </div>

      <h3 class="mt-3 d-none d-lg-block">
        {{ $t('commons.accounts') }}
      </h3>
      <h5 class="mt-3 d-block d-lg-none">
        {{ $t('commons.accounts') }}
      </h5>
      <div class="border-bottom pb-2 pb-lg-4">
        <div
          v-for="bill in billsPaid"
          :key="bill.id"
          class="mb-3">
          <div class="d-flex justify-content-between fw-bold lh-sm">
            <div>{{ bill.alias }}</div>
            <div>{{ bill.amount | currency(currencyFormat) }}</div>
          </div>
          <div class="lh-sm">
            {{ bill.company.name }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between py-2 py-lg-4 border-bottom">
        <div class="h3 my-1">
          {{ $t('payment.amount') }}
        </div>
        <div class="h3 my-1 text-primary">
          {{ totalPaid | currency(currencyFormat) }}
        </div>
      </div>

      <div class="voucher__data d-block d-lg-none my-4 text-secondary">
        <div class="">
          {{ transactionDateFilter }}
        </div>
        <div class="fw-bold">
          {{ $t('payment-voucher.transaction-number') }}:
        </div>
        <div>5735BB10-D8DE-4BB8</div>
      </div>

      <div
        class="d-block d-lg-none pt-3"
        style="z-index: 100;">
        <a
          class="btn btn-primary w-100 py-3 px-4 btn__return"
          @click="handleBack">
          {{ $t('actions.back-to-bills') }}
        </a>
      </div>
    </div>
    <div class="credit-cards-payment__voucher-lg col-12 col-lg-7 py-4 py-lg-5 px-5 d-none d-lg-block">
      <div class="voucher__amount text-left my-5">
        <p class="text-primary h3 font-weight-bold primary-80">
          {{ $t('payment.amount') }}
        </p>

        <p class="text-primary h1 font-weight-bold">
          {{ totalPaid | currency(currencyFormat) }}
        </p>
      </div>

      <div class="voucher__data my-5">
        <p class="text-secondary mb-2">
          {{ transactionDateFilter }}
        </p>
        <p class="text-secondary">
          <strong>{{ $t('payment-voucher.transaction-number') }}:</strong> 5735BB10-D8DE-4BB8-9A3E-EFBB85E7DFE6
        </p>
      </div>

      <div class="voucher__actions d-flex justify-content-between align-items-center pt-5">
        <div class="flex-grow-1 d-flex align-items-center gap-3 mb-4 mb-lg-0">
          <font-awesome-icon
            icon="check-circle"
            size="3x"
            :style="{color: '#53c737'}" />

          <div class="h4 m-0 text-primary font-weight-bold">
            {{ $t('payment-voucher.success') }}
          </div>
        </div>
        <div
          class="flex-grow-1"
          style="z-index: 100;">
          <a
            class="btn btn-primary w-100 py-3 px-4"
            @click="handleBack">
            {{ $t('actions.back-to-bills') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency, date } from '@modyo/financial-commons';

export default {
  name: 'BillVoucher',
  filters: {
    currency,
  },
  data() {
    return {
      transactionDate: new Date(),
      date: this.$t('date.format'),
    };
  },
  computed: {
    allBills() {
      return this.$store.state.bills;
    },
    billsPaid() {
      return this.$store.state.bills.filter((bill) => bill.inCart);
    },
    totalPaid() {
      return this.billsPaid.reduce((total, bill) => total + bill.amount, 0);
    },
    selectedDebt() {
      return this.$store.state.selectedDebt;
    },
    currencyFormat() {
      return this.$t('currency.format');
    },
    currencyFormatDebt() {
      return this.selectedDebt === 'national' ? this.$t('currency.format') : this.$t('currency.format', 'en-US');
    },
    lang() {
      return this.$store.state.lang === 'es' ? 'spanish' : 'english';
    },
    transactionDateFilter() {
      return date(this.transactionDate, this.date.long, this.date.lang);
    },
  },
  methods: {
    handleBack() {
      const billsPaid = this.allBills.map((bill) => {
        if (bill.inCart) {
          return {
            ...bill,
            isPaid: true,
            inCart: false,
          };
        }
        return bill;
      });
      this.$store.commit('UPDATE_BILLS', billsPaid);
      this.$store.commit('SET_STEP_ACTION', 'select');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.primary-80 {
  color: $primary-80;
}

.btn__return {
  transform: translateZ(1px);
}

.credit-cards-payment__voucher-lg {
  position: relative;
}

.credit-cards-payment__voucher-lg::before,
.credit-cards-payment__voucher-lg::after {
  background-image: url("https://cloud.modyocdn.com/uploads/936dfb46-04e4-467f-90cb-c7926c754f92/original/Asset_1_2x-8.png");
}

.credit-cards-payment__voucher-lg::before,
.credit-cards-payment__voucher-lg::after {
  background-image: url("https://cloud.modyocdn.com/uploads/4b6acfa4-7f22-4c2e-bc9c-da9795c83c86/original/Asset_2_2x-8.png");
}

.credit-cards-payment__voucher-lg::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  content: "";

  background-size: 80px;
  opacity: .04;
}

.credit-cards-payment__voucher-lg::after {
  position: absolute;
  top: 40px;
  right: 40px;

  width: 140px;
  height: 140px;

  content: "";

  background-repeat: no-repeat;
  background-size: contain;

  transform: rotate(18deg);
}

@media (max-width: 991.98px) {
  .credit-cards-payment__voucher {
    position: relative;
  }

  .credit-cards-payment__voucher::before,
  .credit-cards-payment__voucher::after {
    background-image: url("https://cloud.modyocdn.com/uploads/936dfb46-04e4-467f-90cb-c7926c754f92/original/Asset_1_2x-8.png");
  }

  .credit-cards-payment__voucher::before,
  .credit-cards-payment__voucher::after {
    background-image: url("https://cloud.modyocdn.com/uploads/4b6acfa4-7f22-4c2e-bc9c-da9795c83c86/original/Asset_2_2x-8.png");
  }

  .credit-cards-payment__voucher::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    content: "";

    background-size: 80px;
    opacity: .04;
  }

  .credit-cards-payment__voucher::after {
    position: absolute;
    top: 40px;
    right: 40px;

    width: 140px;
    height: 140px;

    content: "";

    background-repeat: no-repeat;
    background-size: contain;

    transform: rotate(18deg);
  }
}

@media (max-width: 575.98px) {
  .credit-cards-payment__voucher::after {
    position: absolute;
    top: 30px;
    right: 10px;

    width: 80px;
    height: 76px;

    content: "";

    background-repeat: no-repeat;
    background-size: contain;
  }

}

</style>
