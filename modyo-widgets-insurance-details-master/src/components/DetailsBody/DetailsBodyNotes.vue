<template>
  <div class="details-body-notes px-4 px-md-0">
    <p class="text-secondary">
      *{{ $t('policy.policy-value') }}:
      <span class="font-weight-light">{{ $t('body.notes[0]') }}</span>
    </p>
    <p class="text-secondary font-weight-light mb-0">
      {{ $t('body.notes[1]') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'DetailsBodyNotes',
};
</script>

<style lang="scss" scoped>
.details-body-notes {
  font-size: .875em;
}
</style>
