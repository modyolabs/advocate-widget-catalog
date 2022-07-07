<template>
  <div
    id="general-summary"
    class="general-summary container-lg p-4 p-lg-5">
    <div class="general-summary-wrapper px-sm-4 p-lg-5">
      <m-response-control
        v-if="apiStatus"
        class="accounts__container container-lg text-center py-5"
        :status="apiStatus">
        <template #loading>
          <div
            class="loading spinner-border"
            role="status">
            <span class="sr-only">Loading...</span>
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
        v-else>
        <div>
          <div
            class="general-summary-tabs-slide"
            :class="evolutionSlide ? 'd-none' : 'd-block'">
            <div class="d-flex justify-content-between flex-column flex-sm-row">
              <h1 class="h5 mb-0 d-none d-sm-block">
                {{ $t('main.title') }}
              </h1>
              <div class="text-sm-right pt-lg-0">
                <h2 class="mb-0 text-primary h4">
                  {{ total.amount.originValue | currency(getCurrencyFormat(total.amount)) }}
                </h2>
                <p class="mb-0 text-muted">
                  {{ $t('main.total-legacy-lbl') }}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <div class="d-sm-flex justify-content-between">
                <ul class="general-summary__nav-tabs nav nav-tabs justify-content-between">
                  <li class="nav-item general-summary__nav-item flex-fill text-center text-sm-left">
                    <a
                      :class="main.activeTab === 'perGroup' ? 'active' : false"
                      href="#"
                      class="general-summary__nav-link nav-link px-2 p-sm-3"
                      @click.prevent="changeSummaryTab('perGroup')">
                      {{ $t('main.summary-tabs.per-group') }}
                    </a>
                  </li>
                  <li class="nav-item general-summary__nav-item flex-fill text-center text-sm-left">
                    <a
                      :class="main.activeTab === 'perProduct' ? 'active' : false"
                      href="#"
                      class="general-summary__nav-link nav-link px-2 p-sm-3"
                      @click.prevent="changeSummaryTab('perProduct')">
                      {{ $t('main.summary-tabs.per-product') }}
                    </a>
                  </li>
                  <li class="nav-item general-summary__nav-item flex-fill text-center text-sm-left">
                    <a
                      :class="main.activeTab === 'perCurrency' ? 'active' : false"
                      href="#"
                      class="general-summary__nav-link nav-link px-2 p-sm-3"
                      @click.prevent="changeSummaryTab('perCurrency')">
                      {{ $t('main.summary-tabs.per-currency') }}
                    </a>
                  </li>
                </ul>
                <a
                  class="d-none d-md-flex btn btn-link align-items-center pr-0"
                  href="#"
                  @click="evolutionSlide = true">
                  <strong>
                    {{ $t('main.view-investment-evolution-btn') }}
                    <font-awesome-icon
                      icon="chevron-right"
                      size="xs"
                      class="ml-2" />
                  </strong>
                </a>
              </div>

              <div>
                <main-resume
                  v-if="main.activeTab === 'perGroup'"
                  :items="accounts"
                  :tab-type="main.activeTab" />
                <main-resume
                  v-if="main.activeTab === 'perProduct'"
                  :items="products"
                  :tab-type="main.activeTab" />
                <main-resume
                  v-if="main.activeTab === 'perCurrency'"
                  :items="currencies"
                  :tab-type="main.activeTab" />
              </div>
            </div>
            <a
              class="d-flex d-md-none btn btn-link align-items-center justify-content-center mt-3"
              href="#"
              @click="evolutionSlide = true">
              <strong>
                {{ $t('main.view-investment-evolution-btn') }}
                <font-awesome-icon
                  icon="chevron-right"
                  size="xs"
                  class="ml-2" />
              </strong>
            </a>
          </div>

          <div :class="evolutionSlide ? 'd-block' : 'd-none'">
            <h3 class="h5 mb-4 text-primary">
              {{ $t('investment-evolution.title') }}
            </h3>
            <div class="d-sm-flex align-items-center justify-content-between">
              <a
                href="#"
                @click="evolutionSlide = false">
                <font-awesome-icon
                  size="sm"
                  icon="chevron-left"
                  class="mr-1" />
                {{ $t('main.back-to-resume-btn') }}</a>
              <ul class="general-summary__nav-tabs nav nav-tabs justify-content-between mt-3 mt-sm-0">
                <li class="general-summary__nav-item nav-item flex-fill">
                  <a
                    class="nav-link general-summary__nav-link px-3 p-sm-3"
                    :class="evolutionTabs.activeTab === 'monthly-evolution' ? 'active' : false"
                    href="#"
                    @click.prevent="changeEvolutionTab('monthly-evolution')">
                    {{ $t('investment-evolution.filter.montly') }}
                  </a>
                </li>
                <li class="general-summary__nav-item nav-item flex-fill">
                  <a
                    class="nav-link general-summary__nav-link px-3 p-sm-3"
                    :class="evolutionTabs.activeTab === 'annualy-evolution' ? 'active' : false"
                    href="#"
                    @click.prevent="changeEvolutionTab('annualy-evolution')">
                    {{ $t('investment-evolution.filter.yearly') }}
                  </a>
                </li>
              </ul>
            </div>
            <div
              v-if="!loadingEvolution"
              class="general-summary__evolution bg-tertiary-20 rounded-bottom"
              :class="{
                'first-tab-selected': evolutionTabs.activeTab==='monthly-evolution',
                'last-tab-selected': evolutionTabs.activeTab==='annualy-evolution'
              }">
              <keep-alive>
                <component
                  :is="evolutionTabs.activeTab"
                  :monthly="monthly"
                  :annualy="annualy" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { currency, MResponseControl } from '@modyo/financial-commons';
