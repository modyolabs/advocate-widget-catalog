<template>
  <div>
    <div
      v-if="contactCreationRequested"
      class="d-flex align-items-center py-5">
      <div
        class="new-contact__spinner spinner-border mx-auto"
        role="status">
        <span class="sr-only">{{ $t('contact.loading') }}</span>
      </div>
    </div>
    <validation-observer
      v-else
      ref="observer"
      v-slot="{invalid, pristine}"
      class="mx-4 mx-lg-5 py-2 d-flex flex-column justify-content-between"
      tag="form"
      @submit.prevent="validateBeforeSubmit">
      <validation-provider
        v-slot="{errors, touched, classes}"
        :name="$t('contact.name')"
        tag="div"
        class="form-group mb-3 mb-md-2"
        rules="required">
        <input
          v-model.lazy="contactInfo.fullname"
          class="py-4"
          :class="{'form-control': true, 'is-invalid': errors.length>0 && touched, ...classes}"
          type="text"
          :placeholder="$t('contact.name')">
        <span
          v-show="invalid && touched"
          class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        v-slot="{errors, touched, classes}"
        :name="$t('contact.bank')"
        tag="div"
        class="form-group mb-3 mb-md-2"
        rules="required">
        <multiselect
          v-model="contactInfo.bank"
          track-by="id"
          label="name"
          :options="banks"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          :placeholder="$t('contact.selectBank')"
          :class="{'is-invalid': invalid && touched, ...classes}">
          <template
            slot="singleLabel"
            slot-scope="{ option }">
            {{ option.name }}
          </template>
        </multiselect>
        <span
          v-show="invalid && touched"
          class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        v-slot="{errors, touched, classes}"
        :name="$t('contact.accountType')"
        tag="div"
        class="form-group mb-3 mb-md-2"
        rules="required">
        <multiselect
          v-model="contactInfo.accountType"
          class="text-capitalize"
          :options="accountTypes"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          :placeholder="$t('contact.accountType')"
          :class="{'is-invalid': invalid && touched, ...classes}" />
        <span
          v-show="invalid && touched"
          class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        v-if="!isLangEn"
        v-slot="{errors, touched, classes}"
        :name="$t('contact.rut')"
        tag="div"
        class="form-group mb-3 mb-md-2"
        rules="required|rut">
        <input
          v-model="rut"
          v-rut="rut"
          class="py-4"
          :class="{'form-control': true, 'is-invalid': errors.length>0 && touched, ...classes }"
          type="text"
          :placeholder="$t('contact.rut')">
        <span
          v-show="invalid && touched"
          class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        v-slot="{errors, touched, classes}"
        :name="$t('contact.accountNumber')"
        tag="div"
        class="form-group mb-3 mb-md-2"
        rules="required">
        <input
          v-model.lazy="contactInfo.accountNumber"
          class="py-4"
          maxlength="34"
          :class="{'form-control': true, 'is-invalid': errors.length>0 && touched, ...classes }"
          type="text"
          :placeholder="$t('contact.accountNumber')">
        <span
          v-show="invalid && touched"
          class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        v-slot="{errors, touched, classes}"
        :name="$t('contact.email')"
        tag="div"
        class="form-group mb-3 mb-md-2"
        rules="required|email">
        <input
          v-model.lazy="contactInfo.email"
          class="py-4"
          :class="{'form-control': true, 'is-invalid': errors.length>0 && touched, ...classes }"
          type="text"
          :placeholder="$t('contact.email')">
        <span
          v-show="invalid && touched"
          class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <div
        v-if="!noSubmit"
        class="form-group mt-2 pt-2">
        <button
          :disabled="invalid || pristine"
          type="submit"
          class="btn btn-primary btn-lg btn-block py-3">
          {{ isNewContact ? $tc('actions.add') : $t('actions.edit') }}
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { formatRut } from '@modyo/financial-commons';
import Multiselect from 'vue-multiselect';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'NewContact',
  directives: {
    rut: formatRut,
  },
  components: {
    Multiselect,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    noSubmit: { type: Boolean, default: false },
  },
  data() {
    return {
      rut: '',
      accountTypes: [this.$t('accounts.type.checking-account'), this.$t('accounts.type.savings-account')],
    };
  },
  computed: {
    isLangEn() {
      return this.$store.state.lang === 'en-US';
    },

    contact: {
      get() {
        return this.$store.state.editingContact;
      },
      set(value) {
        this.$store.commit('SET_EDITING_CONTACT', value);
      },
    },

    banks() {
      return this.$store.state.banks;
    },

    isNewContact() {
      return this.$store.state.newContactMode || !this.$store.state.editingContactMode;
    },

    contactInfo() {
      if (this.contact) {
        return this.contact;
      }
      return {
        fullname: '',
        payeeId: '',
        email: '',
        bankId: '',
        accountType: '',
        accountNumber: '',
      };
    },

    contactCreationRequested() {
      return this.$store.state.contactCreationRequested;
    },
  },
  watch: {
    rut(value) {
      this.contactInfo.payeeId = value;
    },
  },
  created() {
    this.$store.dispatch('GET_BANKS');
    this.rut = this.contactInfo.payeeId;
  },
  methods: {
    async validateBeforeSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.submitForm();
      }
    },

    async submitForm() {
      if (this.isNewContact) {
        await this.$store.dispatch('ADD_CONTACT', this.contact);
      } else {
        await this.$store.dispatch('EDIT_CONTACT', this.contact);
      }

      this.closeContactEditMode();
    },

    closeContactEditMode() {
      this.$store.commit('SET_EDITING_CONTACT', {});
      this.$store.commit('SET_EDITING_CONTACT_MODE', false);
      this.$store.commit('SET_NEW_CONTACT_MODE', false);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.new-contact__spinner {
  width: 3rem;
  height: 3rem;
}
</style>
