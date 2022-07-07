<template>
  <div
    id="trendItem"
    class="row justify-content-center align-items-center border border-1 border-dark-3
  rounded-3 bg-white m-0 p-1 pb-0 p-md-3 ps-md-2 p-lg-3 g-0">
    <div class="d-none d-md-flex justify-content-center align-items-center col-xl-2 col-md-3 gap-0 gap-lg-1">
      <button
        :disabled="!getVisualization.accounts"
        class="btnIcon"
        @click="toggleIcon">
        <font-awesome-icon
          color="#515A5E"
          :icon="['far', getVisualization.accounts && activeIcon ? 'eye' : 'eye-slash']" />
      </button>
      <div
        class="account-color"
        :style="{'background': account.color}" />
    </div>
    <div class="col-12 col-md-8 col-xl-9 justify-content-center align-items-center">
      <div class=" text-center text-md-start m-0 p-0 ps-1 g-0">
        <span
          class="d-none d-md-block fw-normal fs-7 text-truncate pointer"
          @click="selectAccount">{{ account.name }}</span>
        <button
          :disabled="!getVisualization.accounts"
          class=" d-md-none btn-account fw-normal fs-9"
          :class="{'notSelected': getVisualization.accounts && !activeIcon}"
          :style="{'background': getBackground}"
          @click="toggleIcon">
          {{ account.name }}
          <font-awesome-icon
            v-if="getVisualization.accounts && activeIcon"
            color="#FFF"
            :icon="['fas', 'check']" />
        </button>
      </div>
      <div
        class="text-center my-2 m-md-0 text-md-start pointer"
        @click="selectAccount">
        <span
          class="d-none d-md-inline fw-bold status-icon me-1"
          :style="getVariationStyles">
          <font-awesome-icon
            size="sm"
            fixed-width
            :icon="getVariationIcon" />
        </span>
        <span
          v-if="getVisualization.overview"
          class="d-inline d-md-none fw-bold status-icon me-1"
          :style="getVariationStyles">
          <font-awesome-icon
            size="sm"
            fixed-width
            :icon="getVariationIcon" />
        </span>
        <div
          v-else
          class="d-md-none percentage me-1"
          :style="calcStyleFraction(account)" />
        <span class="d-none d-md-inline fw-bold fs-7 text-dark">
          {{ account.variation.price | currency }}
        </span>
        <span
          v-if="getVisualization.overview"
          class="d-inline d-md-none fw-bold fs-9 ms-1 me-1 text-dark-3">
          {{ account.variation.price | currency }}
        </span>
        <span
          v-else
          class="d-inline d-md-none fw-bold fs-9 ms-1 me-1 text-dark-3">
          {{ calcFraction }}
        </span>
        <button
          class="d-inline d-md-none btnIcon"
          @click="selectAccount">
          <font-awesome-icon
            size="sm"
            color="#515A5E"
            icon="chevron-right" />
        </button>
      </div>
    </div>
    <div
      class="d-none d-md-block col-1 pointer"
      @click="selectAccount">
      <button class="btnIcon">
        <font-awesome-icon
          size="sm"
          style="vertical-align: initial;"
          class="fs-6"
          color="#515A5E"
          icon="chevron-right" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeIcon: true,
    };
  },
  computed: {
    getVariationStyles() {
      return this.$store.getters.getStyles(this.account.variation.status);
    },
    getVariationIcon() {
      return this.$store.getters.getIcon(this.account.variation.status);
    },
    getVisualization() {
      return this.$store.state.chartVisualization;
    },
    getBackground() {
      if (this.getVisualization.accounts) {
        if (this.activeIcon) return this.account.color;
        return 'transparent';
      }
      return this.account.color;
    },
    getStateDistribution() {
      return this.getVisualization.accounts;
    },
    calcFraction() {
      const value = this.account.variation.percentage * 100;
      return `${Number(value).toFixed(0)}%`;
    },
  },
  watch: {
    activeIcon() {
      this.$store.state.chartRef.value.chartInstance.setDatasetVisibility(this.index, this.activeIcon);
      this.$store.state.chartRef.value.chartInstance.update();
    },
    getStateDistribution() {
      if (!this.getStateDistribution) this.activeIcon = true;
    },
  },
  methods: {
    toggleIcon() {
      this.activeIcon = !this.activeIcon;
    },
    async selectAccount() {
      this.$store.commit('SET_CHART_VISUALIZATION', {
        accounts: false,
        overview: true,
      });
      await this.$store.dispatch('GET_ACCOUNT_ACTIVITY', this.account.id);
      window.scrollTo(0, 0);
    },
    calcStyleFraction(account) {
      const { percentage } = account.variation;
      const deg = percentage > 0.5 ? -90 : 90;
      const fraction = deg + (360 * percentage);
      const color = percentage > 0.5 ? account.color : 'white';
      return {
        border: '1px solid #EDF0FA',
        backgroundColor: account.color,
        backgroundImage: `linear-gradient(${fraction}deg, transparent 50%, ${color} 50%), linear-gradient(90deg, white 50%, transparent 50%)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#trendItem .status-icon {
  padding: 2px;

  font-size: 10px;

  border-radius: 50%;
}

.account-color {
  width: 16px;
  height: 16px;

  border: 1px solid #d2d6e5;
  border-radius: 5px;
}

.btnIcon {
  width: 24px;
  height: 24px;
  padding: unset;

  line-height: 0;
  text-align: center;

  background: none;
  border: none;
  border-radius: 12px;

  transition-duration: .4s;
}

.btnIcon:hover {
  background: rgba($color: #515a5e, $alpha: .1);
}

#trendItem .btn-account {
  padding: 4px;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &.notSelected {
    color: $dark;
    border: 1px solid #d2d6e5;
  }

  &:disabled {
    cursor: initial;
  }
}

.percentage {
  width: 12px;
  height: 12px;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.pointer {
  cursor: pointer;
}
</style>
