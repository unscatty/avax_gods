<script setup lang="ts">
defineProps<{
  title?: string
  restStyles?: string
}>()

const emit = defineEmits(['handleClick'])
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="restStyles"
    @click="emit('handleClick')"
  >
    <slot>
      <template v-if="title">
        {{ title }}
      </template>
    </slot>
  </button>
</template>
