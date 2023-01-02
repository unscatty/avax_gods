import { type AVAXGods } from '~/contract/types'
import { createEventListeners as _createEventListeners } from '../utils/create-event-listeners'

export const useEventListeners = () => {
  const router = useRouter()
  const web3Store = useWeb3Store()
  const { avaxContract, provider, currentAccountAddress } =
    storeToRefs(web3Store)

  const { updatePlayerInfo } = web3Store

  const { setAlertInfo } = useAlertInfoStore()

  const battleStore = useBattleStore()
  const { setUpdateGameData } = battleStore
  const { player1Ref, player2Ref } = storeToRefs(battleStore)

  const createEventListeners = () => {
    if (avaxContract && avaxContract.value) {
      _createEventListeners({
        router,
        contract: avaxContract.value! as AVAXGods,
        provider: provider.value!,
        currentAccountAddress: currentAccountAddress.value,
        setAlertInfo,
        player1Ref: player1Ref.value,
        player2Ref: player2Ref.value,
        setUpdateGameData,
        updatePlayerInfo,
      })
    }
  }

  onMounted(() => {
    createEventListeners()

    window.ethereum?.on('chainChanged', createEventListeners)

    window.ethereum?.on('accountsChanged', createEventListeners)
  })

  watch(avaxContract, createEventListeners)
}
