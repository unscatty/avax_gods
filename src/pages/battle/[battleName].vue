<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PlayerData } from '~/components/battle/types/battle'
import { playAudio } from '~/utils/animation'

const baseURL = import.meta.env.BASE_URL

const attackSound = `${baseURL}resources/sounds/attack.wav`
const defenseSound = `${baseURL}resources/sounds/defense.mp3`

const { setAlertInfo, setErrorMessage } = useAlertInfoStore()
const { currentAccountAddress, avaxContract } = storeToRefs(useWeb3Store())
const { activeBattle, player1Ref, player2Ref } = storeToRefs(useBattleStore())
const { battleground } = storeToRefs(useBattlegroundStore())

const props = defineProps<{ battleName: string }>()

const player1 = ref<PlayerData>({
  attack: -1,
  health: 20,
  defense: 10,
  mana: 5,
  instance: {
    playerName: 'Player1',
  } as any,
})
const player2 = ref<PlayerData>({
  attack: 10,
  health: 25,
  defense: 10,
  mana: 5,
  instance: {
    playerName: 'Player2',
  } as any,
})

const getPlayersInfo = async () => {
  if (
    !activeBattle.value ||
    activeBattle.value.players.some(
      (address) =>
        address.toLowerCase() ===
        import.meta.env.VITE_EMPTY_ACCOUNT_VALUE.toLowerCase()
    ) ||
    !avaxContract.value
  )
    return

  try {
    let player01Address: string
    let player02Address: string

    if (
      activeBattle.value.players[0].toLowerCase() ===
      currentAccountAddress.value.toLowerCase()
    ) {
      player01Address = activeBattle.value.players[0]
      player02Address = activeBattle.value.players[1]
    } else {
      player01Address = activeBattle.value.players[1]
      player02Address = activeBattle.value.players[0]
    }

    const p1TokenData = await avaxContract.value.getPlayerToken(player01Address)
    const player01Instance = await avaxContract.value.getPlayer(player01Address)
    const player02Instance = await avaxContract.value.getPlayer(player02Address)

    const p1Attack = p1TokenData.attackStrength.toNumber()
    const p1Defense = p1TokenData.defenseStrength.toNumber()
    const p1Health = player01Instance.playerHealth.toNumber()
    const p1Mana = player01Instance.playerMana.toNumber()

    const p2Health = player02Instance.playerHealth.toNumber()
    const p2Mana = player02Instance.playerMana.toNumber()

    player1.value = {
      instance: player01Instance,
      attack: p1Attack,
      defense: p1Defense,
      health: p1Health,
      mana: p1Mana,
    }
    player2.value = {
      instance: player02Instance,
      attack: -1,
      defense: -1,
      health: p2Health,
      mana: p2Mana,
    }
  } catch (error) {
    console.error(error)
    setErrorMessage(error)
  }
}

const makeAMove = async (choice: number) => {
  playAudio(choice === 1 ? attackSound : defenseSound)

  try {
    await avaxContract.value?.attackOrDefendChoice(choice, props.battleName, {
      gasLimit: 200_000,
    })

    setAlertInfo({
      type: 'info',
      message: `Initiating ${choice === 1 ? 'attack' : 'defense'}`,
    })
  } catch (error) {
    setErrorMessage(error)
  }
}

const attackMove = () => {
  const currentPlayerMana = player1.value.mana

  if (currentPlayerMana < 3) {
    setAlertInfo({
      type: 'failure',
      message: [
        'You need at least 3 mana to attack.',
        `You have ${currentPlayerMana} mana.`,
        'Make a defense move to restore your mana',
      ],
      timeout: 5_000,
    })

    return
  }

  makeAMove(1)
}
const defenseMove = () => makeAMove(2)

watch([avaxContract, activeBattle, props], getPlayersInfo, {
  immediate: true,
})

useHead({
  title: `Fighting ${props.battleName}`,
})
// })
</script>

<route lang="yaml">
meta:
  requiresActiveBattle: true
  requiresAuth: true
  layout: avax-battle
</route>

<template>
  <div class="flex-between game-container bg-cover" :class="battleground.id">
    <PlayerInfo
      :player="player2"
      :player-icon="`${baseURL}resources/player02.png`"
      margin-top
    />

    <div class="flex-center flex-col my-10">
      <Card
        v-model:card-ref="player2Ref"
        :card="player2"
        :title="player2?.instance.playerName"
        is-player-two
      />

      <div class="flex items-center flex-row">
        <ActionButton
          :img-url="`${baseURL}resources/attack.png`"
          rest-styles="mr-2 hover:border-yellow-400"
          @handle-click="attackMove"
        />

        <Card
          v-model:card-ref="player1Ref"
          :card="player1"
          :title="player1?.instance.playerName"
          rest-styles="mt-3"
        />

        <ActionButton
          :img-url="`${baseURL}resources/defense.png`"
          rest-styles="ml-6 hover:border-red-600"
          @handle-click="defenseMove"
        />
      </div>
    </div>

    <PlayerInfo
      :player="player1"
      :player-icon="`${baseURL}resources/player01.png`"
    />

    <GameInfo />
  </div>
</template>
