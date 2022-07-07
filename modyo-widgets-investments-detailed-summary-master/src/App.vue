<template id="detailed-summary-app-template">
  <div
    id="detailed-summary"
    class="py-lg-5">
    <div class="detailed-summary__container container-lg p-0">
      <div class="row no-gutters">
        <div class="col-lg-3 px-4 pt-4 p-xl-5">
          <ul class="detailed-summary__nav nav nav-tabs flex-lg-column justify-content-between text-left">
            <li class="detailed-summary__nav-item nav-item flex-fill">
              <a
                :class="statusTab === 'perAccount' ? 'active' : false"
                class="detailed-summary__nav-link nav-link d-flex justify-content-center
                justify-content-lg-between align-items-center px-1 px-lg-3 py-3"
                @click="statusTab = 'perAccount'">
                <span>{{ $t('main.filters.per-account') }}</span>
                <font-awesome-icon
                  class="d-none d-lg-block"
                  icon="chevron-right"
                  size="sm" />
              </a>
            </li>
            <li class="detailed-summary__nav-item nav-item mt-lg-2 flex-fill">
              <a
                :class="statusTab === 'perProduct' ? 'active' : false"
                class="detailed-summary__nav-link nav-link d-flex justify-content-center
                justify-content-lg-between align-items-center px-1 px-lg-3 py-3"
                @click="statusTab = 'perProduct'">
                <span>{{ $t('main.filters.per-product') }}</span>
                <font-awesome-icon
                  class="d-none d-lg-block"
                  icon="chevron-right"
                  size="sm" />
              </a>
            </li>
            <li class="detailed-summary__nav-item nav-item mt-lg-2 flex-fill">
              <a
                :class="statusTab === 'perMoney' ? 'active' : false"
                class="detailed-summary__nav-link nav-link d-flex justify-content-center
                justify-content-lg-between align-items-center px-1 px-lg-3 py-3"
                @click="statusTab = 'perMoney'">
                <span>{{ $t('main.filters.per-currency') }}</span>
                <font-awesome-icon
                  class="d-none d-lg-block"
                  icon="chevron-right"
                  size="sm" />
              </a>
            </li>
          </ul>
        </div>
        <m-response-control
          v-if="apiStatus"
          class="text-center detailed-summary__content col-lg-9 p-4 p-xl-5 mx-4 mx-lg-auto mb-4 mb-lg-0"
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
          class="detailed-summary__content col-lg-9 p-4 p-xl-5 mx-4 mx-lg-auto mb-4 mb-lg-0">
          <div
            v-if="statusTab === 'perAccount'"
            id="accordion"
            role="tablist">
            <summary-accordion
              v-for="account in accounts"
              :key="account.id"
              :item="account"
              :tab="statusTab" />
          </div>
          <div
            v-if="statusTab === 'perProduct'"
            id="accordion"
            role="tablist">
            <summary-accordion
              v-for="product in products"
              :key="product.id"
              :item="product"
              :tab="statusTab" />
          </div>
          <div
            v-if="statusTab === 'perMoney'"
            id="accordion"
            role="tablist">
            <summary-accordion
              v-for="currency in currencies"
              :key="currency.name"
              :item="currency"
              :tab="statusTab" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MResponseControl } from '@modyo/financial-commons';
import summaryAccordion from './components/summaryAccordion.vue';

export default {
  name: 'DetailedSummary',
  components: {
    'summary-accordion': summaryAccordion,
    MResponseControl,
  },
  data() {
    return {
      statusTab: 'perAccount',
      apiStatus: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    accounts() {
      return this.$store.state.accountsData.accounts;
    },
    products() {
      return this.$store.state.productsData.products;
    },
    currencies() {
      return this.$store.state.currenciesData.currencies;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.apiStatus = 'isLoading';
      this.$store.dispatch('FETCH_DATA')
        .then(() => {
          this.apiStatus = false;
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

#detailed-summary {
  min-height: 100%;

  background-color: #fff;
}

.detailed-summary__content {
  background-color: $tertiary-20;
}

.detailed-summary__nav-item {
  cursor: pointer;
}

.detailed-summary__nav {
  border: none;

  .detailed-summary__nav-link {
    border: none;

    &:hover,
    &:focus {
      background: $tertiary-40;
    }

    &.active {
      background-color: $tertiary-20;
    }

    small {
      color: $primary-60;
    }
  }
}

@media (min-width: 992px) {
  #detailed-summary {
    min-height: auto;

    background-color: transparent;

    .detailed-summary__container {
      min-height: auto;

      background-color: #fff;
    }
  }

  .detailed-summary__nav {
    .detailed-summary__nav-link {
      background-color: $primary-10;
      border: 1px solid $primary-10;
      border-radius: .35rem;

      &:hover,
      &:focus {
        background: $primary-20;
      }

      &.active {
        color: #fff;

        background-color: $primary;
      }
    }
  }
}
</style>
