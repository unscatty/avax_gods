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
    <div
      class="alert-wrapper flex items-center justify-between"
      :class="alertInfo.type"
    >
      <AlertIcon :type="alertInfo.type" />
      <div class="flex flex-col">
        <template v-for="(text, index) in alertInfo.message" :key="index">
          <span>
            {{ text || 'Something went wrong' }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
