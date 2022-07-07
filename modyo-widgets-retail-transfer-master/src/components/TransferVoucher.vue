<template>
  <div class="row no-gutters h-100">
    <div class="transfer__voucher col-12 py-4 py-md-5 px-5">
      <div class="d-flex align-items-center mb-4 mb-md-0">
        <font-awesome-icon
          icon="check-circle"
          size="3x"
          :style="{color: '#53c737'}"
          class="mr-3" />

        <p class="h4 text-primary font-weight-bold">
          {{ $t('transfer-voucher.success') }}
        </p>
      </div>

      <div class="voucher__amount text-left my-5">
        <p class="text-primary h3 font-weight-bold">
          {{ $t('transfer.amount') }}
        </p>

        <p class="text-primary h1 font-weight-bold">
          {{ amount | currency(currencyFormat) }}
        </p>
      </div>

      <div class="voucher__data my-5">
        <p class="text-secondary mb-2">
          {{ transactionDate | date(date.long, date.lang) }}
        </p>
        <p class="text-secondary">
          <strong>{{ $t('transfer-voucher.transaction-number') }}:</strong> 5735BB10-D8DE-4BB8-9A3E-EFBB85E7DFE6
        </p>
      </div>

      <div class="voucher__actions d-flex flex-wrap justify-content-between align-items-center">
        <a
          href=""
          class="btn btn-block btn-primary py-3 px-4">
          {{ $t('actions.back-to-transfers') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { currency, date } from '@modyo/financial-commons';

export default {
  name: 'TransferVoucher',
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

    currencyFormat() {
      return this.$t('currency.format');
    },

  },
};
</script>

<style lang="scss" scoped>

.transfer__voucher {
  position: relative;
}

.row.no-gutters::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  content: "";

  background-image: url("https://cloud.modyocdn.com/uploads/1c64f697-17cf-4f50-89c4-11ff4a771020/original/bank_logo.png");
  opacity: .1;
}

.row.no-gutters::after {
  position: absolute;
  top: 50px;
  right: 50px;

  width: 121px;

  height: 115px;

  content: "";

  background-image: url("https://cloud.modyocdn.com/uploads/1c64f697-17cf-4f50-89c4-11ff4a771020/original/bank_logo.png");
  background-repeat: no-repeat;
}

@media (max-width: 991.98px) {
  .row.no-gutters::after {
    position: absolute;
    top: 60px;
    right: 40px;

    width: 80px;

    height: 76px;

    content: "";

    background-image: url("https://cloud.modyocdn.com/uploads/1c64f697-17cf-4f50-89c4-11ff4a771020/original/bank_logo.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
}

</style>
