<template>
  <div>
    <label class="text-secondary small mb-1">
      {{ label }}
    </label>
    <p class="mb-0">
      {{ description }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'DataColumnItem',
  props: {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
