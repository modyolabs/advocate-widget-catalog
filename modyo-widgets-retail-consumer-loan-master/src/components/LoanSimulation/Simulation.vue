<template>
  <div
    class="consumer-loan__summary p-4 p-sm-5 d-lg-block"
    :class="{'d-none': showSettingsView}">
    <simulation-summary v-if="!showSimulationDetails" />
    <simulation-details v-else />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import SimulationSummary from './SimulationSummary.vue';
import SimulationDetails from './SimulationDetails.vue';

export default {
  name: 'Simulation',
  components: {
    SimulationSummary,
    SimulationDetails,
  },
  computed: mapState(['showSettingsView', 'showSimulationDetails']),
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

.consumer-loan__summary {
  background-color: #fff;
}

@media (min-width: 992px) {
  .consumer-loan__summary {
    background-color: $tertiary-20;
  }
}
</style>
