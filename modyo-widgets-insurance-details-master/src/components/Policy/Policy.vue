<template>
  <div
    id="policy"
    class="position-relative"
    :class="[drawerStore.selectorOpen ? 'selector-opened' : false]">
    <header
      class="policy__header sticky-top bg-white py-3 py-md-4 px-4 px-md-5
      border-bottom d-flex justify-content-between align-items-center">
      <drawer-title
        :title="{icon: 'chart-line', name: $t('policy.title') }"
        :details="[
          {name: $t('commons.contractor'), bold: contractor.name},
          {name: $t('policy.policy-number',{number:''}), bold: policy.number }
        ]"
        :full-mobile="false"
        @close="drawer.closeDrawer" />
    </header>
    <main class="p-4 p-md-5">
      <div
        v-if="!sentEmail"
        class="row">
        <div class="col-lg-10 col-xl-9">
          <p class="text-secondary">
            {{ $t('policy.subtitle') }}
          </p>
          <validation-observer
            ref="observer"
            class="row">
            <div class="col-md-6">
              <validation-provider
                v-slot="{errors}"
                rules="email|required"
                mode="eager"
                tag="div"
                class="form-group">
                <label
                  for="email"
                  class="small text-secondary">
                  <strong>{{ $t('forms.email-input-name') }}</strong>
                </label>
                <input
                  v-model="email"
                  type="text"
                  :name="$t('forms.email-input-name')"
                  class="form-control px-4 py-3"
                  :placeholder="$t('forms.email-input-placeholder')">
                <small
                  v-if="errors.length>0"
                  class="text-danger small mt-2 d-block">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </div>
            <div class="col-md-5">
              <div class="form-group">
                <label class="small d-none d-md-inline-block">&zwnj;</label>
                <button
                  :disabled="!validEmail"
                  class="policy__send-btn btn btn-block-mobile px-4 py-3 rounded-lg
            font-weight-light d-flex justify-content-between align-items-center"
                  href=""
                  @click="sentEmail=true">
                  {{ $t('policy.send-email') }}
                  <font-awesome-icon
                    icon="envelope"
                    size="lg"
                    class="ml-4" />
                </button>
              </div>
            </div>
          </validation-observer>
          <div class="policy__separator d-flex align-items-center my-3 my-sm-4 text-secondary">
            <span class="px-4">{{ $t('policy.or') }}</span>
          </div>
          <div class="mt-4">
            <p class="text-secondary">
              {{ $t('policy.subtitle-2') }}
            </p>
            <button
              class="policy__download-btn btn btn-secondary btn-block-mobile px-4 py-3 rounded-lg
          font-weight-light d-flex justify-content-between align-items-center"
              href=""
              @click="()=>{}">
              {{ $t('policy.download-btn') }}
              <font-awesome-icon
                icon="download"
                size="lg"
                class="ml-4" />
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <success-message
          :title="$t('policy.email-sent-title')"
          :message="$t('policy.email-sent-message',{email:email})"
          @close="drawer.closeDrawer" />
      </div>
    </main>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DrawerTitle from '../DrawerTitle.vue';
import SuccessMessage from '../SuccessMessage.vue';

export default {
  name: 'Statements',
  components: {
    DrawerTitle,
    ValidationObserver,
    ValidationProvider,
    SuccessMessage,
  },
  props: {
    drawer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      validEmail: false,
      email: '',
    };
  },
  computed: {
    drawerStore: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        return this.$store.commit('SET_DRAWER', value);
      },
    },
    contractor() {
      return this.$store.state.contractor;
    },
    policy() {
      return this.$store.state.policy;
    },
    sentEmail: {
      get() {
        return this.$store.state.policyEmailSent;
      },
      set(value) {
        return this.$store.commit('SET_POLICY_EMAIL_SENT', value);
      },
    },
  },
  watch: {
    email: 'validateEmail',
  },
  methods: {
    async validateEmail() {
      this.validEmail = await this.$refs.observer.validate({ silent: true });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

#policy {
  min-height: 100%;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 45;

    display: block;

    height: 100%;

    pointer-events: none;

    content: "";

    opacity: 0;

    transition: opacity .33s ease-in-out;
  }

  &.selector-opened {
    &::before {
      pointer-events: all;

      background-color: rgb(0, 0, 0);
      opacity: .35;
    }
  }
}

.policy__header {
  z-index: 25;
}

.policy__send-btn {
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

.policy__separator {
  &::before,
  &::after {
    width: 100%;
    height: 1px;

    content: "";

    background: $tertiary-80;
  }
}

</style>
