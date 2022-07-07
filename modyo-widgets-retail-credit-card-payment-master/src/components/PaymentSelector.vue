<template>
  <div class="row no-gutters">
    <div
      class="credit-cards-payment__accounts col-12 col-lg-6 py-4 py-lg-5"
      :class="{inactive: step.value == 2}">
      <accounts-list />
    </div>
    <div
      class="credit-cards-payment__amount col-12 col-lg-6 py-4 py-lg-5"
      :class="{active: step.value == 2}">
      <amount-input />
    </div>
  </div>
</template>

<script>
import AccountsList from './AccountsList.vue';
import AmountInput from './AmountInput.vue';

export default {
  name: 'PaymentSelector',
  components: {
    AccountsList,
    AmountInput,
  },
  computed: {
    step() {
      return this.$store.state.step;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.credit-cards-payment__accounts,
.credit-cards-payment__amount {
  overflow: hidden;

  background-color: $tertiary-20;
}

@media (max-width: 991.98px) {
  .credit-cards-payment__accounts.col-12 {
    position: absolute;

    display: block;

    transition: all .2s ease-in-out;
    transform: translateX(0);

    &.inactive {
      display: none;

      transform: translateX(-100%);
    }
  }

  .credit-cards-payment__amount.col-12 {
    position: absolute;

    display: none;

    transition: all .2s ease-in-out;
    transform: translateX(100%);

    &.active {
      display: block;

      transform: translateX(0);
    }
  }
}
</style>
