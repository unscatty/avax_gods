<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <h2 class="join-head-text">
    Available Battles:
  </h2>
  <p class="info-text" @click="router.push('/create-battle')">
    Or create a new battle
  </p>
</template>
 
<route lang="yaml">
meta:
  layout: avax
  layoutTitle:
    - Join
    - a battle
  layoutDescription: Join already existing battles
</route>
