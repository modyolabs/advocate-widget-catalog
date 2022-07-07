<template>
  <div class="row h-100">
    <div
      class="account__movements col-12 col-lg-8 px-4">
      <div class="d-flex flex-column pb-4">
        <div
          class="account__movements-tabs mb-3 mt-5 px-lg-0">
          <ul class="list-group list-group-horizontal text-center">
            <li
              role="button"
              class="list-group-item list-group-item-action px-2 py-3"
              :class="{active: activeTab === 'accounts', 'disabled no-accounts': bills.length === 0}"
              @click.prevent="activeTab = 'accounts'">
              {{ $t('tab.bills') }}
            </li>
            <li
              role="button"
              class="list-group-item list-group-item-action px-2 py-3"
              :class="{active: activeTab === 'addAccount'}"
              @click.prevent="activeTab = 'addAccount'">
              {{ $t('tab.add-bill') }}
            </li>
          </ul>
        </div>
        <accounts-list v-if="activeTab === 'accounts' " />
        <new-bill v-if="activeTab === 'addAccount'" />
      </div>
    </div>
    <div
      class="col-12 col-lg-4 px-4 bg-white bill__cart">
      <bill-cart />
    </div>
  </div>
</template>

<script>
import AccountsList from './AccountsList.vue';
import NewBill from './NewBill.vue';
import BillCart from './BillCart.vue';

export default {
  name: 'BillSummary',
  components: {
    AccountsList,
    NewBill,
    BillCart,
  },
  computed: {
    activeTab: {
      get() {
        return this.bills.length === 0 ? 'addAccount' : this.$store.state.activeTab;
      },
      set(value) {
        return this.$store.commit('SET_ACTIVE_TAB', value);
      },
    },
    bills() {
      return this.$store.state.bills;
    },
  },
  watch: {
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
.list-group-item.active {
  background-color: $secondary-100;
  border-color: $secondary-100;
}
.list-group-item:not(.active) {
  color: $secondary-100;
}
.no-accounts {
  opacity: .4;
}

@media (max-width: 991.98px) {
  .bill__cart {
    position: fixed;
    bottom: 0;
  }
}

@media (min-width: 992px) {
  .account__movements-tabs {
    width: 60%;
  }
}

</style>
