<script setup lang="ts">
const { alertInfo } = storeToRefs(useAlertInfoStore())
</script>

<template>
  <div v-show="alertInfo.status" class="alert-container flex-center">
    <div class="alert-wrapper" :class="alertInfo.type">
      <AlertIcon :type="alertInfo.type" />
      {{ alertInfo.message || 'Something went wrong :c' }}
    </div>
  </div>
</template>
