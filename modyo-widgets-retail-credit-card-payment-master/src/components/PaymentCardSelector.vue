<template>
  <div class="my-4 my-lg-5">
    <div class="credit-card-payment__title px-5 text-center d-none d-lg-block">
      <p class="text-primary h5 font-weight-bold">
        {{ $t('card.title') }}
      </p>
    </div>

    <div
      class="credit-cards-payment__slider-wrapper pb-4">
      <div
        ref="credit-cards-payment-slider"
        class="credit-cards-payment__slider">
        <credit-card
          v-for="card in cards"
          ref="credit-card-slide"
          :key="`card-${card.id}`"
          :card="card"
          class="credit-cards-payment__slide" />
      </div>
      <div class="credit-cards-payment-slider__indicators px-4 d-flex justify-content-center">
        <span
          v-for="(card, index) in cards"
          :key="`indicator-${index}`"
          class="indicator"
          :class="{'active': creditCardsSlider.currentSlide == index}"
          @click="sliderGoTo(index)" />
      </div>
    </div>

    <credit-card-debts
      v-if="activeCard"
      :card="activeCard"
      @resetStepper="stepper.reset()" />
  </div>
</template>

<script>
import Siema from 'siema';
import CreditCard from './CreditCard.vue';
import CreditCardDebts from './CreditCardDebts.vue';

export default {
  name: 'PaymentCardSelector',
  components: {
    CreditCard,
    CreditCardDebts,
  },
  props: {
    stepper: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      creditCardsSlider: {},
    };
  },
  computed: {
    activeCard() {
      return this.$store.getters.activeCard;
    },

    cards() {
      return this.$store.state.cards;
    },
  },
  mounted() {
    this.initCreditCardsSlider();
  },
  methods: {
    initCreditCardsSlider() {
      this.$nextTick(() => {
        this.creditCardsSlider = new Siema({
          selector: '.credit-cards-payment__slider',
          onChange: this.setActiveCard,
        });
      });
    },

    sliderGoTo(index) {
      this.creditCardsSlider.goTo(index);
    },

    setActiveCard() {
      const cards = this.$refs['credit-card-slide'];
      this.$store.commit('SET_ACTIVE_CARD_ID', cards[this.creditCardsSlider.currentSlide].$el.dataset.card);
      cards.forEach((slide, i) => {
        if (i === this.creditCardsSlider.currentSlide) {
          cards[i].$el.classList.add('active');
        } else {
          cards[i].$el.classList.remove('active');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.credit-card-payment__title {
  background-color: #fff;
}

.credit-cards-payment__slider-wrapper {
  background-color: #fff;
}

.credit-cards-payment-slider__indicators {
  .indicator {
    width: 60px;
    height: 8px;
    margin: 0 5px;

    cursor: pointer;

    background-color: $primary-20;
    border-radius: 8px;

    &.active {
      background-color: $primary-100;
    }
  }
}

@media (min-width: 768px) {
  #credit-cards-payment-app {
    .credit-cards-payment__slider-wrapper {
      border-bottom: 1px solid $secondary-20;
    }
  }
}
</style>
