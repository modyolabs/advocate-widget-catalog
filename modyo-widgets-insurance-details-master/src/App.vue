<template>
  <m-response-control
    v-if="apiStatus"
    class="insurance-details container-lg px-0 bg-white my-lg-5 my-0 text-center"
    :status="apiStatus">
    <template #loading>
      <div
        class="loading spinner-border mt-5"
        role="status">
        <span class="sr-only">{{ $t('commons.loading') }}</span>
      </div>
    </template>
    <template #error>
      <div class="d-flex flex-column justify-content-center p-5 h-100">
        <h5 class="text-center">
          {{ $t('commons.try-again') }}
        </h5>
      </div>
    </template>
    <template #empty>
      <div class="d-flex flex-column justify-content-center p-5 h-100">
        <h5 class="text-center">
          {{ $t('commons.empty') }}
        </h5>
      </div>
    </template>
  </m-response-control>
  <div
    v-else
    id="insuranceDetailsApp"
    class="insurance-details container-lg px-0 bg-white my-lg-5 my-0">
    <header
      class="insurance-details__header bg-white py-3 px-4 d-flex justify-content-md-between"
      :class="{'insurance-details__header--shadowed':bodyTitleMobile.length>0}">
      <button
        type="button"
        class="details-header__back-button text-primary-80 btn btn-link text-uppercase px-0
        d-flex align-items-center"
        @click="backClick">
        <font-awesome-icon
          :icon="['fas', 'arrow-left']"
          class="mr-2 d-md-block"
          :class="{'d-none': bodyTitleMobile.length===0}" />
        <font-awesome-icon
          :icon="['fas', 'arrow-left']"
          size="lg"
          class="d-md-none mr-2 text-primary"
          :class="{'d-none': bodyTitleMobile.length>0}" />
        <span class="d-none d-md-block">
          {{ $t('commons.back') }}
        </span>
      </button>

      <div
        v-if="bodyTitleMobile.length>0"
        class="d-md-none align-items-center text-capitalize ml-2 my-auto">
        <span class="d-inline-flex">
          {{ bodyTitleMobile[0] }}
        </span>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="d-inline-flex text-success mx-2 align-middle" />
        <span class="d-inline-flex">
          {{ bodyTitleMobile[1] }}
        </span>
      </div>

      <div
        class="btn-group d-none d-md-block"
        role="group"
        aria-label="Basic example">
        <button
          type="button"
          class="btn btn-link px-4"
          @click="openFundsChange">
          <font-awesome-icon
            :icon="['fas', 'chart-line']"
            size="lg"
            class="mr-1" />
          {{ $t('funds.change.title') }}
        </button>
        <button
          type="button"
          class="btn btn-link border-left border-right px-4"
          @click="openStatements">
          <font-awesome-icon
            :icon="['fas', 'file-alt']"
            size="lg"
            class="mr-1" />
          {{ $t('statements.title') }}
        </button>
        <button
          type="button"
          class="btn btn-link pl-4 pr-0"
          @click="openPolicy">
          <font-awesome-icon
            :icon="['fas', 'file-download']"
            size="lg"
            class="mr-1" />
          {{ $t('policy.title') }}
        </button>
      </div>
    </header>

    <main class="insurance-details__main">
      <details-body />
    </main>

    <footer class="insurance-details__footer d-flex d-md-none fixed-bottom bg-primary align-items-center">
      <div
        class="d-flex btn-group w-100"
        role="group"
        aria-label="Basic example">
        <button
          type="button"
          class="insurance-details__footer-btn d-flex flex-column align-items-center
          btn btn-link py-0 text-white font-weight-light text-wrap w-100"
          @click="openFundsChange">
          <font-awesome-icon
            :icon="['fas', 'chart-line']"
            size="lg"
            class="mb-2" />
          {{ $t('funds.change.title') }}
        </button>
        <button
          type="button"
          class="insurance-details__footer-btn d-flex flex-column align-items-center
          btn btn-link text-white border-left border-right py-0 font-weight-light w-100"
          @click="openStatements">
          <font-awesome-icon
            :icon="['fas', 'file-alt']"
            size="lg"
            class="mb-2" />
          {{ $t('statements.title') }}
        </button>
        <button
          type="button"
          class="insurance-details__footer-btn d-flex flex-column align-items-center btn
          btn-link text-white py-0 font-weight-light w-100"
          @click="openPolicy">
          <font-awesome-icon
            :icon="['fas', 'file-download']"
            size="lg"
            class="mb-2" />
          {{ $t('policy.title') }}
        </button>
      </div>
    </footer>

    <!-- MDrawer Component -->
    <m-drawer
      ref="m-drawer"
      open-on="right"
      width="80%"
      classes="p-0">
      <template #default>
        <component
          :is="drawerComponent"
          :drawer="$refs['m-drawer']" />
      </template>
    </m-drawer>
  </div>
</template>

<script>
import { MDrawer, MResponseControl } from '@modyo/financial-commons';
import FundsChange from './components/FundsChange';
import Statements from './components/Statements';
import Policy from './components/Policy';
import DetailsBody from './components/DetailsBody/DetailsBody.vue';

export default {
  name: 'InsuranceDetailsApp',
  components: {
    MDrawer,
    MResponseControl,
    FundsChange,
    Statements,
    Policy,
    DetailsBody,
  },
  data() {
    return {
      apiStatus: false,
      drawerComponent: null,
    };
  },
  computed: {
    bodyTitleMobile() {
      return this.$store.state.bodyTitleMobile;
    },
  },
  created() {
    this.apiStatus = 'isLoading';
    this.$store.dispatch('getData')
      .then(() => {
        this.apiStatus = false;
      }).catch(() => {
        this.apiStatus = 'hasError';
      });
  },
  methods: {
    openDrawer(screen) {
      this.drawerComponent = screen;
      this.$refs['m-drawer'].openDrawer();
    },
    openFundsChange() {
      this.$store.commit('initFundsChange');
      this.openDrawer('FundsChange');
    },
    openStatements() {
      this.openDrawer('Statements');
    },
    openPolicy() {
      this.$store.commit('setPolicyEmailSent', false);
      this.openDrawer('Policy');
    },
    backClick() {
      this.$store.commit('setBodyView', '');
      this.$store.commit('setBodyTitleMobile', []);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variables";

.insurance-details {
  min-height: 100%;
}

.details-header__back-button {
  line-height: 1rem;
  letter-spacing: .1em;
}

.insurance-details__footer {
  z-index: 100;

  height: 80px;

  font-size: .875rem;
  color: #fff;
}

.insurance-details__footer-btn {
  line-height: 1rem;
}

.insurance-details__header--shadowed {
  box-shadow: 0 1px 1px $secondary-10;
}

@media (max-width: 767.98px) {
  .insurance-details__main {
    padding-bottom: 80px;
  }

  .insurance-details__header {
    font-size: .875em;
  }

  .insurance-details__header--shadowed {
    position: fixed;
    z-index: 100;

    width: 100%;
  }
}
@media (min-width: 768px) {
  .insurance-details__header {
    box-shadow: 0 1px 1px $secondary-10;
  }
}
</style>
