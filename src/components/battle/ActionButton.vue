<script setup lang="ts">
defineProps<{
  title?: string
  imgUrl: string
  restStyles: string
}>()

const emit = defineEmits(['handleClick'])
</script>

<template>
  <div
    class="game-move-box flex-center glass-effect"
    :class="restStyles"
    @click="emit('handleClick')"
  >
    <img :src="imgUrl" alt="action_img" class="game-move-icon" />
  </div>
</template>
