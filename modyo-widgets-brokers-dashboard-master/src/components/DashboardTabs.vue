<template>
  <div class="dashboard-tabs bg-tertiary-10 px-3 p-sm-0">
    <div class="container">
      <div class="row">
        <div class="dashboard-tabs__left col d-flex align-items-center pl-0">
          <multiselect
            v-model="selectedOption"
            track-by="value"
            :options="options"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :searchable="false"
            class="multiselect--transparent d-md-none">
            <template
              slot="option"
              slot-scope="{ option }">
              {{ $t(`tabs.${option.name}`) }}
            </template>
            <template
              slot="singleLabel"
              slot-scope="{ option }">
              {{ $t(`tabs.${option.name}`) }}
            </template>
          </multiselect>

          <ul class="d-none d-md-flex dashboard-tabs__list nav flex-fill justify-content-between">
            <li class="nav-item">
              <a
                class="nav-link py-4 px-2 px-lg-4 active"
                href="#">{{ $t('tabs.quotes') }}</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link py-4 px-2 px-lg-4"
                href="#">{{ $t('tabs.policies') }}</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link py-4 px-2 px-lg-4"
                href="#">{{ $t('tabs.renovations') }}</a>
            </li>
          </ul>
        </div>

        <div class="dashboard-tabs__right col d-flex justify-content-end py-3 pr-0">
          <button class="btn btn-primary px-3 px-md-4">
            {{ $t('tabs.actions') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Multiselect from 'vue-multiselect';

export default {
  name: 'DashboardTabs',
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedOption: { name: 'quotes', value: 'quotes' },
      options: [
        { name: 'quotes', value: 'quotes' },
        { name: 'policies', value: 'policies' },
        { name: 'renovations', value: 'renovations' },
      ],
    };
  },
};

</script>

<style lang="scss" scoped>
@import "../scss/variables";

.dashboard-tabs {
  .dashboard-tabs__list {
    .nav-link.active {
      border-bottom: 2px solid $primary;
    }
  }
}
</style>
