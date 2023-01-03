export const useWeb3 = () => {
  const router = useRouter()

  const { setAlertInfo } = useAlertInfoStore()
  const { setErrorMessage } = useAlertInfoStore()
  const web3Store = useWeb3Store()
  const { currentPlayerInfo, isConnectedToContract } =
    storeToRefs(web3Store)
  const { setSmartContractAndProvider, updateCurrentAccountAddress } =
    web3Store

  const initialize = async () => {
    try {
      await setSmartContractAndProvider()
      await updateCurrentAccountAddress()
    } catch (error) {
      setErrorMessage(error)
    }

    await until(currentPlayerInfo).toMatch((v) => Boolean(v), {
      timeout: 1_000,
    })

    if (
      router.currentRoute.value.path !== '/' &&
      (!currentPlayerInfo.value || !currentPlayerInfo.value.playerName)
    ) {
      setAlertInfo({
        status: true,
        message: 'You need to register first!',
        type: 'info',
      })

      router.push('/')
    }
  }

  onMounted(async () => {
    if (!isConnectedToContract.value) {
      try {
        await initialize()
      } catch (error) {
        setErrorMessage(error)
      }
    }

    window.ethereum?.on('accountsChanged', initialize)
    window.ethereum?.on('chainChanged', initialize)
  })
}
