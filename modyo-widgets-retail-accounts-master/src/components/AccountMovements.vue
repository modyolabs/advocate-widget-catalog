<template>
  <div
    class="account__movements col-12 col-lg-7 h-100 overflow-hidden"
    :class="{ 'active' : showMovements }">
    <div class="account__movements-wrapper d-flex flex-column h-100 pb-4">
      <div class="account__movements-header shadow-sm d-lg-none px-2 py-3">
        <p class="font-weight-bold text-primary text-center mb-0 position-relative">
          <button
            class="account__movements-close btn btn-link"
            @click="showMovements = false">
            <font-awesome-icon icon="arrow-left" />
          </button>
          {{ $t('account.view-transactions') }}
        </p>
      </div>

      <div
        class="account__movements-tabs mx-auto px-4 pt-4 mb-3 px-lg-0">
        <ul class="list-group list-group-horizontal text-center">
          <li
            role="button"
            class="list-group-item list-group-item-action font-weight-light px-0"
            :class="{active: activeTab === 'movements'}"
            @click.prevent="activeTab = 'movements'">
            {{ $t('transactions-list.transactions') }}
          </li>
          <li
            role="button"
            class="list-group-item list-group-item-action font-weight-light"
            :class="{active: activeTab === 'statements'}"
            @click.prevent="activeTab = 'statements'">
            {{ $t('transactions-list.statements') }}
          </li>
        </ul>
      </div>
      <m-response-control
        v-if="apiStatus"
        class="accounts__container container-lg text-center py-5"
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
        :class="activeTab"
        class="account__movements-list px-4 px-xl-5">
        <transactions-list />
      </div>
    </div>
  </div>
</template>

<script>
import { MResponseControl } from '@modyo/financial-commons';
import { subDays } from 'date-fns';
import TransactionsList from './TransactionsList.vue';

export default {
  name: 'AccountMovements',
  components: {
    TransactionsList,
    MResponseControl,
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.activeTab;
      },
      set(value) {
        return this.$store.commit('SET_ACTIVE_TAB', value);
      },
    },

    apiStatus() {
      return this.$store.state.apiStatus;
    },

    // isLoadingAccounts() {
    //   return this.$store.state.isLoadingCards;
    // },

    // isLoadingTransactions() {
    //   return this.$store.state.isLoadingTransactions;
    // },

    showMovements: {
      get() {
        return this.$store.state.showMovements;
      },
      set(val) {
        this.$store.commit('SET_SHOW_MOVEMENTS', val);
      },
    },
  },
  watch: {
    activeTab() {
      this.$store.commit('SET_FROM_DATE', subDays(new Date(), 20));
      this.$store.commit('SET_TO_DATE', new Date());
      if (this.activeTab === 'movements') {
        this.$store.dispatch('GET_TRANSACTIONS');
      } else if (this.activeTab === 'statements') {
        this.$store.dispatch('GET_STATEMENTS');
      }
    },
  },
};

</script>

<style lang="scss" scoped>
@import "../scss/variables";

.account__movements {
  background-color: $tertiary-20;
}

.account__movements-tabs {
  width: 100%;

  .list-group-item {
    font-size: 14px;
  }
}

.account__movements-list {
  height: 100%;
  overflow: hidden;
}

@media (max-width: 991.98px) {
  .account__movements {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;

    width: 100%;

    transition: all .2s ease-in-out;
    transform: translateX(100%);

    &.active {
      transform: translateX(0);
    }
  }

  .account__movements-header {
    background: #fff;

    p {
      font-size: 18px;
    }

    button {
      position: absolute;
      top: -4px;
      left: 0;
    }
  }
}

@media (min-width: 992px) {
  .account__movements-tabs {
    width: 60%;
  }
}

</style>
