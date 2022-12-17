<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { avaxContract } = storeToRefs(useWeb3Store())
const { activeBattle } = storeToRefs(useBattleStore())
const router = useRouter()

const battleName = ref('')
const isWaitingBattle = ref(false)

const handleClick = async () => {
  if (!battleName.value || !battleName.value.trim()) return

  try {
    await avaxContract.value?.createBattle(battleName.value)
    isWaitingBattle.value = true

    // pendingBattles.fo
  } catch (error) {
    console.error(error)
  }
}

watch(
  activeBattle,
  (activeBattleChange) => {
    if (activeBattleChange?.battleStatus === 0) {
      isWaitingBattle.value = true
    }
  },
  { immediate: true }
)
</script>

<template>
  <GameLoad v-show="isWaitingBattle" />

  <div class="flex flex-col mb-5">
    <CustomInput
      label="Battle"
      placeholder="Enter battle name"
      :value="battleName"
      @handle-change="(val) => (battleName = val)"
    />
    <CustomButton
      title="Create Battle"
      rest-styles="mt-6"
      @handle-click="handleClick"
    ></CustomButton>

    <p class="info-text" @click="router.push('/join-battle')">
      Or join already existing battles
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: avax
  layoutTitle:
    - Create
    - a new Battle
  layoutDescription: Create your own battle and wait for other players to join you
</route>
