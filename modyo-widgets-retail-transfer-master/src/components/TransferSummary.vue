<template>
  <div class="transfer mx-5 my-4 my-md-5">
    <div class="transfer__title mb-4 text-center text-md-left">
      <p
        v-if="stepAction !== 'voucher'"
        class="text-primary h5 font-weight-bold">
        {{ $t('transfer-summary.confirm-title') }}
      </p>
      <p
        v-else
        class="text-primary h5 font-weight-bold">
        {{ $t('transfer-summary.voucher-title') }}
      </p>
    </div>

    <div class="transfer__from-account d-flex flex-column justify-content-start mb-4">
      <div class="transfer__debt">
        <p class="h5">
          {{ $t('account.origin-account') }}
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ fromAccount.accountType }}
          </p>

          <p class="mb-1">
            Nº {{ fromAccount.accountNumber }}
          </p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ $t('account.available-balance') }}
          </p>

          <p class="mb-1">
            <strong>{{ fromAccount.availableBalance | currency(currencyFormat) }}</strong>
          </p>
        </div>

        <div
          v-if="stepAction !== 'voucher'"
          class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ $t('account.remaining-balance') }}
          </p>

          <p class="mb-1">
            {{ fromAccount.availableBalance - amount | currency(currencyFormat) }}
          </p>
        </div>
      </div>
    </div>

    <div class="transfer__to-account d-flex flex-column justify-content-start mb-4">
      <div class="transfer__debt">
        <p class="h5">
          {{ $t('account.destination-account') }}
        </p>

        <div v-if="!toOthers">
          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-1 text-capitalize">
              {{ toAccount.accountType }}
            </p>

            <p class="mb-1">
              Nº {{ toAccount.accountNumber }}
            </p>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-1 text-capitalize">
              {{ $t('account.available-balance') }}
            </p>

            <p class="mb-1">
              <strong>{{ toAccount.availableBalance | currency(currencyFormat) }}</strong>
            </p>
          </div>

          <div
            v-if="stepAction !== 'voucher'"
            class="d-flex justify-content-between align-items-center">
            <p class="mb-1 text-capitalize">
              {{ $t('account.new-balance') }}
            </p>

            <p class="mb-1">
              {{ Number(toAccount.availableBalance) + Number(amount) | currency(currencyFormat) }}
            </p>
          </div>
        </div>

        <div v-if="toOthers">
          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-1 text-capitalize">
              {{ $t('transfer-summary.name') }}
            </p>

            <p class="mb-1">
              {{ toAccount.fullname }}
            </p>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-1 text-capitalize">
              {{ $t('transfer-summary.bank') }}
            </p>

            <p class="mb-1">
              {{ toAccount.bank.name }}
            </p>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-1 text-capitalize">
              {{ toAccount.accountType }}
            </p>

            <p class="mb-1 text-capitalize">
              Nº {{ toAccount.accountNumber }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="stepAction === 'confirm'"
      class="transfer__to-account d-flex flex-column justify-content-start mb-4">
      <div class="transfer__debt">
        <div class="d-flex justify-content-between align-items-center">
          <p class="h5 mb-1 text-capitalize">
            {{ $t('transfer.amount') }}
          </p>

          <p class="h4 mb-1">
            {{ amount | currency(currencyFormat) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

export default {
  name: 'PaymentSummary',
  filters: {
    currency,
  },
  computed: {
    fromAccount() {
      return this.$store.getters.fromAccount;
    },

    toAccount() {
      return this.$store.getters.toAccount;
    },

    amount() {
      return this.$store.state.amount;
    },

    stepAction() {
      return this.$store.state.stepAction;
    },

    currencyFormat() {
      return this.$t('currency.format');
    },

    toOthers() {
      return this.$store.state.toOthers;
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer__container {
  position: relative;

  width: 112px;
  height: 72px;

  background: #5d4157;

  border-radius: 8px;

  .transfer__map {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;

    background-image:
      url(
        "https://cloud.modyocdn.com/uploads/9d12cad9-6535-4ba3-b176-13bb2e509d7e/original/img_tarjeta.jpg"
      );
    background-size: cover;

    border-radius: inherit;
  }

  .transfer__name {
    font-size: 8px;
  }

  .transfer__info {
    position: relative;
    z-index: 100;
  }

  .transfer__font {
    font-family: "ocr_a_std", sans-serif;
    color: #fff;
    text-shadow: -.5px -.5px 0 rgba(255, 255, 255, .3), .5px .5px 0 rgba(0, 0, 0, .6);
  }

  .transfer__number,
  .transfer__holder {
    margin-bottom: 6px;

    font-size: 6.4px;
    letter-spacing: .4px;
    white-space: nowrap;
  }

  .transfer__logo {
    position: absolute;
    right: 8px;
    bottom: 8px;
  }
}
</style>
