<template>
  <div class="d-flex flex-column gap-3 bg-none">
    <div class="d-flex flex-row justify-content-start aling-items-center gap-3">
      <font-awesome-icon
        size="lg"
        class="d-flex fw-bold"
        :icon="['far', 'lightbulb']" />
      <span class="fw-bold fs-7">{{ $t('insights.name') }}</span>
    </div>
    <insight-item
      v-for="(el, idx) in insights"
      :key="idx"
      :index="calcIndex(idx)"
      :data="el"
      :total-items="countTotalItems" />
  </div>
</template>
<script>
import InsightItem from './Insight.vue';

export default {
  name: 'InsightList',
  components: {
    InsightItem,
  },
  data() {
    return {
      insights: [],
    };
  },
  computed: {
    countTotalItems() {
      return this.insights.length;
    },
  },
  created() {
    this.insights = this.$store.state.insights;
  },
  methods: {
    calcIndex: (index) => index + 1,
  },
};
</script>
