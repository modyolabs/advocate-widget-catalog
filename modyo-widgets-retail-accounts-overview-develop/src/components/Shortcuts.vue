<template>
  <div>
    <div class="fs-8 title fw-bold mb-3">
      {{ $t('shortcuts.name') }}
    </div>
    <div class="d-flex flex-wrap gap-3">
      <div
        v-for="(i, idx) in [1,2,3,4,5,6]"
        :key="idx"
        class="d-flex flex-column align-items-center border rounded-2 py-3 px-2">
        <font-awesome-icon
          icon="circle" />
        <span class="fs-8 text-dark">Transfer</span>
      </div>
      <button
        class="btn align-self-start"
        role="button">
        <font-awesome-icon
          icon="ellipsis-v" />
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Shortcuts',
};

</script>

<style lang="scss">
@import "../scss/variables";

.title {
  color: #333;
}
</style>
