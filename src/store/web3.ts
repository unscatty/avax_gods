import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import Web3Modal from 'web3modal'
import { AVAXGods__factory, type AVAXGods } from '~/contract/types'

export const useWeb3Store = defineStore('web3', () => {
  const { setErrorMessage } = useAlertInfoStore()

  const currentAccountAddress = ref('')
  const currentAccountBalance = ref(0)
  const provider = ref<ethers.providers.Web3Provider>()
  const avaxContract = ref<AVAXGods>()

  const playerInfoUpdates = ref(1)

  const updatePlayerInfo = () => playerInfoUpdates.value++

  const isConnectedToContract = computed(() => Boolean(avaxContract.value))

  const currentPlayerInfo = computedAsync(async () => {
    if (
      // To force recalculation of player info
      playerInfoUpdates.value &&
      currentAccountAddress.value &&
      avaxContract.value &&
      (await avaxContract.value.isPlayer(currentAccountAddress.value))
    ) {
      return avaxContract.value?.getPlayer(currentAccountAddress.value)
    }
  }, null)

  const setAccountBalance = (newBalance: number) => {
    currentAccountBalance.value = newBalance
  }

  const updateCurrentAccountAddress = async () => {
    const accounts = (await window.ethereum?.request!({
      method: 'eth_accounts',
    })) as string[]

    if (accounts && accounts.length > 0) {
      currentAccountAddress.value = accounts[0].toLowerCase()
    }
  }

  const setSmartContractAndProvider = async () => {
    try {
      const web3modal = new Web3Modal()
      const connection = await web3modal.connect()
      const newProvider = new ethers.providers.Web3Provider(connection)
      const signer = newProvider.getSigner()
      const avaxGodsContract = AVAXGods__factory.connect(
        import.meta.env.VITE_AVAX_CONTRACT_ADDRESS,
        signer
      )

      await avaxGodsContract.deployed()

      provider.value = markRaw(newProvider)
      avaxContract.value = markRaw(avaxGodsContract)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  return {
    updatePlayerInfo,
    isConnectedToContract,
    avaxContract,
    provider,
    currentPlayerInfo,
    currentAccountAddress,
    updateCurrentAccountAddress,
    setSmartContractAndProvider,
    setAccountBalance,
    currentAccountBalance,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))
}
