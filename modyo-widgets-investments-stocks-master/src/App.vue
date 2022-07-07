<template>
  <div
    id="stocks-app"
    class="stocks pt-4 py-lg-5">
    <div class="stocks__container container-lg d-flex flex-column p-0">
      <ul class="stocks__nav nav nav-tabs justify-content-between justify-content-lg-start border-bottom px-4 mt-lg-3">
        <li class="nav-item text-center">
          <a
            class="nav-link px-4 py-2 h-100 d-flex align-items-center justify-content-center"
            href="#">{{ $t('main.mutual-funds-link') }}</a>
        </li>
        <li class="nav-item text-center">
          <a
            class="nav-link px-4 py-2 active h-100 d-flex align-items-center justify-content-center"
            href="#">{{ $t('main.title') }}</a>
        </li>
      </ul>
      <div class="row no-gutters stocks__row">
        <stocks-list
          :all-stocks="stocks"
          :api-status="apiStatus"
          :class="selectedStock ? 'd-none d-lg-block' : false" />
        <stocks-details
          :class="selectedStock ? false : 'd-none d-lg-block'" />
      </div>
    </div>
    <stocks-buy />
    <stocks-sell />
  </div>
</template>

<script>
import stocksList from './components/stocksList.vue';
import stocksDetails from './components/stocksDetails.vue';
import stocksBuy from './components/stocksBuy.vue';
import stocksSell from './components/stocksSell.vue';

export default {
  name: 'InvestmentStocks',
  components: {
    'stocks-list': stocksList,
    'stocks-details': stocksDetails,
    'stocks-buy': stocksBuy,
    'stocks-sell': stocksSell,
  },
  data() {
    return {
      apiStatus: false,
    };
  },
  computed: {
    stocks() {
      return this.$store.state.stocks;
    },
    selectedStock() {
      return this.$store.state.selectedStock;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.apiStatus = 'isLoading';
      this.$store.dispatch('GET_STOCKS')
        .then((payload) => {
          this.apiStatus = payload.length > 0 ? false : 'isEmpty';
        }).catch(() => {
          this.apiStatus = 'hasError';
        });
    },
  },
};
</script>

<style lang="css" src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.stocks {
  min-height: 100%;

  background-color: #fff;
}

.stocks__nav {
  .nav-item {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .stocks {
    background-color: transparent;
  }

  .stocks__nav {
    .nav-item {
      width: auto;
    }
  }

  .stocks,
  .stocks__container,
  .stocks__row {
    height: 100%;
    overflow-y: hidden;
  }

  .stocks__container {
    background-color: #fff;
  }
}
</style>
