<script setup lang="ts">
import {
  getChainID,
  isEthereum,
  requestBalance,
  switchToFujiNetwork,
} from '~/utils/web3'

const web3Store = useWeb3Store()

const {
  updateCurrentAccountAddress,
  setAccountBalance,
  setSmartContractAndProvider,
} = web3Store

const { currentAccountAddress } = storeToRefs(web3Store)

const isModalOpen = ref(true)

const advice = ref<{
  text: string
  button?: {
    title: string
    handler: () => void
  }
}>()

const checkConstraints = async () => {
  isModalOpen.value = true
  
  if (!isEthereum()) {
    return {
      text: "You don't have Core Wallet installed!",
      button: {
        title: 'Download Core',
        handler() {
          window.open('https://core.app/', '_blank')
        },
      },
    }
  }

  try {
    await updateCurrentAccountAddress()

    if (!currentAccountAddress.value) throw new Error('You are not connected')
  } catch (error) {
    return {
      text: "You haven't connected your account to Core Wallet!",
      button: {
        title: 'Connect your account',
        handler: async () => {
          await setSmartContractAndProvider()
          await updateCurrentAccountAddress()
        },
      },
    }
  }

  if (getChainID() !== parseInt(import.meta.env.VITE_FUJI_C_CHAIN_ID)) {
    return {
      text: "You're on a different network. Switch to Fuji C-Chain.",
      button: {
        title: 'Switch',
        handler: switchToFujiNetwork,
      },
    }
  }

  if (currentAccountAddress.value) {
    let currentAccountBalance: number | undefined
    try {
      currentAccountBalance = await requestBalance(currentAccountAddress.value)

      if (currentAccountBalance !== undefined) {
        setAccountBalance(currentAccountBalance)

        if (currentAccountBalance <= 0) {
          throw new Error('Need tokens')
        }
      }
    } catch (error) {
      return {
        text: "Oops, you don't have AVAX tokens in your account",
        button: {
          title: 'Grab some test tokens',
          handler() {
            window.open('https://faucet.avax.network/', '_blank')
          },
        },
      }
    }
  }

  // Everything's fine
  isModalOpen.value = false

  return {
    text: 'Good to go!',
  }
}

const computeAdvice = async () => {
  advice.value = await checkConstraints()
}

onMounted(() => {
  computeAdvice()

  window.ethereum?.on('chainChanged', computeAdvice)

  window.ethereum?.on('accountsChanged', computeAdvice)
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
