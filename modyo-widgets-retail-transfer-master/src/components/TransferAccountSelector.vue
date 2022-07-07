<template>
  <div class="my-4 my-md-5 h-100 d-flex flex-column">
    <div class="transfer__title px-5 text-center">
      <p class="text-primary h5 font-weight-bold">
        {{ $t('account.origin-account') }}
      </p>
    </div>

    <div
      class="account__slider-wrapper pb-4">
      <div
        ref="account-slider"
        class="account__slider">
        <account
          v-for="account in accounts"
          ref="account-slide"
          :key="`account-${account.id}`"
          :account="account"
          class="account__slide px-4" />
      </div>
      <div class="account-slider__indicators px-4 d-flex justify-content-center">
        <span
          v-for="(account, index) in accounts"
          :key="`indicator-${index}`"
          class="indicator"
          :class="{'active': accountsSlider.currentSlide == index}"
          @click="sliderGoTo(index)" />
      </div>
    </div>

    <schedule-transfer />

    <div class="px-4">
      <button
        class="btn btn-primary btn-block py-3"
        @click="handleClick">
        {{ toOthers ? $t('actions.to-own') : $t('actions.to-others') }}
      </button>
    </div>
  </div>
</template>

<script>
import Siema from 'siema';
import Account from './Account.vue';
import ScheduleTransfer from './ScheduleTransfer.vue';

export default {
  name: 'PaymentAccountSelector',
  components: {
    Account,
    ScheduleTransfer,
  },
  props: {
    stepper: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      accountsSlider: {},
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },

    toOthers() {
      return this.$store.state.toOthers;
    },
  },
  mounted() {
    this.initaccountsSlider();
  },
  methods: {
    initaccountsSlider() {
      this.$nextTick(() => {
        this.accountsSlider = new Siema({
          selector: '.account__slider',
          startIndex: this.$store.state.fromAccountId - 1,
          onChange: this.setFromAccount,
        });
      });
    },

    sliderGoTo(index) {
      this.accountsSlider.goTo(index);
    },

    setFromAccount() {
      const accounts = this.$refs['account-slide'];
      this.$store.commit('SET_FROM_ACCOUNT_ID', accounts[this.accountsSlider.currentSlide].$el.dataset.account);
      accounts.forEach((slide, i) => {
        if (i === this.accountsSlider.currentSlide) {
          accounts[i].$el.classList.add('active');
        } else {
          accounts[i].$el.classList.remove('active');
        }
      });
    },

    handleClick() {
      this.$store.commit('SET_AMOUNT', 0);
      this.$store.commit('SET_TO_ACCOUNT_ID', null);
      this.$store.commit('SET_TO_OTHERS', !this.toOthers);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.transfer__title {
  background-color: #fff;
}

.account__slider-wrapper {
  background-color: #fff;
}

.account-slider__indicators {
  .indicator {
    width: 60px;
    height: 8px;
    margin: 0 5px;

    cursor: pointer;

    background-color: $primary-20;
    border-radius: 8px;

    &.active {
      background-color: $primary-100;
    }
  }
}

@media (min-width: 992) {
  #account-app {
    .account__slider-wrapper {
      border-bottom: 1px solid $secondary-20;
    }
  }
}
</style>
