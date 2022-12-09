import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import Web3Modal from 'web3modal'

export const useWeb3Store = defineStore('web3', () => {
  const walletAddress = ref('')
  const updateCurrentWalletAddress = async () => {
    const accounts = await window.ethereum?.request!({
      method: 'eth_requestAccounts'
    })

    console.log(accounts)
  }

  const setSmartContractAndProvider = async () => {
    const web3modal = new Web3Modal()
    const connection = await web3modal.connect()
    const newProvider = new ethers.providers.Web3Provider(connection)
    const signer = newProvider.getSigner()
    const newContract = new ethers.Contract()
  }

  return {
    walletAddress,
    updateCurrentWalletAddress,
    setSmartContractAndProvider
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))