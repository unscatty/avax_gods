import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GetParams } from '~/utils/onboard'

export const useStepStore = defineStore('step', () => {
  const { updateCurrentAccountAddress } = useWeb3Store()

  const step = ref(-1)

  const resetParams = async () => {
    const currentStep = await GetParams()

    step.value = currentStep.step

    await updateCurrentAccountAddress()
  }

  onMounted(() => {
    // resetParams()

    window.ethereum?.on('chainChanged', () => {
      resetParams()
    })

    window.ethereum?.on('accountsChanged', () => {
      resetParams()
    })
  })

  return {
    step,
    resetParams,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStepStore, import.meta.hot))
