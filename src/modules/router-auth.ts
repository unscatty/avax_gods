import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, _, next) => {
      const { setAlertInfo } = useAlertInfoStore()
      const { currentPlayerInfo } = storeToRefs(useWeb3Store())

      const requiresAuth = to.meta?.requiresAuth

      // User is not authenticated
      if (
        requiresAuth &&
        // Check username
        !(currentPlayerInfo && currentPlayerInfo.value?.playerName)
      ) {
        setAlertInfo({
          status: true,
          message: 'You need to register first!',
          type: 'info',
        })

        // Redirect to main page
        next({
          path: '/',
        })
      } else {
        next()
      }
    })
  }
}
