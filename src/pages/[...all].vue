<script setup lang="ts">
const router = useRouter()
</script>

<route lang="yaml">
meta:
  layout: avax
  layoutTitle:
    - Oops
    - that's an error
  layoutDescription: The page you are looking for does no exist
</route>

<template>
  <div>
    <h2 class="join-head-text">Here's what you can do</h2>
    <div class="flex space-x-5">
      <CustomButton title="Go back" @handle-click="router.back()" />
      <CustomButton title="Go to homepage" @handle-click="router.push('/')" />
    </div>
  </div>
</template>
