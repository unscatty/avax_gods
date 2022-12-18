import { watch } from 'vue'
import { type AVAXGods } from '~/contract/types'
import { createEventListeners } from '../utils/create-event-listeners'

export const useEventListeners = () => {
  const router = useRouter()
  const { avaxContract, provider, walletAddress } = storeToRefs(useWeb3Store())
  const { setAlertInfo } = useAlertInfoStore()
  const { step } = storeToRefs(useStepStore())

  const battleStore = useBattleStore()
  const { setUpdateGameData } = battleStore
  const { player1Ref, player2Ref } = storeToRefs(battleStore)

  watch(
    step,
    () => {
      createEventListeners({
        router,
        contract: avaxContract.value! as AVAXGods,
        provider: provider.value!,
        walletAddress: walletAddress.value,
        setAlertInfo,
        player1Ref: player1Ref.value,
        player2Ref: player2Ref.value,
        setUpdateGameData,
      })
    },
    { immediate: true }
  )

  return { step }
}
