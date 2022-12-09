<script setup lang="ts">
const web3Store = useWeb3Store()
</script>

<template>
  <div>
    <p class="text-white">
      Wallet address: {{ web3Store.walletAddress }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: avax
</route>
