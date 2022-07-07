<template>
  <div
    :data-card="activeCard.id"
    class="credit-card mx-5 my-4 my-lg-5">
    <div class="credit-card-payment__title mb-5 text-center text-lg-left">
      <p
        v-if="stepAction !== 'voucher'"
        class="text-primary h5 font-weight-bold">
        {{ $t('card.title') }}
      </p>
      <p
        v-else
        class="text-primary h5 font-weight-bold">
        {{ $t('payment-voucher.title') }}
      </p>
    </div>

    <div
      v-if="stepAction !== 'voucher'"
      class="d-flex justify-content-start align-items-center mt-4 mb-4">
      <div
        :class="activeCard.cardType.toLowerCase()"
        class="credit-card__container mb-3 mr-4">
        <div class="credit-card__map" />

        <div class="credit-card__info p-2 w-100 h-100">
          <p class="credit-card__name text-uppercase text-white mb-2">
            Dynamic Bank
          </p>

          <p class="credit-card__font credit-card__number">
            XXXX XXXX XXXX {{ last4numbers }}
          </p>

          <p class="credit-card__font credit credit-card__holder text-uppercase">
            {{ activeCard.cardHolderName }}
          </p>

          <div class="credit-card__logo">
            <font-awesome-icon
              :icon="['fab', `cc-${activeCard.cardType.toLowerCase()}`]"
              :style="{ color: 'white', opacity: 0.7}"
              size="1x" />
          </div>
        </div>
      </div>

      <div class="credit-card__data test-primary text-capitalize">
        <p>{{ activeCard.cardType }}  ****{{ last4numbers }}</p>
      </div>
    </div>

    <div
      v-if="stepAction !== 'voucher'"
      class="d-flex flex-column justify-content-start mb-5">
      <div class="credit-card__debt">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="mb-0">
            <span v-if="selectedDebt === 'nacional'">{{ $t('card.national-debt') }}</span>
            <span v-else>{{ $t('card.international-debt') }}</span>
          </p>

          <p class="mb-0">
            <strong v-if="selectedDebt === 'national'">{{ activeCard.usedQuotaCLP | currency(currencyFormat) }}</strong>
            <strong v-else>{{ activeCard.usedQuotaUSD | currency(currencyFormatDebt) }}</strong>
          </p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-0">
            {{ $t('payment.title') }}
          </p>

          <p class="mb-0">
            <strong>{{ amount | currency(currencyFormatDebt) }}</strong>
          </p>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-start mb-4">
      <div class="credit-card__debt">
        <p class="h5">
          {{ $t('account.from') }}
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ activeAccount.accountType }}
          </p>

          <p class="mb-1">
            Nº {{ activeAccount.accountNumber }}
          </p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ $t('account.available-balance') }}
          </p>

          <p class="mb-1">
            <strong>{{ activeAccount.availableBalance | currency(currencyFormat) }}</strong>
          </p>
        </div>

        <div
          v-if="stepAction !== 'voucher'"
          class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ $t('account.remaining-balance') }}
          </p>

          <p class="mb-1">
            {{ activeAccount.availableBalance - amount | currency(currencyFormat) }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="stepAction === 'voucher'"
      class="d-flex flex-column justify-content-start mb-4">
      <div class="credit-card__debt">
        <p class="h5">
          {{ $t('payment-voucher.to') }}
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            {{ $t('card.card') }}
          </p>

          <p class="mb-1">
            {{ activeCard.cardType }} ****{{ last4numbers }}
          </p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1 text-capitalize">
            <span v-if="selectedDebt === 'national'">{{ $t('card.national-debt') }}</span>
            <span v-else>{{ $t('card.international-debt') }}</span>
          </p>

          <p class="mb-1">
            <strong>{{ billedDebt | currency(currencyFormatDebt) }}</strong>
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
    last4numbers() {
      return this.activeCard.cardNumber.substr(-4, 4);
    },

    activeCard() {
      return this.$store.getters.activeCard;
    },

    activeAccount() {
      return this.$store.getters.activeAccount;
    },

    amount() {
      return this.$store.state.amount;
    },

    stepAction() {
      return this.$store.state.stepAction;
    },

    selectedDebt() {
      return this.$store.state.selectedDebt;
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

    currencyFormat() {
      return this.$t('currency.format');
    },

    currencyFormatDebt() {
      return this.selectedDebt === 'national' ? this.$t('currency.format') : this.$t('currency.format', 'en-US');
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-card__container {
  position: relative;

  width: 112px;
  height: 72px;

  background: #5d4157;

  border-radius: 8px;

  .credit-card__map {
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

  .credit-card__name {
    font-size: 8px;
  }

  .credit-card__info {
    position: relative;
    z-index: 100;
  }

  .credit-card__font {
    font-family: "ocr_a_std", sans-serif;
    color: #fff;
    text-shadow: -.5px -.5px 0 rgba(255, 255, 255, .3), .5px .5px 0 rgba(0, 0, 0, .6);
  }

  .credit-card__number,
  .credit-card__holder {
    margin-bottom: 6px;

    font-size: 6.4px;
    letter-spacing: .4px;
    white-space: nowrap;
  }

  .credit-card__logo {
    position: absolute;
    right: 8px;
    bottom: 8px;
  }
}
</style>
