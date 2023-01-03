<script setup lang="ts">
import { storeToRefs } from 'pinia';

const { setErrorMessage } = useAlertInfoStore()
const { avaxContract } = storeToRefs(useWeb3Store())
const { activeBattle, hasPendingBattle } = storeToRefs(useBattleStore())
const router = useRouter()

const battleName = ref('')
const hasCreatedBattle = ref(false)

const hasClosedModal = ref(false)

const isWaitingBattle = computed<boolean>(
  () =>
    hasCreatedBattle.value || activeBattle.value?.battleStatus === 0 || false
)

const isModalOpen = computed<boolean>({
  get() {
    if (isWaitingBattle.value) {
      return !hasClosedModal.value
    }

    return false
  },
  set(isOpen) {
    hasClosedModal.value = !isOpen
  },
})

const handleClick = async () => {
  if (!battleName.value || !battleName.value.trim()) return

  try {
    await avaxContract.value?.createBattle(battleName.value)

    hasCreatedBattle.value = true
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
    - Create
    - a new Battle
  layoutDescription: Create your own battle and wait for other players to join you
</route>

<template>
  <GameLoad v-show="isModalOpen" v-model:is-open="isModalOpen" />

  <div class="flex flex-col mb-5">
    <PendingBattle v-if="hasPendingBattle" />

    <template v-else>
      <CustomInput
        v-model="battleName"
        label="Battle"
        placeholder="Enter battle name"
      />
      <CustomButton
        title="Create Battle"
        rest-styles="mt-6"
        @handle-click="handleClick"
      ></CustomButton>

      <p class="info-text" @click="router.push('/join-battle')">
        Or join already existing battles
      </p>
    </template>
  </div>
</template>
