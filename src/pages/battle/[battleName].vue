<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PlayerData } from '~/components/battle/types/battle'

const router = useRouter()
const { setAlertInfo } = useAlertInfoStore()
const { walletAddress, avaxContract } = storeToRefs(useWeb3Store())
const { players, activeBattle } = storeToRefs(useBattleStore())

const props = defineProps<{ battleName: string }>()

const battleGround = ref('bg-astral')
const player1 = ref<PlayerData>({
  attack: 10,
  health: 20,
  defense: 10,
  mana: 5,
  instance: {} as any,
})
const player2 = ref<PlayerData>({
  attack: 10,
  health: 25,
  defense: 10,
  mana: 5,
  instance: {} as any,
})

const getPlayerInfo = async () => {
  if (!activeBattle.value || !avaxContract.value) return

  try {
    let player01Address: string
    let player02Address: string

    if (
      activeBattle.value.players[0].toLowerCase() ===
      walletAddress.value.toLowerCase()
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
  }
}

// const unwatchChanges = watch(
//   [avaxContract, activeBattle, props.battleName],
//   getPlayerInfo
// )

// onUnmounted(unwatchChanges)
</script>

<template>
  <div class="flex-between game-container bg-cover" :class="battleGround">
    <!-- <h1 class="text-xl text-white">
      {{ battleName }}
    </h1> -->

    <PlayerInfo :player="player2" player-icon="/resources/player02.png" :mt="true" />

    <div class="flex-center flex-col my-10">
      <Card :card="player2" :title="player2?.instance.playerName" />

      <div class="flex items-center flex-row">
        <CustomButton
          rest-styles="mr-2 hover:border-yellow-400"
          @handle-click="() => {}"
        >
          <img
            src="/resources/attack.png"
            alt="action_img"
            class="game-move-icon"
          />
        </CustomButton>

        <Card
          :card="player1"
          :title="player1?.instance.playerName"
          rest-styles="mt-3"
        />

        <CustomButton
          rest-styles="ml6 hover:border-red-600"
          @handle-click="() => {}"
        >
          <img
            src="/resources/defense.png"
            alt="action_img"
            class="game-move-icon"
          />
        </CustomButton>
      </div>
    </div>

    <PlayerInfo :player="player1" player-icon="/resources/player01.png" />
    <GameInfo />
  </div>
</template>

<route lang="yaml">
meta:
  layout: avax-battle
</route>
