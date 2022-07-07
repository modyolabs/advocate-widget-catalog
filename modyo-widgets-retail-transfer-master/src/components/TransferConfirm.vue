<template>
  <div class="row no-gutters">
    <div class="transfer__confirm col-12 py-4 py-md-5 px-5">
      <div class="text-center text-md-left">
        <p class="text-primary h5 font-weight-bold pb-4">
          {{ $t('transfer-confirm.title') }}
        </p>
      </div>

      <validation-observer
        ref="amountObserver"
        v-slot="{invalid}"
        tag="div"
        class="confirm text-center mb-4 mt-md-5 mx-auto">
        <validation-provider
          v-slot="{errors}"
          :rules="{required: true, min: 4}"
          tag="div"
          :name="$t('transfer-confirm.input.password')"
          class="form-group">
          <input
            id="confirmInput"
            ref="moneyInput"
            v-model="password"
            type="password"
            minlength="4"
            maxlength="6"
            :class="{'confirm__input form-control form-control-lg text-center mb-2': true,
                     'is-danger': errors}">

          <small
            v-if="errors[0]"
            class="d-block info-transaction text-danger help is-danger mb-2">
            {{ errors[0] }}
          </small>
        </validation-provider>

        <div class="payment__actions pt-4">
          <button
            :disabled="invalid"
            class="btn btn-primary btn-block py-3"
            @click="handlePaymentClick">
            {{ $t('actions.transfer-button') }}
          </button>

          <button
            class="btn btn-secondary btn-block py-3"
            @click="handleCancelClick">
            {{ $t('actions.cancel-button') }}
          </button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'PaymentConfirm',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      password: '',
    };
  },
  computed: {
    stepper() {
      return this.$store.state.stepper;
    },
  },
  methods: {
    handlePaymentClick() {
      this.$store.commit('SET_STEP_ACTION', 'voucher');
    },

    handleCancelClick() {
      this.$store.commit('SET_STEP_ACTION', 'select');
      this.$store.commit('SET_SELECTED_DEBT', 'national');
      this.$store.commit('SET_ACTIVE_ACCOUNT_ID', null);
      this.$store.commit('SET_AMOUNT_OPTION', null);
      this.$store.commit('SET_AMOUNT', 0);
      this.stepper.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.transfer__confirm {
  .confirm {
    width: 40%;
  }

  .confirm__input {
    font-size: 28px;
    letter-spacing: .5em;
  }
}

@media (max-width: 991.98px) {
  .transfer__confirm {
    .confirm {
      width: 100%;
    }
  }
}
</style>
