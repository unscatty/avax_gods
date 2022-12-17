<script setup lang="ts">
const alertStore = useAlertInfoStore()
const { alertInfo } = storeToRefs(alertStore)
const { clearAlertInfo } = alertStore
</script>

<template>
  <div
    v-show="alertInfo.status"
    class="alert-container flex-center cursor-pointer z-999"
    @click="clearAlertInfo"
  >
    <div class="alert-wrapper" :class="alertInfo.type">
      <AlertIcon :type="alertInfo.type" />
      {{ alertInfo.message || 'Something went wrong :c' }}
    </div>
  </div>
</template>
