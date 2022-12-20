import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import Web3Modal from 'web3modal'
import { AVAXGods__factory, type AVAXGods } from '~/contract/types'
import { type WalletError } from '~/utils/error-message'

export const useWeb3Store = defineStore('web3', () => {
  const { setErrorMessage } = useAlertInfoStore()

  const walletAddress = ref('')
  const provider = ref<ethers.providers.Web3Provider>()
  const avaxContract = ref<AVAXGods>()

  const updateCurrentWalletAddress = async () => {
    const accounts = (await window.ethereum?.request!({
      method: 'eth_accounts',
    })) as string[]

    if (accounts) {
      walletAddress.value = accounts[0]
    }
  }

  const setSmartContractAndProvider = async () => {
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
  }

  onMounted(async () => {
    try {
      await setSmartContractAndProvider()

      await updateCurrentWalletAddress()

      window.ethereum?.on('accountsChanged', updateCurrentWalletAddress)
    } catch (error) {
      setErrorMessage(<WalletError>error)
    }
  })

  return {
    avaxContract,
    provider,
    walletAddress,
    updateCurrentWalletAddress,
    setSmartContractAndProvider,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))
