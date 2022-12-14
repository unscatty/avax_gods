import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { type AVAXGods } from '~/contract/types'

export const useBattleStore = defineStore('battle', () => {
  const web3Store = useWeb3Store()
  const avaxContract = ref<AVAXGods>()

  web3Store.$subscribe((_, state) => {
    if (state.avaxContract) {
      avaxContract.value = markRaw(state.avaxContract as AVAXGods)
    }
  })

  const pendingBattles = ref<AVAXGods.BattleStructOutput[]>([])
  const activeBattle = ref<AVAXGods.BattleStructOutput>()
  const players = ref<AVAXGods.PlayerStructOutput[]>()

  const unwatchContract = watch(avaxContract, async () => {
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
          (player) => player.toLowerCase() === web3Store.walletAddress.toLowerCase()
        )
      ) {
        if (battle.winner.startsWith('0x00')) {
          activeBattle.value = battle
        }
      }
    })
    } catch (error) {
      console.info(error)
    }
  })

  onUnmounted(unwatchContract)

  return {
    players,
    pendingBattles,
    activeBattle,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleStore, import.meta.hot))
