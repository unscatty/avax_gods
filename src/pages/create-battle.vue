<script setup lang="ts">
import { useWeb3Store } from '~/store/web3';

const web3 = useWeb3Store()

onMounted(() => {
  web3.updateCurrentWalletAddress()
})
</script>

<template>
  <div>

  </div>
</template>

<route lang="yaml">
meta:
  layout: avax
  layoutTitle:
    - Create
    - a new Battle
  layoutDescription: Create your own battle and wait for other players to join you
</route>
