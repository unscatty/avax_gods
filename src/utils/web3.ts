export const isEthereum = () => {
  return Boolean(window.ethereum)
}

export const getChainID = () => {
  if (isEthereum()) return parseInt(window.ethereum!.chainId, 16)

  return 0
}

export const handleConnection = async (accounts: string[]) => {
  if (accounts.length === 0) {
    const networkAccounts = (await window.ethereum!.request!({
      method: 'eth_requestAccounts',
    })) as string[]

    return networkAccounts
  }

  return accounts
}

export const requestAccount = async () => {
  if (isEthereum() && getChainID() !== 0) {
    const connection = await window.ethereum!.request!({
      method: 'eth_accounts',
    })

    const accounts = await handleConnection(connection)
    return accounts[0]
  }
}

export const requestBalance = async (currentAccount: string) => {
  if (isEthereum()) {
    const hexBalance = (await window.ethereum!.request!({
      method: 'eth_getBalance',
      params: [currentAccount, 'latest'],
    })) as number

    return parseInt(hexBalance.toString(), 16) / 1e18
  }
}


export const switchToFujiNetwork = async () => {
  window?.ethereum?.request!({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0xA869',
        chainName: 'Fuji C-Chain',
        nativeCurrency: {
          name: 'AVAX',
          symbol: 'AVAX',
          decimals: 18,
        },
        rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://testnet.snowtrace.io'],
      },
    ],
  })
}
