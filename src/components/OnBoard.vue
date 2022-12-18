<script setup lang="ts">
import { SwitchNetwork } from '~/utils/onboard'

const { updateCurrentWalletAddress } = useWeb3Store()
const { step } = storeToRefs(useStepStore())

const isModalOpen = computed(() => step.value !== -1)

const advice = computed<{
  text: string
  button?: {
    title: string
    handler: () => void
  }
}>(() => {
  switch (step.value) {
    case 0:
      return {
        text: "You don't have Core Wallet installed!",
        button: {
          title: 'Download Core',
          handler() {
            window.open('https://core.app/', '_blank')
          },
        },
      }

    // return

    case 1:
      return {
        text: "You haven't connected your account to Core Wallet!",
        button: {
          title: 'Connect your account',
          handler: updateCurrentWalletAddress,
        },
      }

    // return

    case 2:
      return {
        text: "You're on a different network. Switch to Fuji C-Chain.",
        button: {
          title: 'Switch',
          handler: SwitchNetwork,
        },
      }

    // return

    case 3:
      return {
        text: "Oops, you don't have AVAX tokens in your account",
        button: {
          title: 'Grab some test tokens',
          handler() {
            window.open('https://faucet.avax.network/', '_blank')
          },
        },
      }
    // return

    default:
      return {
        text: 'Good to go!',
      }
    // return
  }
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