import { getCurrencyFormat } from './helpers';
import mainResume from './components/mainResume.vue';
import monthlyEvolution from './components/monthlyEvolution.vue';
import annualyEvolution from './components/annualyEvolution.vue';

export default {
  name: 'GeneralSummary',
  components: {
    mainResume,
    monthlyEvolution,
    annualyEvolution,
    MResponseControl,
  },
  filters: {
    currency,
  },
  data() {
    return {
      loadingEvolution: true,
      evolutionSlide: false,
      evolutionTabs: {
        activeTab: 'monthly-evolution',
      },
      apiStatus: false,
    };
  },

  computed: {
    total() {
      return this.$store.getters.total;
    },
    accounts() {
      return this.$store.getters.accounts;
    },
    products() {
      return this.$store.getters.products;
    },
    currencies() {
      return this.$store.getters.currencies;
    },
    annualy() {
      return this.$store.getters.annualy;
    },
    monthly() {
      return this.$store.getters.monthly;
    },

    ...mapState(['main']),
  },
  created() {
    this.fetchData();
  },

  methods: {
    getCurrencyFormat,
    fetchData() {
      this.apiStatus = 'isLoading';
      this.$store.dispatch('GET_SUMMARY')
        .then(() => {
          this.apiStatus = false;
        }).catch(() => {
          this.apiStatus = 'hasError';
        });

      this.$store.dispatch('GET_EVOLUTION')
        .then(() => {
          this.apiStatus = false;
          this.loadingEvolution = false;
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
    changeTabAnually(tab) {
      this.anuallyTab.active = tab;
    },
    changeTabMonthly(tab) {
      this.monthlyTab.active = tab;
    },
    changeSummaryTab(tab) {
      this.main.activeTab = tab;
      this.main.responsiveTabOpen = false;
    },
    changeEvolutionTab(tab) {
      this.evolutionTabs.activeTab = tab;
      this.evolutionTabs.responsiveTabOpen = false;
    },
    triggerPageAdvance(direction) {
      if (direction) {
        this.$refs.carousel.advancePage(direction);
      } else {
        this.$refs.carousel.advancePage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

#general-summary {
  height: 100%;

  background-color: #fff;
}

.nav-tabs {
  border-bottom: none;

  .nav-link {
    border: 0;

    &.active {
      background-color: $tertiary-20;
    }
  }
}

.general-summary__nav-link {
  transition: all .4s ease-out;

  &:hover,
  &:focus {
    background-color: $tertiary-10;
  }
}

.general-summary__evolution {
  border-top-left-radius: .35rem;
  border-top-right-radius: .35rem;

  &.last-tab-selected {
    border-top-right-radius: 0;
  }
}

@media (max-width: 319.98px) {
  #general-summary {
    height: auto;
  }

  .general-summary__nav-link {
    padding: .5rem .25rem;

    font-size: .8rem;
  }
}

@media (max-width: 575.98px) {
  .general-summary__evolution {
    &.first-tab-selected {
      border-top-left-radius: 0;
    }
  }
}

@media (min-width: 992px) {
  #general-summary {
    height: auto;

    background-color: transparent;
  }

  .general-summary-wrapper {
    background-color: #fff;
  }
}
</style>
