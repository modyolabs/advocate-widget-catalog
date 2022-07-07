<template>
  <div
    id="cash-advance-app"
    class="cash-advance py-lg-5 overflow-auto">
    <div class="cash-advance__container container-lg bg-white overflow-auto">
      <m-response-control
        v-if="apiStatus"
        class="container-lg text-center py-5"
        :status="apiStatus">
        <template #loading>
          <div
            class="loading spinner-border"
            role="status">
            <span class="sr-only">{{ $t('commons.loading') }}</span>
          </div>
        </template>
        <template #error>
          <div class="d-flex flex-column justify-content-center p-4 h-100">
            <h5 class="text-center">
              {{ $t('commons.try-again') }}
            </h5>
          </div>
        </template>
        <template #empty>
          <div class="d-flex flex-column justify-content-center p-4 h-100">
            <h5 class="text-center">
              {{ $t('commons.empty') }}
            </h5>
          </div>
        </template>
      </m-response-control>
      <div
        v-else
        class="cash-advance__row row">
        <div
          v-if="showSettingsView"
          class="col-lg-6 p-4 p-sm-5 d-flex flex-column d-lg-block">
          <h1 class="h5 mb-4 text-primary d-none d-lg-block">
            {{ $t('main.title') }}
          </h1>
          <div class="form-group">
            <label for="from-account">{{ $t('main.from') }}</label>
            <multiselect
              id="from-account"
              v-model="card"
              :show-no-results="false"
              :show-labels="false"
              :searchable="false"
              :options="cards"
              :custom-label="cardLabel"
              :allow-empty="false"
              track-by="id"
              label="cardType"
              :placeholder="$t('main.select-card')">
              <template
                slot="option"
                slot-scope="props">
                <span>{{ props.option.cardType }} -
                  <small>****{{ props.option.cardNumber.substr(-4, 4) }}</small>
                </span>
              </template>
            </multiselect>
          </div>
          <div class="form-group">
            <label for="to-account">{{ $t('main.to') }}</label>
            <multiselect
              id="to-account"
              v-model="account"
              :show-no-results="false"
              :show-labels="false"
              :searchable="false"
              :options="accounts"
              :custom-label="accountLabel"
              :allow-empty="false"
              track-by="id"
              label="accountType"
              :placeholder="$t('main.select-to-account')">
              <template
                slot="option"
                slot-scope="props">
                <span class="text-capitalize">{{ props.option.accountType }} -
                  <small>{{ props.option.accountNumber }}</small>
                </span>
              </template>
            </multiselect>
          </div>
          <div class="form-group">
            <label for="advance-amount">{{ $t('main.advance-amount') }}</label>
            <money
              id="advance-amount"
              v-model="amount"
              class="form-control text-right"
              v-bind="moneyOptions"
              :disabled="!card || !account"
              @input="calculateAdvance" />
            <div
              v-if="card"
              class="mt-3">
              <p
                class="mb-0">
                <i18n
                  path="main.max-advance-msg">
                  {{ currency(advanceUsedQuota, currencyFormat) }}
                  <strong>{{ currency(advanceAvailableQuota, currencyFormat) }}</strong>
                </i18n>
              </p>
              <small class="text-muted">
                {{ $t('main.minimum-amount', { amount: currency(minAmount, currencyFormat) }) }}
              </small>
            </div>
          </div>
          <div class="form-group pb-4">
            <label for="fees">{{ $t('main.fees') }}</label>
            <vue-slider
              id="fees"
              v-model.number="payments"
              :disabled="isRangeDisabled"
              :marks="paymentsSteps"
              :min="1"
              :max="36"
              tooltip="always"
              tooltip-placement="bottom"
              @change="calculateAdvance" />
          </div>
          <div class="form-group mt-4 mb-0 pt-2">
            <button
              :disabled="showMinMessage || showMaxMessage"
              class="btn btn-primary btn-lg btn-block d-none d-lg-block"
              @click="activeDetailInfo=true">
              {{ $t('main.simulate-btn') }}
            </button>
            <button
              :disabled="showMinMessage || showMaxMessage"
              class="btn btn-primary btn-lg btn-block d-lg-none"
              @click="activeDetailInfo=true; showSettingsView=false;">
              {{ $t('main.simulate-btn') }}
            </button>
          </div>
        </div>
        <div
          v-if="activeDetailInfo"
          class="cash-advance__summary col-lg-6 p-4 p-sm-5">
          <div v-if="!detailCash">
            <p
              class="h5 cash-advance__simulation__title mb-4 d-flex align-items-center text-primary">
              <button
                class="d-inline-block d-lg-none btn btn-link pl-0"
                @click="activeDetailInfo=false; showSettingsView=true;">
                <font-awesome-icon icon="arrow-left" />
              </button>
              {{ $t('main.simulation-summary.title') }}
            </p>

            <div class="d-flex justify-content-between">
              <p class="mb-0">
                {{ $t('main.simulation-summary.advance-total-cost') }}:
              </p>
              <p class="ml-3 mb-0">
                <strong>{{ advanceAmount | currency(currencyFormat) }}</strong>
              </p>
            </div>

            <div
              class="cash-advance__sumary-fees-container p-4 my-5 my-lg-4 d-flex justify-content-between rounded">
              <div
                v-if="payments > 1"
                class="cash-advance__sumary-fees-qtty p-2 p-lg-3 d-flex flex-column align-items-center">
                <p class="h1 text-primary mb-0">
                  {{ payments }}
                </p>
                <p class="mb-0 h6 font-weight-light">
                  {{ $t('main.simulation-summary.fees') }}
                </p>
              </div>
              <div
                v-else
                class="p-3 d-flex flex-column align-items-center">
                <p>
                  <i18n
                    path="main.simulation-summary.no-fees">
                    <br>
                  </i18n>
                </p>
              </div>
              <div class="d-flex flex-column justify-content-center text-right">
                <p class="text-primary d-none d-lg-block h3">
                  {{ monthlyAmount | currency(currencyFormat) }}
                </p>
                <p class="text-primary d-lg-none h5">
                  {{ monthlyAmount | currency(currencyFormat) }}
                </p>
                <p class="text-capitalize h6 font-weight-light">
                  {{ $t('main.simulation-summary.fee-value') }}
                </p>
              </div>
            </div>

            <div class="row text-center mb-4">
              <div class="col-6">
                <p class="mb-0 h5 font-weight-light">
                  <strong><span class="d-block">{{ rate }}%</span> {{ $t('main.simulation-summary.monthly') }}</strong>
                </p>
                <p class="mb-0">
                  {{ $t('main.resume-request.rate') }}
                </p>
              </div>
              <div class="col-6">
                <p class="mb-0 h5 font-weight-light">
                  <strong><span class="d-block">{{ cae }}%</span> {{ $t('main.simulation-summary.yearly') }}</strong>
                </p>
                <p class="mb-0">
                  {{ $t('main.simulation-summary.total-rate') }}
                </p>
              </div>
            </div>

            <div class="text-right d-none d-lg-block">
              <button
                class="btn mx-auto btn-link border-0 pr-0"
                @click="detailCash = true">
                {{ $t('main.simulation-summary.view-detail') }}
                <font-awesome-icon
                  icon="chevron-right"
                  class="ml-2" />
              </button>
            </div>

            <div class="d-lg-none mt-5">
              <button
                class="btn mx-auto btn-secondary btn-lg btn-block border-0 pr-0"
                @click="detailCash = true">
                {{ $t('main.simulation-summary.view-detail') }}
                <font-awesome-icon
                  icon="chevron-right"
                  class="ml-2" />
              </button>
            </div>

            <div class="pt-lg-4 text-center mt-3 mt-lg-4">
              <button
                class="btn btn-primary btn-lg btn-block">
                {{ $t('main.simulation-summary.complete-btn') }}
              </button>
            </div>
          </div>
          <div
            v-if="detailCash">
            <button
              class="btn btn-link mb-3 pl-0"
              @click="detailCash = false">
              <font-awesome-icon
                icon="chevron-left"
                class="mr-2" /> {{ $t('main.resume-request.view-resume') }}
            </button>
            <div class="mb-5 mt-lg-0 mb-lg-4">
              <div class="bg-white px-3 pt-3 pb-2 rounded">
                <div class="d-flex justify-content-between">
                  <strong>{{ $t('main.resume-request.advance-amount') }}</strong>
                  <span>{{ amount | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <strong>{{ $t('main.resume-request.fees') }}</strong>
                  <span>{{ payments }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <strong>{{ $t('main.resume-request.fee-value') }}</strong>
                  <span>{{ monthlyAmount | currency(currencyFormat) }}</span>
                </div>
              </div>
              <div class="bg-white px-3 pt-3 pb-2 rounded mt-3">
                <div class="d-flex justify-content-between">
                  <span>{{ $t('main.resume-request.tax') }}</span>
                  <span>{{ amount * 0.3 | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>{{ $t('main.resume-request.commission') }}</span>
                  <span>{{ amount * 0.15 | currency(currencyFormat) }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>{{ $t('main.resume-request.rate') }}</span>
                  <span>{{ rate }}%</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>{{ $t('main.resume-request.equivalent-anual-load-abbr') }}</span>
                  <span>{{ cae }}%</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>{{ $t('main.resume-request.to-account') }}</span>
                  <span class="text-capitalize text-right ">{{ account.accountType }}<br>
                    <strong>{{ account.accountNumber }}</strong>
                  </span>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12 col-lg-6 text-center text-lg-left">
                  <p class="cash-advance__simulator-details-total-credit-cost h5 text-primary">
                    {{ $t('main.resume-request.total-credit-cost') }}
                  </p>
                </div>
                <div class="col-12 col-lg-6 text-center text-lg-right font-weight-normal">
                  <p class="h5 text-primary">
                    {{ advanceAmount | currency(currencyFormat) }}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="btn btn-primary btn-lg btn-block mt-4">
              {{ $t('main.resume-request.make-advance-btn') }}
            </button>
          </div>
        </div>
        <div
          v-else-if="!showMaxMessage && !activeDetailInfo"
          class="col-lg-6 bg-tertiary-20 p-4 p-sm-5 d-none d-lg-flex align-items-center">
          <div>
            <span class="cash-advance__initial-msg-icon"><font-awesome-icon icon="arrow-circle-left" /></span>
            <i18n
              path="main.empty-message"
              tag="h4"
              class="font-weight-light">
              <strong class="text-primary font-weight-bold">{{ $t('main.empty-message-strong') }}</strong>
            </i18n>
          </div>
        </div>
        <div
          v-else-if="showMaxMessage"
          class="col-lg-6 bg-tertiary-20 p-4 p-sm-5 d-none d-lg-flex flex-column
          justify-content-center align-items-center">
          <h3 class="text-center">
            <font-awesome-icon
              icon="ban"
              class="cash-advance__max-amount-exceeded-icon d-block mx-auto mb-4" />
            <i18n
              path="main.amount-exceeds"
              tag="span">
              <br>
              <strong class="text-primary">{{ currency(advanceAvailableQuota, currencyFormat) }}</strong>
            </i18n>
          </h3>
          <i18n
            path="main.request-quota-increase-msg.start"
            tag="p"
            class="mt-5">
            <a
              href="#"
              class="cash-advance__request-quota-increase-link">{{ $t('main.request-quota-increase-msg.middle') }}
              <strong class="cash-advance__request-quota-increase-link-strong">
                {{ $t('main.request-quota-increase-msg.strong') }}
              </strong>
            </a>
          </i18n>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import VueSlider from 'vue-slider-component';
import { Money } from 'v-money-no-negative';
import { currency, getURLParams, MResponseControl } from '@modyo/financial-commons';
import debounce from './helpers';

export default {
  name: 'CashAdvanceApp',
  filters: {
    currency,
  },
  components: {
    MResponseControl,
    Multiselect,
    Money,
    VueSlider,
  },
  data() {
    return {
      amount: 0,
      payments: 6,
      paymentsSteps: [
        1,
        6,
        12,
        18,
        24,
        30,
        36,
      ],
      detailCash: false,
      account: null,
      card: null,
      showSettingsView: true,
      activeDetailInfo: false,
      currencyFormat: this.$t('currency.format'),
      apiStatus: false,
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },

    advanceAmount() {
      return this.$store.state.advanceAmount;
    },

    monthlyAmount() {
      return this.$store.state.monthlyAmount;
    },

    rate() {
      return this.$store.state.rate;
    },

    cae() {
      return this.$store.state.cae;
    },

    cards() {
      return this.$store.state.cards;
    },

    lang() {
      return this.$store.state.lang;
    },

    advanceUsedQuota() {
      if (this.lang === 'es-CL') {
        return this.card.advanceUsedQuotaCLP;
      }
      return this.card.advanceUsedQuotaUSD;
    },

    advanceAvailableQuota() {
      if (this.card) {
        if (this.lang === 'es-CL') {
          return this.card.advanceAvailableQuotaCLP;
        }
        return this.card.advanceAvailableQuotaUSD;
      }
      return 0;
    },

    paramClientId() {
      return this.$store.state.paramClientId;
    },

    minAmount() {
      if (this.lang === 'es-CL') {
        return 100000;
      }
      return 200;
    },

    showMinMessage() {
      return (this.amount < this.minAmount);
    },

    showMaxMessage() {
      if (this.card) return (this.amount > this.advanceAvailableQuota);
      return false;
    },

    isRangeDisabled() {
      return !(this.amount >= this.minAmount);
    },

    moneyOptions() {
      if (this.lang === 'es-CL') {
        return {
          prefix: '$',
          decimal: ',',
          thousands: '.',
          precision: 0,
          maxlength: this.amountMaxLength,
        };
      }
      return {
        prefix: '$',
        decimal: '.',
        thousands: ',',
        precision: 2,
        maxlength: this.amountMaxLength + 3, // Comma + 2 decimals digits
      };
    },
    amountMaxLength() {
      if (this.advanceAvailableQuota) {
        const availableBalanceLength = Math.round(parseFloat(this.advanceAvailableQuota)).toString().length;
        const dots = Math.round(availableBalanceLength / 3); // each thousands is a dot
        return availableBalanceLength + dots;
      }
      return 9;
    },
  },
  watch: {
    amount(newValue) {
      if (newValue < 0) this.amount = Math.abs(newValue);
      else if (newValue > this.advanceAvailableQuota) this.amount = Math.round(this.advanceAvailableQuota);
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    const client = parseInt(getURLParams('client'), 10) || 1;
    this.$store.commit('SET_PARAM_CLIENT_ID', client);
    this.$store.dispatch('DO_DATA_INITIALIZATION')
      .then(() => {
        this.apiStatus = false;
      })
      .catch(() => {
        this.apiStatus = 'hasError';
      });
  },
  methods: {
    currency,
    accountLabel(account) {
      return `${account.accountType} - ${account.accountNumber}`;
    },
    cardLabel(card) {
      return `${card.cardType} - ****${card.cardNumber.substr(-4, 4)}`;
    },
    calculateAdvance: debounce(function getLoan() {
      if (this.amount && this.payments) {
        const payload = {
          amount: this.amount,
          dues: this.payments,
        };
        this.$store.dispatch('GET_ADVANCE_DATA', payload)
          .catch(() => {
            this.apiStatus = 'hasError';
          });
      }
    }, 200),
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.multiselect .multiselect__placeholder,
.multiselect .multiselect__single,
.multiselect .multiselect__input {
  text-transform: capitalize;
}
@media (max-width: 575.98px) {
  .multiselect .multiselect__placeholder,
  .multiselect .multiselect__single,
  .multiselect .multiselect__input {
    font-size: .8rem;
  }
}
</style>

<style lang="scss" scoped>
@import "./scss/variables";

.cash-advance,
.cash-advance__container,
.cash-advance__row {
  height: 100%;
}

.cash-advance__summary {
  background-color: #fff;
}

.cash-advance__sumary-fees-container {
  background-color: $tertiary-20;
}

.cash-advance__sumary-fees-qtty {
  background-color: #fff;
}

.cash-advance__simulator-details-total-credit-cost {
  font-weight: bolder;
}

.cash-advance__initial-msg-icon {
  position: absolute;
  top: 50%;
  left: 0;

  display: flex;

  align-items: center;

  margin-top: -24px;
  margin-left: -24px;

  font-size: 48px;
  color: $primary-100;

  background-color: #fff;
  border-radius: 50%;
}

.cash-advance__max-amount-exceeded-icon {
  font-size: 5rem;
}

.cash-advance__request-quota-increase-link {
  color: inherit;
}

.cash-advance__request-quota-increase-link:hover,
.cash-advance__request-quota-increase-link:focus {
  color: inherit;
  text-decoration: none;

  .cash-advance__request-quota-increase-link-strong {
    color: $primary-dark;
  }
}

.cash-advance__request-quota-increase-link-strong {
  color: $primary;
  text-decoration: underline;
}

@media (min-width: 992px) {
  .cash-advance,
  .cash-advance__container,
  .cash-advance__row {
    height: auto;
  }

  .cash-advance__summary {
    background-color: $tertiary-20;
  }

  .cash-advance__sumary-fees-container {
    background-color: #fff;
  }

  .cash-advance__sumary-fees-qtty {
    background-color: transparent;
    border: 1px solid $primary-10;
  }

  .cash-advance__simulator-details-total-credit-cost {
    font-weight: 500;
  }
}
</style>
