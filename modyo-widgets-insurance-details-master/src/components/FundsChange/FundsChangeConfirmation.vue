<template>
  <validation-observer ref="observer">
    <p class="mb-1">
      <strong>{{ $t('funds.change.confirmation.title') }}</strong>
    </p>
    <p><strong>{{ $t('policy.policy-number', {number:'11390177'}) }}</strong></p>
    <p class="text-secondary">
      {{ $t('funds.change.confirmation.client-authorization', {number:'11390177'}) }}
    </p>
    <div class="mt-4">
      <h6 class="funds-change-confirmation__table-title font-weight-normal pt-3 mb-4 text-secondary">
        {{ $t('funds.change.confirmation.summary-title') }}
      </h6>
      <div class="distribution-table">
        <table class="table-striped-rounded table table-striped mb-0 text-secondary">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-primary">
                {{ $t('funds.table.header.funds') }}
              </th>
              <th
                scope="col"
                class="text-primary">
                {{ $t('funds.table.header.distribution') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row,rowIndex) in fundsChange.fundsDetails"
              :key="rowIndex">
              <td>
                {{ row[0] }}
              </td>
              <td>
                {{ row[1] | percentage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-4 p-4 border rounded-lg">
      <p>{{ $t('funds.change.confirmation.request-tracking-label') }}</p>
      <div class="row">
        <div class="col-md-6">
          <validation-provider
            v-slot="{errors}"
            rules="email|required"
            mode="eager"
            tag="div"
            class="form-group">
            <label
              for="fundsChangeReceiptEmail"
              class="small text-secondary"><strong>{{ $t('forms.email-input') }}</strong></label>
            <input
              id="fundsChangeReceiptEmail"
              v-model="email"
              :name="$t('forms.email-input-name')"
              type="email"
              class="form-control py-3"
              :placeholder="$t('forms.email-input-placeholder')">
            <small
              v-if="errors.length>0"
              class="text-danger small mt-2 d-block">
              {{ errors[0] }}
            </small>
          </validation-provider>
        </div>
        <div class="col-md-6">
          <validation-provider
            v-slot="{errors}"
            rules="email|required"
            mode="eager"
            tag="div"
            class="form-group">
            <label
              for="fundsChangeReceiptEmail2"
              class="small text-secondary"><strong>{{ $t('forms.email-input-confirmation') }}</strong></label>
            <input
              id="fundsChangeReceiptEmail2"
              v-model="email2"
              :name="$t('forms.email-input-confirmation-name')"
              type="email"
              class="form-control py-3"
              :placeholder="$t('forms.email-input-placeholder')">
            <small
              v-if="errors.length>0"
              class="text-danger small mt-2 d-block">
              {{ errors[0] }}
            </small>
          </validation-provider>
        </div>
      </div>
      <div class="custom-control custom-checkbox">
        <input
          id="terms"
          v-model="terms"
          type="checkbox"
          class="custom-control-input">
        <i18n
          class="custom-control-label"
          for="terms"
          path="forms.terms"
          tag="label">
          <a
            href="#"
            target="_blank"><strong>{{ $t('forms.terms-label') }}</strong></a>
        </i18n>
      </div>
    </div>

    <button
      :disabled="!canSubmit"
      class="funds-change-confirmation__submit-btn btn btn-block-mobile
      mt-4 px-4 py-3 rounded-lg font-weight-light"
      href=""
      @click="submit">
      {{ $t('funds.change.confirmation.send') }}
    </button>

    <div class="funds-change-confirmation__notes text-secondary mt-4">
      <p>
        {{ $t('funds.change.confirmation.note') }}
      </p>
    </div>
  </validation-observer>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'FundsChangeConfirmation',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  filters: {
    percentage(value) {
      const valueFixed = value || 0;
      return valueFixed.toString().indexOf('%') > -1 ? valueFixed : `${valueFixed}%`;
    },
  },
  data() {
    return {
      email: '',
      email2: '',
      validEmail: false,
      terms: false,
    };
  },
  computed: {
    fundsChange: {
      get() {
        return this.$store.state.fundsChange;
      },
      set(value) {
        this.$store.commit('SET_FUNDS_CHANGE', value);
      },
    },
    canSubmit() {
      return this.validEmail && this.email === this.email2 && this.terms;
    },
  },
  watch: {
    email: 'validateEmail',
    email2: 'validateEmail',
  },
  methods: {
    async validateEmail() {
      this.validEmail = await this.$refs.observer.validate({ silent: true });
    },
    submit() {
      this.fundsChange.receiptEmail = this.email;
      this.fundsChange.screen = 'SuccessMessage';
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables";

.funds-change-confirmation__table-title {
  font-size: 1rem;
}

.funds-change-confirmation__submit-btn {
  font-size: 1rem;
  color: #fff;

  background-color: $primary;

  &:disabled {
    pointer-events: none;

    background-color: $secondary-20;
    opacity: 1;
  }

  &:hover,
  &:focus {
    color: #fff;

    background-color: $primary-dark;

  }
}

.table.table-striped-rounded {
  th {
    + th {
      border-left: none;
    }
  }

  td {
    + td {
      border-left: none;
    }
  }
}

.table-striped-rounded--first-column {
  display: none;
}

@media (max-width: 991.98px) {
  .funds-change-confirmation__notes {
    font-size: .875rem;
  }
}
</style>
