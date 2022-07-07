<template>
  <div>
    <div class="d-none d-lg-flex flex-column mx-4 my-5">
      <div
        class="fs-5 fw-500 text-primary py-3">
        {{ $t('bill.resume') }}
      </div>
      <div
        v-if="billsAdded.length === 0"
        class="m-auto py-5">
        <div class="border rounded-circle p-5">
          <font-awesome-icon
            class="mx-2 fa-3x primary-20"
            icon="receipt" />
        </div>
      </div>

      <div
        v-else
        class="">
        <div
          v-for="(bill, index) in billsAdded"
          :key="index">
          <div
            class="d-flex align-items-center justify-content-between py-2 border-bottom"
            :class="{'border-top': index == 0 }">
            <div class="">
              <div class="fw-500 text-primary">
                {{ bill.company.name }}
              </div>
              <div class="">
                {{ bill.alias }}
              </div>
              <div class="bill-client__id">
                N° {{ $t('bill.client') }}: {{ bill.clientNumber }}
              </div>
            </div>
            <div>
              $ <span class="text-primary fw-500">{{ bill.amount }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between py-2 border-bottom mb-2">
          <div
            class="text-uppercase text-primary">
            {{ $t('bill.total') }}
          </div>
          <div>
            $ <span class="text-primary fw-500">{{ totalBills }}</span>
          </div>
        </div>
        <multiselect
          v-model="accountType"
          :options="accounts"
          :placeholder="$t('bill.pay-from')"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          :searchable="true" />
      </div>
      <div>
        <button
          :disabled="!billsAdded || !accountType"
          class="btn btn-primary w-100 my-3 text-uppercase payment__button py-3"
          @click="handleClick">
          {{ $t('actions.pay-button') }}
        </button>
      </div>
    </div>
    <div
      class="d-flex d-lg-none my-2 align-items-center"
      :class="{'d-none' : activeTab === 'addAccount'}">
      <div class="flex-grow-1">
        TOTAL: <b>{{ totalBills }}</b>
      </div>
      <div>
        <button
          :disabled="billsAdded.length === 0"
          class="btn btn-primary my-3 text-uppercase payment__button py-3 px-5"
          @click="handleClickMobile">
          {{ $t('actions.pay-button') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'BillCart',
  components: {
    Multiselect,
  },
  data() {
    return {
      accountType: '',
    };
  },
  computed: {
    activeTab() {
      return this.$store.state.activeTab;
    },
    accounts() {
      return this.$store.state.accounts;
    },
    bills() {
      return this.$store.state.bills;
    },
    billsAdded() {
      return this.bills.filter((bill) => bill.inCart);
    },
    totalBills() {
      return this.billsAdded.reduce((total, bill) => total + bill.amount, 0);
    },
  },
  watch: {
  },
  methods: {
    handleClick() {
      this.$store.commit('SET_STEP_ACTION', 'confirm');
    },
    handleClickMobile() {
      this.$store.commit('SET_STEP_ACTION', 'selectAccount');
    },
  },
};

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables";

.fw-500 {
  font-weight: 500;
}
.bill-client__id {
  font-size: 14px;
}
.primary-20 {
  color: $primary-20;
}
.payment__button {
  font-size: 12px;
}
</style>
