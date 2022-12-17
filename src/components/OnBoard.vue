<script setup lang="ts">
import { GetParams, SwitchNetwork } from '~/utils/onboard'

const { updateCurrentWalletAddress } = useWeb3Store()

const isModalOpen = ref(false)
const step = ref(-1)

const resetParams = async () => {
  const currentStep = await GetParams()

  step.value = currentStep.step
  isModalOpen.value = currentStep.step !== -1
}

const advice = ref<{
  text: string
  button?: {
    title: string
    handler: () => void
  }
}>()

watch(step, () => {
  switch (step.value) {
    case 0:
      advice.value = {
        text: "You don't have Core Wallet installed!",
        button: {
          title: 'Download Core',
          handler() {
            window.open('https://core.app/', '_blank')
          },
        },
      }

      return

    case 1:
      advice.value = {
        text: "You haven't connected your account to Core Wallet!",
        button: {
          title: 'Connect your account',
          handler: updateCurrentWalletAddress,
        },
      }

      return

    case 2:
      advice.value = {
        text: "You're on a different network. Switch to Fuji C-Chain.",
        button: {
          title: 'Switch',
          handler: SwitchNetwork,
        },
      }

      return

    case 3:
      advice.value = {
        text: "Oops, you don't have AVAX tokens in your account",
        button: {
          title: 'Grab some test tokens',
          handler() {
            window.open('https://faucet.avax.network/', '_blank')
          },
        },
      }
      return

    default:
      advice.value = {
        text: 'Good to go!',
      }
      return
  }
})

onMounted(() => {
  resetParams()

  window.ethereum?.on('chainChanged', () => {
    resetParams()
  })

  window.ethereum?.on('accountsChanged', () => {
    resetParams()
  })
})
</script>

<template>
  <div
    v-show="isModalOpen"
    class="absolute inset-0 flex-center flex-col glass-effect z-99"
  >
    <p class="modal-text">
      {{ advice?.text }}
    </p>
    <CustomButton
      v-show="advice?.button"
      :title="advice?.button?.title"
      @handle-click="advice?.button?.handler"
    />
  </div>
</template>
