<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const { pendingBattles } = storeToRefs(useBattleStore())
const { walletAddress, avaxContract } = storeToRefs(useWeb3Store())
const { setAlertInfo } = useAlertInfoStore()

// Battles that were not created by the current player
// const availableBattles = computed(() =>
//   pendingBattles.value.filter(
//     (battle) => !battle.players.includes(walletAddress.value)
//   )
// )

const availableBattles = computed(() => {
  return pendingBattles.value
})

const handleClick = async (battleName: string) => {
  try {
    await avaxContract.value?.joinBattle(battleName)

    setAlertInfo({
      status: true,
      type: 'success',
      message: `Joining ${battleName}...`,
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <h2 class="join-head-text">Available Battles:</h2>

  <div class="join-container">
    <p class="text-white">{{ walletAddress }}</p>
    <template v-if="availableBattles.length">
      <div
        v-for="(battle, index) in availableBattles"
        :key="battle.battleHash"
        class="flex-between"
      >
        <p class="join-battle-title">
          {{ index + 1 }}. {{ battle.name }}
        </p>
        <CustomButton
          title="Join"
          rest-styles="''"
          @handle-click="handleClick(battle.name)"
        />
      </div>
    </template>
    <template v-else>
      <p class="join-loading">Reload the page to see new battles</p>
    </template>
  </div>

  <p class="info-text" @click="router.push('/create-battle')">
    Or create a new battle
  </p>
</template>

<route lang="yaml">
meta:
  layout: avax
  layoutTitle:
    - Join
    - a battle
  layoutDescription: Join already existing battles
</route>
