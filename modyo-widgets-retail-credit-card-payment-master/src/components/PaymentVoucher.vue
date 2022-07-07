<template>
  <div
    class="row no-gutters h-100"
    :class="lang">
    <div class="credit-cards-payment__voucher col-12 py-4 py-lg-5 px-5">
      <div class="d-flex align-items-center mb-4 mb-lg-0">
        <font-awesome-icon
          icon="check-circle"
          size="3x"
          :style="{color: '#53c737'}"
          class="mr-3" />

        <p class="h4 text-primary font-weight-bold">
          {{ $t('payment-voucher.success') }}
        </p>
      </div>

      <div class="voucher__amount text-left my-5">
        <p class="text-primary h3 font-weight-bold">
          {{ $t('payment.amount') }}
        </p>

        <p class="text-primary h1 font-weight-bold">
          {{ amount | currency(currencyFormatDebt) }}
        </p>
      </div>

      <div class="voucher__data my-5">
        <p class="text-secondary mb-2">
          {{ transactionDate | date(date.long, date.lang) }}
        </p>
        <p class="text-secondary">
          <strong>{{ $t('payment-voucher.transaction-number') }}:</strong> 5735BB10-D8DE-4BB8-9A3E-EFBB85E7DFE6
        </p>
      </div>

      <div class="voucher__actions d-flex flex-wrap justify-content-between align-items-center">
        <a
          href=""
          class="btn btn-block btn-primary py-3 px-4">
          {{ $t('actions.back-to-credit-cards') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { currency, date } from '@modyo/financial-commons';

export default {
  name: 'PaymentVoucher',
  filters: {
    currency,
    date,
  },
  data() {
    return {
      transactionDate: new Date(),
      date: this.$t('date.format'),
    };
  },
  computed: {
    amount() {
      return this.$store.state.amount;
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
  },
};
</script>

<style lang="scss" scoped>

.credit-cards-payment__voucher {
  position: relative;
}

.row.no-gutters.spanish::before,
.row.no-gutters.spanish::after {
  background-image: url("https://cloud.modyocdn.com/uploads/936dfb46-04e4-467f-90cb-c7926c754f92/original/Asset_1_2x-8.png");
}

.row.no-gutters.english::before,
.row.no-gutters.english::after {
  background-image: url("https://cloud.modyocdn.com/uploads/4b6acfa4-7f22-4c2e-bc9c-da9795c83c86/original/Asset_2_2x-8.png");
}

.row.no-gutters::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  content: "";

  background-size: 80px;
  opacity: .04;
}

.row.no-gutters::after {
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

@media (max-width: 575.98px) {
  .row.no-gutters::after {
    position: absolute;
    top: 60px;
    right: 40px;

    width: 80px;

    height: 76px;

    content: "";

    background-repeat: no-repeat;
    background-size: contain;
  }
}

</style>
