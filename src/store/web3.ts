import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import Web3Modal from 'web3modal'
import { AVAXGods, AVAXGods__factory } from '../contract/types'

export const useWeb3Store = defineStore('web3', () => {
  const walletAddress = ref('')
  const provider = ref<ethers.providers.Web3Provider>()
  const avaxContract = ref<AVAXGods>()

  const updateCurrentWalletAddress = async () => {
    const accounts = (await window.ethereum?.request!({
      method: 'eth_accounts',
    })) as string[]

    if (accounts) {
      console.debug(accounts)
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

    // await avaxGodsContract.deployed()

    provider.value = newProvider
    avaxContract.value = avaxGodsContract
  }

  onMounted(async () => {
    await setSmartContractAndProvider()

    await updateCurrentWalletAddress()

    window.ethereum?.on('accountsChanged', updateCurrentWalletAddress)
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
