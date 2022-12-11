<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { avaxContract } = storeToRefs(useWeb3Store())
const { battleName } = storeToRefs(useBattleStore())
const router = useRouter()

const handleClick = async () => {
  if (!battleName.value || !battleName.value.trim()) return

  try {
    await avaxContract.value?.createBattle(battleName.value)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
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
