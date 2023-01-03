import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(async (to, from, next) => {
      const { setAlertInfo } = useAlertInfoStore()
      const web3Store = useWeb3Store()
      const { isConnectedToContract, currentPlayerInfo } =
        storeToRefs(web3Store)
      const { setSmartContractAndProvider, updateCurrentAccountAddress } =
        web3Store
      const { activeBattle } = storeToRefs(useBattleStore())

      if (!isConnectedToContract.value) {
        await setSmartContractAndProvider()
        await updateCurrentAccountAddress()
      }

      const requiresAuth = to.meta?.requiresAuth

      await until(currentPlayerInfo).toMatch((v) => Boolean(v), {
        timeout: 2_000,
      })

      // User is not authenticated
      if (
        requiresAuth &&
        // Check username
        !(currentPlayerInfo && currentPlayerInfo.value?.playerName)
      ) {
        setAlertInfo({
          message: 'You need to register first!',
          type: 'info',
        })

        // Redirect to main page
        next({
          path: '/',
        })
      } else if (to.meta?.requiresActiveBattle) {
        await until(activeBattle).toMatch((v) => Boolean(v), { timeout: 1_500 })

        if (
          !activeBattle.value ||
          activeBattle.value.name !== to.params.battleName
        ) {
          setAlertInfo({
            type: 'failure',
            message: 'You are not in this battle',
          })

          next('/create-battle')
        } else {
          next()
        }
      } else {
        next()
      }
    })
  }
}
