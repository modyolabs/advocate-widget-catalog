<template>
  <validation-observer
    ref="observer"
    v-slot="{invalid}"
    class="new-contact-form mt-4 mx-4"
    tag="div">
    <validation-provider
      v-slot="{errors, touched, classes}"
      :name="$t('new-contact.fullname')"
      tag="div"
      class="form-group my-3 mb-md-3"
      rules="required">
      <input
        v-model.lazy="payee.fullname"
        class="rounded-sm form-control"
        :class="{'is-invalid': errors && errors.length>0 && touched, ...classes}"
        type="text"
        :placeholder="$t('new-contact.fullname')">
      <span
        v-show="errors && errors.length>0 && touched"
        class="invalid-feedback">{{ errors[0] }}</span>
    </validation-provider>

    <validation-provider
      v-slot="{errors, touched, classes}"
      :name="$t('new-contact.bank')"
      tag="div"
      class="form-group my-3 mb-md-2"
      rules="required">
      <multiselect
        v-model="payee.bank"
        track-by="id"
        label="name"
        :options="banks"
        :searchable="true"
        :close-on-select="true"
        :show-labels="false"
        :allow-empty="false"
        :placeholder="$t('new-contact.select-bank')"
        :class="{'is-invalid': errors && errors.length>0 && touched, ...classes}">
        <template
          slot="singleLabel"
          slot-scope="{ option }">
          {{ option.name }}
        </template>
      </multiselect>
      <span
        v-show="errors && errors.length>0 && touched"
        class="invalid-feedback">{{ errors[0] }}</span>
    </validation-provider>

    <validation-provider
      v-slot="{errors, touched, classes}"
      :name="$t('new-contact.account-type')"
      tag="div"
      class="form-group my-3 mb-md-2"
      rules="required">
      <multiselect
        v-model="payee.accountType"
        :options="accountTypes"
        :searchable="false"
        :close-on-select="true"
        :show-labels="false"
        :allow-empty="false"
        :placeholder="$t('new-contact.account-type')"
        :class="{'is-invalid': errors && errors.length>0 && touched, ...classes}" />
      <span
        v-show="errors && errors.length>0 && touched"
        class="invalid-feedback">{{ errors[0] }}</span>
    </validation-provider>

    <validation-provider
      v-slot="{errors, touched, classes}"
      :name="$t('new-contact.account-number')"
      tag="div"
      class="form-group my-3 mb-md-2"
      rules="required">
      <input
        v-model.lazy="payee.accountNumber"
        class="rounded-sm form-control"
        :class="{'is-invalid': errors && errors.length>0 && touched, ...classes}"
        type="text"
        maxlength="34"
        :placeholder="$t('new-contact.account-number')"
        @keydown="isNumber($event)">
      <span
        v-show="errors && errors.length>0 && touched"
        class="invalid-feedback">{{ errors[0] }}</span>
    </validation-provider>

    <validation-provider
      v-if="!isLangEn"
      v-slot="{errors, touched, classes}"
      :name="$t('new-contact.payee-id')"
      tag="div"
      class="form-group my-3 mb-md-2"
      rules="required|rut">
      <input
        v-model.lazy="payeeId"
        v-rut="payeeId"
        class="rounded-sm form-control"
        :class="{'is-invalid': errors && errors.length>0 && touched, ...classes}"
        type="text"
        :placeholder="$t('new-contact.payee-id')">
      <span
        v-show="errors && errors.length>0 && touched"
        class="invalid-feedback">{{ errors[0] }}</span>
    </validation-provider>

    <validation-provider
      v-slot="{errors, touched, classes}"
      :name="$t('new-contact.email')"
      tag="div"
      class="form-group my-3 mb-md-2"
      rules="required|email">
      <input
        v-model.lazy="payee.email"
        class="rounded-sm form-control"
        :class="{'is-invalid': errors && errors.length>0 && touched, ...classes}"
        type="text"
        :placeholder="$t('new-contact.email')">
      <span
        v-show="errors && errors.length>0 && touched"
        class="invalid-feedback">{{ errors[0] }}</span>
    </validation-provider>

    <div class="new-contact-form__action d-block d-lg-none pt-4">
      <div class="">
        <button
          :disabled="invalid"
          class="btn btn-primary btn-block py-3"
          @click="handleClick">
          {{ $t('actions.continue') }}
        </button>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'NewContact',
  components: {
    Multiselect,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      payeeId: '',
      accountTypes: [this.$t('account.type.savings'), this.$t('account.type.checking')],
      payee: {
        accountNumber: null,
        accountType: null,
        bank: null,
        email: null,
        fullname: null,
        payeeId: null,
      },
    };
  },
  computed: {
    banks() {
      return this.$store.state.banks;
    },
    toAccount() {
      return this.$store.getters.toAccount || false;
    },
    stepper() {
      return this.$store.state.stepper;
    },
    isLangEn() {
      return this.$store.state.lang === 'en-US';
    },
  },
  watch: {
    payee: {
      handler: 'validatePayee',
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('GET_BANKS');
  },
  methods: {
    async validatePayee() {
      if (this.$refs.observer) {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          this.$store.commit('SET_PAYEE_ACCOUNT', this.payee);
          this.$store.dispatch('ADD_CONTACT', this.payee);
        } else {
          this.$store.commit('SET_PAYEE_ACCOUNT', null);
        }
        return isValid;
      }
      return false;
    },
    async handleClick() {
      const valid = await this.validatePayee();
      if (valid) this.stepper.next();
    },
    isNumber(e) {
      const evt = e || window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
      return false;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
