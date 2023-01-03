<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const { pendingBattles, activeBattle } = storeToRefs(useBattleStore())
const { currentAccountAddress, avaxContract } = storeToRefs(useWeb3Store())
const { setAlertInfo, setErrorMessage } = useAlertInfoStore()

const isInBattle = computed(() => Boolean(activeBattle.value))

// Battles that were not created by the current player
const availableBattles = computed(() =>
  pendingBattles.value.filter(
    (battle) =>
      !battle.players.some(
        (address) =>
          address.toLowerCase() === currentAccountAddress.value.toLowerCase()
      )
  )
)

const handleClick = async (battleName: string) => {
  try {
    await avaxContract.value?.joinBattle(battleName)

    setAlertInfo({
      type: 'success',
      message: `Joining ${battleName}...`,
    })
  } catch (error) {
    setErrorMessage(error)
  }
}
</script>

<route lang="yaml">
meta:
  requiresAuth: true

  layout: avax
  layoutTitle:
    - Join
    - a battle
  layoutDescription: Join already existing battles
</route>

<template>
  <PendingBattle v-if="isInBattle" />

  <template v-else>
    <h2 class="join-head-text">Available Battles:</h2>

    <div class="join-container">
      <template v-if="availableBattles.length">
        <div
          v-for="(battle, index) in availableBattles"
          :key="battle.battleHash"
          class="flex-between"
        >
          <p class="join-battle-title">{{ index + 1 }}. {{ battle.name }}</p>
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
</template>
