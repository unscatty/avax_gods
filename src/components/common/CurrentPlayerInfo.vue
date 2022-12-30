<script setup lang="ts">
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'

const { setErrorMessage } = useAlertInfoStore()

const web3Store = useWeb3Store()
const { updateCurrentAccountAddress, setSmartContractAndProvider } = web3Store
const { currentPlayerInfo, currentAccountAddress } = storeToRefs(web3Store)

const displayLabel = computed(
  () => currentPlayerInfo.value?.playerName || currentAccountAddress.value
)

const connectAccount = async () => {
  try {
    await setSmartContractAndProvider()
    await updateCurrentAccountAddress()
  } catch (error) {
    setErrorMessage(error)
  }
}
</script>

<template>
  <template v-if="currentAccountAddress">
    <div class="flex justify-around items-center">
      <VueCustomTooltip :label="currentAccountAddress">
        <p
          class="truncate text-white text-2xl font-rajdhani font-bold max-w-28 sm:max-w-full"
        >
          {{ displayLabel }}
        </p>
      </VueCustomTooltip>
      <span
        class="flex items-center justify-center h-10 w-10 rounded-full bg-white"
        ml="2"
        border="2px black"
        ring="white 1 offset"
      >
        <HeroCharIcon class="text-black text-[2rem]" />
      </span>
    </div>
  </template>
  <template v-else>
    <CustomButton title="Connect your account" @handle-click="connectAccount" />
  </template>
</template>
