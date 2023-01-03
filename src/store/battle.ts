import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { type AVAXGods } from '~/contract/types'

export const useBattleStore = defineStore('battle', () => {
  const { setErrorMessage } = useAlertInfoStore()
  const { avaxContract, currentAccountAddress } = storeToRefs(useWeb3Store())

  const pendingBattles = ref<AVAXGods.BattleStructOutput[]>([])
  const activeBattle = ref<AVAXGods.BattleStructOutput>()
  const players = ref<AVAXGods.PlayerStructOutput[]>()

  // Player refs
  const player1Ref = ref<HTMLElement>()
  const player2Ref = ref<HTMLElement>()

  const [updateGameData, setUpdateGameData] = useState(0)

  const hasPendingBattle = computed<boolean>(() => {
    if (activeBattle.value) {
      return (
        activeBattle.value.battleStatus === 0 ||
        activeBattle.value.battleStatus === 1
      )
    }

    return false
  })

  watch(
    [avaxContract, updateGameData],
    async () => {
      try {
        const allBattles = await avaxContract.value?.getAllBattles()
        const _pendingBattles = allBattles?.filter(
          (battle) => battle.battleStatus === 0
        )

        if (_pendingBattles && _pendingBattles?.length > 1) {
          pendingBattles.value = _pendingBattles.slice(1)
        }

        allBattles?.forEach((battle) => {
          if (
            battle.players.find(
              (player) =>
                player.toLowerCase() ===
                currentAccountAddress.value.toLowerCase()
            )
          ) {
            if (battle.winner.startsWith('0x00')) {
              activeBattle.value = battle
            }
          }
        })
      } catch (error) {
        setErrorMessage(error)
      }
    },
    { immediate: true }
  )

  return {
    players,
    pendingBattles,
    activeBattle,
    hasPendingBattle,

    player1Ref,
    player2Ref,

    updateGameData,
    setUpdateGameData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleStore, import.meta.hot))
