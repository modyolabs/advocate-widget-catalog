<template>
  <!-- Modal -->
  <div
    id="emailModal"
    ref="emailModal"
    class="email-modal modal fade"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
    aria-labelledby="emailModalLabel"
    aria-hidden="true">
    <div class="email-modal__dialog modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0 px-4 pt-4">
          <h5
            id="emailModalLabel"
            class="modal-title font-weight-light">
            {{ $t('email-modal.title') }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="hideEmailModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer border-0 px-4 pb-4">
          <validation-observer
            ref="observer"
            tag="form"
            class="w-100">
            <validation-provider
              rules="required|email"
              tag="div"
              class="input-group mb-3">
              <input
                ref="signEmailInput"
                v-model="signEmail"
                type="email"
                class="form-control"
                :placeholder="$t('email-modal.input-placeholder')"
                :disabled="sendingEmail"
                :aria-label="$t('email-modal.input-placeholder')"
                aria-describedby="button-addon2">
              <div class="input-group-append">
                <button
                  id="button-addon2"
                  class="btn btn-primary rounded-right"
                  type="button"
                  :disabled="!valid || sendingEmail"
                  @click="sendEmail">
                  <span v-if="!sendingEmail">{{ $t('email-modal.send') }}</span>
                  <span v-else>
                    {{ $t('email-modal.sending-email-state') }}
                    <div
                      class="spinner-border spinner-grow-sm ml-2"
                      role="status">
                      <span class="sr-only">{{ $t('commons.loading') }}...</span>
                    </div>
                  </span>
                </button>
              </div>
            </validation-provider>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'EmailModal',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      sendingEmail: false,
      valid: false,
    };
  },
  computed: {
    showModal() {
      return this.$store.state.showEmailModal;
    },
    signEmail: {
      get() {
        return this.$store.state.signEmail;
      },
      set(value) {
        this.$store.commit('SET_SIGN_EMAIL', value);
      },
    },
  },
  watch: {
    signEmail() {
      this.$refs.observer.validate({ silent: true }).then((valid) => {
        this.valid = this.signEmail && valid;
      });
    },
    showModal(show) {
      if (show) {
        $(this.$refs.emailModal).modal('show');
        setTimeout(() => {
          this.$refs.signEmailInput.focus();
        }, 500);
      }
    },
  },
  methods: {
    sendEmail() {
      this.sendingEmail = true;

      setTimeout(() => {
        this.sendingEmail = false;
        $(this.$refs.emailModal).modal('hide');
        this.$store.commit('SET_SIGN_EMAIL_SENT', true);
      }, 4000);
    },
    hideEmailModal() {
      this.$store.commit('SET_SHOW_EMAIL_MODAL', false);
      this.valid = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.email-modal {
  .email-modal__dialog {
    position: absolute;

    margin: auto;

  }
}
@media (max-width: 991.98px) {
  .email-modal {
    &.fade {
      .email-modal__dialog {
        top: 50%;
        left: 50%;

        width: 80%;

        transform: translate(-50%, calc(-50% + 200px));
      }

      &.show {
        .email-modal__dialog {
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
@media (min-width: 992px) {
  .email-modal {
    &.fade {
      .email-modal__dialog {
        top: auto;
        right: 10px;
        bottom: 10px;
        left: auto;

        width: auto;

        transform: translate(0, 200px);
      }
    }

    &.show {
      .email-modal__dialog {
        transform: none;
      }
    }
  }
}
</style>
