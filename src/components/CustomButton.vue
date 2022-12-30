<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  restStyles: {
    type: String,
    required: false,
    default: '',
  },
  isEnabled: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emit = defineEmits(['handleClick'])
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="restStyles"
    :disabled="!isEnabled"
    @click="emit('handleClick')"
  >
    <slot>
      <template v-if="title">
        {{ title }}
      </template>
    </slot>
  </button>
</template>
