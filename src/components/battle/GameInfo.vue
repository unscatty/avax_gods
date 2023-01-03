<script setup lang="ts">
const { avaxContract } = storeToRefs(useWeb3Store())
const { activeBattle } = storeToRefs(useBattleStore())
const { setAlertInfo, setErrorMessage } = useAlertInfoStore()

const gameRules = [
  'Card with the same defense and attack point will cancel each other out.',
  "Attack points from the attacking card will deduct the opposing player's health points.",
  "If P1 does not defend, their health wil be deducted by P2's attack.",
  "If P1 defends, P2's attack is equal to P2's attack - P1's defense.",
  'If a player defends, they refill 3 Mana',
  'If a player attacks, they spend 3 Mana',
]

const router = useRouter()

const toogleSidebar = ref(false)

const handleBattleExit = async () => {
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
</script>

<template>
  <div class="game-info-icon-box scale-125">
    <div class="game-info-icon flex-center" @click="toogleSidebar = true">
      <AlertIcon type="text-white" />
    </div>
  </div>

  <div
    class="game-info-sidebar glass-effect flex-between backdrop-blur-3xl"
    :class="toogleSidebar ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex flex-col">
      <div class="game-info-sidebar-close-box">
        <div
          class="flex-center game-info-sidebar-close"
          @click="toogleSidebar = false"
        >
          x
        </div>
      </div>

      <h3 class="game-info-heading">Game Rules:</h3>

      <div class="mt-3">
        <p
          v-for="(rule, index) in gameRules"
          :key="index"
          class="game-info-text"
        >
          <span class="font-bold">{{ index + 1 }}.</span>
          {{ rule }}
        </p>
      </div>
    </div>

    <div class="flex-between mt-10 gap-4 w-full">
      <CustomButton
        title="Change Battleground"
        @handle-click="router.push('/battleground')"
      />
      <CustomButton title="Exit Battle" @handle-click="handleBattleExit" />
    </div>
  </div>
</template>
