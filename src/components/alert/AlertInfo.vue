<script setup lang="ts">
defineProps<{
  type: string
  message: string
}>()
</script>

<template>
  <div class="alert-container flex-center">
    <div class="alert-wrapper" :class="type">
      <AlertIcon :type="type" />
      {{ message }}
    </div>
  </div>
</template>
