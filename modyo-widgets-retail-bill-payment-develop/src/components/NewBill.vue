<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{invalid}"
      tag="form"
      @submit.prevent="validateBeforeSubmit">
      <div class="row mx-lg-5">
        <div class="d-block d-lg-none text-primary h5 pt-2">
          {{ $t('actions.add-account') }}:
        </div>
        <div class="col-12 col-lg-6 py-3 order-0 order-lg-0">
          <validation-provider
            v-slot="{errors, touched}"
            rules="required"
            tag="div">
            <multiselect
              v-model="category"
              :options="categories"
              :close-on-select="true"
              :show-labels="false"
              :allow-empty="false"
              track-by="name"
              label="name"
              :placeholder="$t('account.category-placeholder')"
              :searchable="true">
              <template
                v-slot:singleLabel="slotProps">
                <span class="circle-bill-icon">
                  <font-awesome-icon
                    class=""
                    :icon="slotProps.option.icon"
                    size="sm" />
                </span>
                <span>{{ slotProps.option.name }}</span>
              </template>
              <template
                v-slot:option="slotProps">
                <span class="circle-bill-icon">
                  <font-awesome-icon
                    class=""
                    :icon="slotProps.option.icon"
                    size="sm" />
                </span>
                <span>{{ slotProps.option.name }}</span>
              </template>
            </multiselect>
            <span
              v-show="invalid && touched"
              class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="col-12 col-lg-6 py-3 order-2 order-lg-1">
          <validation-provider
            v-slot="{errors, touched, classes}"
            rules="required"
            tag="div">
            <input
              v-model.lazy="clientNumber"
              type="number"
              :name="$t('account.client-number')"
              class="bg-white py-2 border"
              :class="{'form-control': true, 'is-invalid': errors.length>0 && touched, ...classes}"
              maxlength="40"
              :placeholder="$t('account.client-number')">
            <span
              v-show="invalid && touched"
              class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="col-12 col-lg-6 py-3 order-1 order-lg-2">
          <validation-provider
            v-slot="{errors, touched, classes}"
            rules="required"
            tag="div">
            <multiselect
              v-model="company"
              :options="companies"
              :close-on-select="true"
              :show-labels="false"
              :allow-empty="false"
              track-by="name"
              label="name"
              :class="{'is-invalid': invalid && touched, ...classes}"
              :placeholder="$t('account.company-placeholder')"
              :searchable="true" />
            <span
              v-show="invalid && touched"
              class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="col-12 col-lg-6 py-3 order-3 order-lg-3">
          <validation-provider
            v-slot="{errors, touched, classes}"
            rules="required"
            tag="div">
            <input
              v-model="alias"
              type="text"
              class="py-2 border bg-white"
              autocomplete="off"
              :name="$t('account.alias')"
              :class="{'form-control': true, 'is-invalid': errors.length>0 && touched, ...classes}"
              maxlength="120"
              :placeholder="$t('account.alias')">
            <span
              v-show="invalid && touched"
              class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="col-12 col-lg-6 order-4 py-3 d-flex align-items-center justify-content-between">
          <span
            class="pe-2 schedule-switch">
            {{ $t('bill.schedule') }}
          </span>
          <div class="form-check form-switch mb-0">
            <input
              id="flexSwitchCheckDefault"
              v-model="scheduled"
              class="form-check-input fs-4"
              type="checkbox">
          </div>
        </div>
      </div>
      <div
        v-if="scheduled"
        class="row mx-lg-5">
        <div class="col-12 col-lg-6 py-3 order-0 order-lg-0">
          <vue-date-picker
            v-model="paymentDate"
            color="#2e4553"
            class="bg-white rounded border"
            :name="$t('payment.date')"
            placeholder="Choose date"
            fullscreen-mobile
            validate>
            <template #activator="{ date }">
              <button
                ref="activator"
                class="filters-date__btn btn d-flex align-items-center flex-fill p-2 fs-7"
                :class="!date && 'placeholder-date'"
                type="button">
                <div class="flex-grow-1 text-start">
                  {{ date || $t('payment.date') }}
                </div>
                <font-awesome-icon
                  icon="calendar"
                  class="me-2" />
              </button>
            </template>
          </vue-date-picker>
        </div>
        <div class="col-12 col-lg-6 py-3 order-2 order-lg-1">
          <multiselect
            v-model="payFrom"
            :options="accounts"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :placeholder="$t('bill.pay-from')"
            :searchable="true" />
        </div>
        <div class="col-12 col-lg-6 py-3 order-1 order-lg-2">
          <vue-date-picker
            v-model="endDate"
            color="#2e4553"
            class="bg-white rounded border"
            :name="$t('payment.end-date')"
            :min-date="paymentDate"
            placeholder="Choose date"
            fullscreen-mobile
            :disabled="!paymentDate"
            validate>
            <template #activator="{ date }">
              <button
                ref="activator"
                class="filters-date__btn btn d-flex align-items-center flex-fill p-2 fs-7"
                :class="!date && 'placeholder-date'"
                type="button">
                <div class="flex-grow-1 text-start">
                  {{ date || $t('payment.end-date') }}
                </div>
                <font-awesome-icon
                  icon="calendar"
                  class="me-2" />
              </button>
            </template>
          </vue-date-picker>
        </div>
        <div class="col-12 col-lg-6 py-3 order-3 order-lg-3">
          <input
            v-model="maxAmount"
            class="form-control bg-white py-2 border"
            maxlength="120"
            :placeholder="$t('payment.maximum')">
        </div>
      </div>
      <div class="d-flex justify-content-center my-4">
        <button
          id="addAccount"
          :disabled="invalid"
          class="btn btn-primary py-2 px-4 font-weight-light">
          {{ $t('actions.add-bill') }}
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default {
  name: 'NewBill',
  components: {
    Multiselect,
    VueDatePicker,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      meta: null,
      category: null,
      alias: null,
      clientNumber: null,
      company: null,
      maxAmount: null,
      scheduled: null,
      paymentDate: null,
      endDate: null,
      payFrom: null,
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    companies() {
      return this.$store.state.companies;
    },
    accounts() {
      return this.$store.state.accounts;
    },
  },
  watch: {
    category() {
      this.$store.dispatch('GET_COMPANIES', this.category);
      this.company = '';
    },
  },
  methods: {
    async validateBeforeSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.createBill();
      }
    },
    async createBill() {
      const amount = await this.$store.dispatch('GET_AMOUNT', this.clientNumber);
      const newBill = {
        id: this.clientNumber + this.alias + (Math.random() + 1).toString(36).substring(7),
        category: this.category,
        alias: this.alias,
        clientNumber: this.clientNumber,
        company: this.company,
        isScheduled: this.scheduled,
        inCart: false,
        isPaid: false,
        amount,
        paymentDate: this.paymentDate,
        endDate: this.endDate,
        payFrom: this.payFrom,
        maxAmount: this.maxAmount,
      };
      this.$store.commit('ADD_NEW_BILL', newBill);
      this.$store.commit('SET_ACTIVE_TAB', 'accounts');
    },
  },
};

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables";

#addAccount,
.schedule-switch,
.date-picker::placeholder {
  font-size: 14px;
}

.fs-7 {
  font-size: 14px;
}

.date-picker::placeholder,
.placeholder-date {
  color: $tertiary-100;
}

.form-control::placeholder {
  font-size: 14px;
  color: $tertiary-100;
}

.bg-tertiary-20 {
  background: $tertiary-20;
}

.tertiary-20 {
  color: $tertiary-20;
}

.circle-bill-icon {
  display: inline-block;

  width: 20px;
  height: 20px;

  margin-right: 6px;

  line-height: 18px;
  text-align: center;

  background: $tertiary-20;

  border-radius: 50%;

}

</style>
