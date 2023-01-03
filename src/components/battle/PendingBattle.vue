<script setup lang="ts">
const router = useRouter()

const { avaxContract } = storeToRefs(useWeb3Store())
const { activeBattle } = storeToRefs(useBattleStore())
const { setAlertInfo, setErrorMessage } = useAlertInfoStore()

const onExitBattle = async () => {
  const exit = confirm('You will lose this battle. Are your sure?')

  if (!exit) return

  try {
    const battleName = activeBattle.value?.name
    if (battleName) {
      await avaxContract.value?.quitBattle(battleName)

      setAlertInfo({
        type: 'info',
        message: `You're quitting the ${battleName} battle`,
      })
    }
  } catch (error) {
    setErrorMessage(error)
  }
}

const onContinueBattle = () => {
  if (activeBattle.value?.battleStatus === 0) {
    setAlertInfo({
      type: 'info',
      message: 'This battle is still waiting for an opponent',
    })

    return
  }

  router.push(`/battle/${activeBattle.value?.name}`)
}
</script>

<template>
  <p class="join-head-text">You have a pending Battle</p>
  <div class="join-container">
    <div class="flex-between">
      <p class="join-battle-title">{{ activeBattle?.name }}</p>
      <div class="flex-between space-x-5">
        <CustomButton title="Continue" @handle-click="onContinueBattle" />
        <CustomButton
          title="Exit battle"
          rest-styles="bg-red-6"
          @handle-click="onExitBattle"
        />
      </div>
    </div>
  </div>
</template>
