<template>
  <div
    :class="bill.company"
    class="card mb-3 bill__item">
    <div
      :id="`billHeader${bill.id}`"
      class="d-flex overflow-auto">
      <button
        id="billItem"
        class="p-3 border-0 bill__header bg-white rounded flex-grow-1"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#billInfo${bill.id}`"
        aria-expanded="true"
        :aria-controls="`billInfo${bill.id}`">
        <div class="d-flex align-items-center">
          <div class="circle-bill-icon me-3">
            <font-awesome-icon
              class="text-primary"
              :icon="bill.category.icon"
              size="lg" />
          </div>
          <div class="text-capitalize d-flex flex-column text-start flex-grow-1 gap-1">
            <div class="text-truncate mb-0 text-primary h6">
              {{ bill.company.name }}<span class="text-secondary d-none d-lg-inline"> - {{ bill.alias }}</span>
            </div>
            <div class="text-truncate mb-0 text-secondary h6 d-block d-lg-none">
              {{ bill.alias }}
            </div>
            <small class="payment-info">
              N° {{ $t('bill.client') }}: {{ bill.clientNumber }}
            </small>
          </div>
        </div>
      </button>
      <div
        v-if="bill.isScheduled"
        class="d-flex flex-column justify-content-center text-end mx-4 text-nowrap">
        <div class="small">
          {{ $t('payment.date') }}
        </div>
        <div class="text-primary fw-500">
          {{ $t('payment.scheduled', {day: paymentDate}) }}
        </div>
      </div>
      <button
        v-else
        class="border-0 bg-white rounded mx-4">
        <div
          v-if="!bill.isPaid"
          id="billAmount"
          class="transaction__amount badge px-3 py-2 fw-normal"
          :class="[bill.inCart ? 'bg-active': 'bg-primary']"
          @click="addToCart">
          <span
            :class="[bill.inCart ? 'text-white': 'text-tertiary']">$</span>
          {{ bill.amount }}
        </div>
        <div
          v-else
          id="billAmount"
          class="transaction__amount badge px-3 py-2 fw-normal bg-active">
          {{ $t('bill.paid') }}
        </div>
      </button>
    </div>

    <div
      :id="`billInfo${bill.id}`"
      class="card-collapse collapse border-top bill__content"
      aria-labelledby="`billHeader${bill.id}`"
      data-bs-parent="#billList">
      <div class="transacion__body p-3">
        <div
          v-if="bill.isScheduled"
          class="d-flex text-primary justify-content-between pb-3">
          <div>
            <div class="fw-bold">
              {{ $t('payment.from') }}
            </div>
            <div class="fs-7">
              {{ $t('account.transaction') }} Nº 2934809849
            </div>
          </div>
          <div>
            <div class="fw-bold">
              {{ $t('payment.maximum') }}
            </div>
            <div class="fs-7">
              {{ bill.maxAmount | currency(currencyFormatDebt) }}
            </div>
          </div>
          <div>
            <div class="fw-bold">
              {{ $t('payment.end-date') }}
            </div>
            <div class="fs-7">
              {{ transactionDateFilter }}
            </div>
          </div>
        </div>

        <div class="h6 text-primary py-2 d-none d-lg-block">
          {{ $t('bill.history.title') }}
        </div>

        <div class="d-flex flex-column flex-lg-row">
          <div class="order-1 order-lg-0 flex-grow-1 pe-0 pe-lg-4">
            <div class="h6 text-primary py-3 m-0 d-block d-lg-none">
              {{ $t('bill.history.title') }}
            </div>
            <div class="border rounded overflow-auto ">
              <table class="table table-borderless">
                <thead class="bill-history-head">
                  <tr>
                    <td>{{ $t('bill.history.date') }}</td>
                    <td>{{ $t('bill.history.amount') }}</td>
                    <td>{{ $t('bill.history.operation') }}</td>
                  </tr>
                </thead>
                <tbody class="bill-history-body">
                  <tr>
                    <td class="">
                      05/05/2021
                    </td>
                    <td class="text-primary">
                      $25.000
                    </td>
                    <td class="">
                      13241231
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="d-flex flex-lg-column flex-row justify-content-between gap-3">
            <button class="btn border action">
              <font-awesome-icon
                class="me-2"
                icon="pen"
                size="sm" />
              {{ $t('actions.edit-bill') }}
            </button>
            <button
              class="btn border action"
              @click="deleteBill">
              <font-awesome-icon
                class="me-2"
                icon="trash"
                size="sm" />
              {{ $t('actions.delete-bill') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@modyo/financial-commons';

export default {
  name: 'AccountItem',
  filters: {
    currency,
  },
  props: {
    bill: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      date: this.$t('date.format'),
    };
  },
  computed: {
    paymentDate() {
      return new Date(this.bill.paymentDate).getUTCDate();
    },
    lang() {
      return this.$store.state.lang === 'es' ? 'spanish' : 'english';
    },
    transactionDateFilter() {
      return this.bill.endDate;
    },
    currencyFormatDebt() {
      return this.selectedDebt === 'national' ? this.$t('currency.format') : this.$t('currency.format', 'en-US');
    },
  },
  methods: {
    addToCart() {
      const updatedBill = this.bill;
      updatedBill.inCart = !updatedBill.inCart;
      const bills = [...this.$store.state.bills];
      bills[this.index] = updatedBill;
      this.$store.commit('UPDATE_BILLS', bills);
    },
    deleteBill() {
      const bills = [...this.$store.state.bills];
      bills.splice(this.index, 1);
      if (bills.length === 0) this.$store.commit('SET_ACTIVE_TAB', 'addAccount');
      this.$store.commit('UPDATE_BILLS', bills);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.bill__item {
  border: 1px solid #ebedef;
  border-radius: 8px;
}

.action {
  flex: 1;
}

.accordion > .transaction.card {
  margin-bottom: 10px;

  border: 0;
  border-radius: 10px;
}

.bill__header {
  background-color: #fff;
  border-color: $secondary-20;
}

.transacion__body {
  h6 {
    font-size: 14px;
    color: $primary-80;
  }

  p {
    color: $primary-80;
  }
}

.fs-7 {
  font-size: 14px;
}

.payment-info {
  font-size: 12px;
}

.fw-500 {
  font-weight: 500;
}

.text-tertiary {
  color: $tertiary;
}

.bill-history-head {
  font-size: 12px;
  font-weight: 700;
  color: $primary-80;
}

.bill-history-body {
  font-size: 12px;
  color: $primary-60;
}

#billItem::after {
  content: none;
}

.circle-bill-icon {
  display: inline-block;

  width: 40px;
  height: 40px;

  line-height: 40px;
  text-align: center;

  background: $tertiary-20;
  border-radius: 50%;
}

.bg-active {
  background: $primary-40;
}
</style>
