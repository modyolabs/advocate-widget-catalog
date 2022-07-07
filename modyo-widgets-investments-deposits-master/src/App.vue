<template>
  <div class="deposits-app py-lg-5">
    <div class="deposits-app__container container-lg p-0">
      <h1 class="h5 mb-0 text-left text-primary border-bottom px-4 px-xl-5 px-4 pt-4 pt-lg-4 pb-4">
        {{ $t('main.title') }}
      </h1>
      <div class="row no-gutters">
        <div
          class="col-lg-4 px-4 pt-4 pb-5 p-lg-0 d-lg-block border-right"
          :class="{'d-none': step!=1}">
          <div class="px-lg-4 px-xl-5 pt-lg-4">
            <div class="form-group mb-1">
              <label class="h6">
                {{ $t('main.deposit_to') }}:
              </label>
              <div>
                <slider-account-list />
              </div>
            </div>
          </div>
          <div
            class="deposits__amount-container form-group px-4 px-xl-5 mb-0 py-4
            border-top d-none d-lg-block">
            <label class="h6">{{ $t('main.deposit_amount') }}:</label>
            <div class="d-flex input-group mt-2">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <money
                v-model.number="amount"
                :disabled="!fromAccount"
                v-bind="moneyOptions"
                class="form-control form-control-lg text-right" />
            </div>
          </div>
          <button
            :disabled="!fromAccount"
            class="mt-4 btn btn-lg btn-block btn-primary d-lg-none"
            @click="step=2">
            {{ $t('main.continue') }}
          </button>
        </div>
        <div
          class="col-12 px-4 pt-4 pb-5 p-lg-5 d-lg-none"
          :class="{'d-none': step!=2}">
          <span class="d-none d-lg-block h1 mb-4">&zwnj;</span>
          <button
            class="d-lg-none btn btn-link btn-block my-lg-4 mb-4 text-left p-0 text-muted"
            @click="step=1">
            <font-awesome-icon
              icon="arrow-left"
              class="mr-2" />
            {{ $t('main.back') }}
          </button>
          <div class="form-group">
            <label class="h4">{{ $t('main.deposit_amount') }}</label>
            <div class="d-flex input-group mt-4">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <money
                v-model.number="amount"
                :disabled="!fromAccount"
                v-bind="{decimal: ',', thousands: '.', precision: 0, masked: false}"
                class="form-control form-control-lg text-right" />
            </div>
          </div>
          <button
            :disabled="!amount"
            class="mt-4 btn btn-lg btn-block btn-primary d-lg-none"
            @click="step=3">
            {{ $t('main.continue') }}
          </button>
        </div>
        <div
          class="deposits__banks col-lg-8 p-4 px-lg-5 py-lg-4 d-lg-block"
          :class="{'d-none': step!=3, 'disabled': !amount}">
          <button
            class="d-lg-none btn btn-link btn-block my-lg-4 mb-4 text-left p-0 text-muted"
            @click="step=2">
            <font-awesome-icon
              icon="arrow-left"
              class="mr-2" />
            {{ $t('main.back') }}
          </button>
          <label class="h6">
            {{ $t('main.choose-payment-type') }}:
          </label>
          <div class="mt-4 row no-gutters">
            <div
              v-for="(bank,index) in banks"
              :key="bank.id"
              class="col-4"
              :class="{
                'pr-2': index==0,
                'px-1': index!=0 && index!=banks.length-1,
                'pl-2': index==banks.length-1
              }">
              <button
                :disabled="!fromAccount || !amount"
                class="deposits__bank form-control btn-block d-flex align-items-center
                text-left px-0 pb-0 h-auto rounded mb-lg-4 mb-3 border"
                :class="toAccount==bank ? 'active' : 'btn-white'"
                @click="setToAccount(bank)">
                <img
                  :src="base_url+bank.img"
                  class="deposits__bank-img w-100">
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="justify-content-end border-top px-lg-5 p-4 d-lg-flex"
        :class="{'d-none': step!=3}">
        <button
          :disabled="!fromAccount || !toAccount || !amount"
          class="btn btn-primary btn-lg btn-block col-3 d-none d-lg-inline-block">
          {{ $t('main.pay') }}
        </button>
        <button
          :disabled="!fromAccount || !toAccount || !amount"
          class="btn btn-primary btn-lg btn-block d-lg-none btn-block mt-0">
          {{ $t('main.pay') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Money } from 'v-money-no-negative';
import SliderAccountList from './components/SliderAccountsList.vue';

export default {
  name: 'Deposits',
  components: {
    Money,
    SliderAccountList,
  },
  data() {
    return {
      base_url: 'https://cloud.modyocdn.com/uploads',
      step: 1,
    };
  },
  computed: {
    banks() {
      return this.$store.state.banks;
    },
    depositAccounts() {
      return this.$store.getters.depositAccounts;
    },
    fromAccount() {
      return this.$store.state.fromAccount;
    },
    toAccount() {
      return this.$store.state.toAccount;
    },
    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        this.$store.commit('SET_AMOUNT', value);
      },
    },
    amountMaxLength() {
      return 12;
    },
    lang() {
      return this.$store.state.lang;
    },
    moneyOptions() {
      if (this.lang === 'es-CL') {
        return {
          decimal: ',',
          thousands: '.',
          precision: 0,
        };
      }
      return {
        decimal: '.',
        thousands: ',',
        precision: 2,
      };
    },
  },
  methods: {
    setToAccount(account) {
      this.$store.commit('SET_TO_ACCOUNT', account);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

.deposits-app {
  min-height: 100%;

  background-color: #fff;
}

.deposits__bank {
  &:disabled {
    background-color: #fff;
    opacity: .4;
  }

  &.active {
    box-shadow: 0 0 0 .2rem $primary-40;
  }

  .deposits__bank-img {
    height: 100px;
    object-fit: contain;
  }
}
@media (max-width: 320px) {
  .deposits-app__container {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }
}
@media (min-width: 320.02px) and (max-width: 991.98px) {
  .deposits-app__container {
    padding-top: 1.5rem;
  }
}
@media (min-width: 992px) {
  .deposits-app {
    height: auto;

    background-color: transparent;

    .deposits-app__container {
      background-color: #fff;
    }
  }

  .deposits__banks {
    background-color: $tertiary-10;
  }
}
</style>
