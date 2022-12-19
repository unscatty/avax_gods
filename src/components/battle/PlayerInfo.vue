<script setup lang="ts">
import { PlayerData } from './types/battle'

const props = defineProps<{
  marginTop?: boolean
  playerIcon: string
  player?: PlayerData
}>()

const healthPoints = 25
const healthBars = computed(() => [...Array(props.player?.health).keys()])

const healthLevel = computed(() => {
  const playerHealth = props.player?.health || 0
  
  return playerHealth >= 12
    ? 'bg-green-500'
    : playerHealth >= 6
    ? 'bg-orange-500'
    : 'bg-red-500'
})

const marginIndexing = (index: number) =>
  index !== healthPoints - 1 ? 'mr-1' : 'mr-0'
</script>

<template>
  <div class="flex-center" :class="marginTop ? 'mt-4' : 'mb-4'">
    <img
      :src="playerIcon"
      alt="player_icon"
      class="w-14 h-14 object-contain rounded-full"
      :data-for="`Player-${marginTop ? '1' : '2'}`"
      data-tip
    />

    <div
      class="player-health"
      :data-for="`Health-${marginTop ? '1' : '2'}`"
      :data-tip="`Health: ${player?.health}`"
    >
      <div
        v-for="(healthBar, index) in healthBars"
        :key="`player-item-${healthBar}`"
        class="player-health-bar"
        :class="`${healthLevel} ${marginIndexing(index)}`"
      />
    </div>
    <div
      class="flex-center glass-effect player-mana"
      :data-for="`Mana-${marginTop ? '1' : '2'}`"
      data-tip="Mana"
    >
      {{ player?.mana || 0 }}
    </div>

    <!-- TODO: player tooltips -->
  </div>
</template>
