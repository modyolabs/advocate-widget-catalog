<template>
  <div
    class="d-none d-md-block">
    <div
      id="insightsCarousel"
      ref="insightsCarousel"
      class="carousel slide carousel-fade"
      data-bs-interval="4000"
      data-bs-ride="carousel">
      <div class="row g-0 align-items-center justify-content-center">
        <div
          class="col-1 text-center"
          :class="{
            'order-1 my-0': currentView === 'general',
            'order-2 my-3': currentView === 'single'}">
          <button
            class="btn position-relative controls"
            type="button"
            data-bs-target="#insightsCarousel"
            data-bs-slide="prev">
            <font-awesome-icon
              class="fs-5"
              color="#515A5E"
              icon="chevron-left" />
            <span class="visually-hidden">{{ $t('carousel.prev') }}</span>
          </button>
        </div>
        <div
          :class="{
            'col-10 order-2': currentView === 'general',
            'col-12 order-1': currentView === 'single'}">
          <div
            class="carousel-inner">
            <div
              v-for="(insight, idx) in insights"
              :key="idx"
              :class="{'active' : idx === 0, 'height-fixed' : currentView === 'single' }"
              class="carousel-item">
              <insight-item
                :index="calcIndex(idx)"
                :data="insight"
                :total-items="countTotalItems" />
            </div>
          </div>
        </div>
        <div
          class="col-1 text-center"
          :class="{
            'order-3 my-0': currentView === 'general',
            'order-4 my-3': currentView === 'single'}">
          <button
            class="btn position-relative controls"
            type="button"
            data-bs-target="#insightsCarousel"
            data-bs-slide="next">
            <font-awesome-icon
              class="fs-5"
              color="#515A5E"
              icon="chevron-right" />
            <span class="visually-hidden">{{ $t('carousel.next') }}</span>
          </button>
        </div>
        <div
          :class="{
            'col-12 order-4 mt-3': currentView === 'general',
            'col-4 order-3 my-0': currentView === 'single'}">
          <div
            id="nav"
            class="carousel-indicators position-relative my-auto">
            <button
              v-for="(insight, idx) in insights"
              :key="idx"
              type="button"
              data-bs-target="#insightsCarousel"
              :data-bs-slide-to="idx"
              :class="{'active' : idx === 0}"
              :aria-current="{'true' : idx === 0}"
              :aria-label="'Slide' + (idx+1) " />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InsightItem from './Insight.vue';

export default {
  name: 'Carrousel',
  components: {
    InsightItem,
  },
  data() {
    return {
      carousel: {},
    };
  },
  computed: {
    countTotalItems() {
      return this.insights.length;
    },
    currentView() {
      return this.$store.state.currentView.overview;
    },
    insights() {
      return this.$store.state.insights;
    },
  },
  methods: {
    calcIndex: (index) => index + 1,
  },
};
</script>
<style lang="scss">

$nav-color: #a3afb4;

#insightsCarousel {

  .controls {
    &:focus {
      box-shadow: none;
    }
  }

  #nav.carousel-indicators {
    button {
      width: 8px;
      height: 8px;
      padding: 0;
      margin: 4px;

      background: $nav-color;
      border: none;
      border-radius: 4px;
      opacity: .3;
    }
    .active {
      width: 30px;

      opacity: 1;
    }
  }
  .carousel-item.height-fixed {
    height: 300px;
  }

  &.carousel-item {
    transition: transform 4s ease-in-out;
  }
  &.carousel-fade .active.carousel-item-start .fadeIn,
  &.carousel-fade .active.carousel-item-end .fadeIn {
    animation-name: fadeInOpacity;
    animation-duration: 4s;
  }

  &.carousel-fade .active.carousel-item-start .flex-column-reverse .up,
  &.carousel-fade .active.carousel-item-end .flex-column-reverse .up {
    transition: transform 2s ease-in;
    animation-name: jump;
    animation-duration: 1.5s;
  }
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes jump {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(5px);
  }
}

</style>
