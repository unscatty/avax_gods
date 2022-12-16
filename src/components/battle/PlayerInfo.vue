<script setup lang="ts">
import { PlayerData } from './types/battle'

const props = defineProps<{
  mt?: boolean
  playerIcon: string
  player?: PlayerData
}>()

const healthPoints = 25
const healthBars = computed(() => [...Array(props.player?.health).keys()])

const healthLevel = (points: number) =>
  points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500'
const marginIndexing = (index: number) =>
  index !== healthPoints - 1 ? 'mr-1' : 'mr-0'
</script>

<template>
  <div class="flex-center" :class="mt ? 'mt-4' : 'mb-4'">
    <img
      :src="playerIcon"
      alt="player_icon"
      class="w-14 h-14 object-contain rounded-full"
      :data-for="`Player-${mt ? '1' : '2'}`"
      data-tip
    />

    <div
      class="player-health"
      :data-for="`Health-${mt ? '1' : '2'}`"
      :data-tip="`Health: ${player?.health}`"
    >
      <div
        v-for="(healthBar, index) in healthBars"
        :key="`player-item-${healthBar}`"
        class="player-health-bar"
        :class="`${healthLevel(player?.health || 0)} ${marginIndexing(index)}`"
      />
    </div>
    <div
      class="flex-center glass-effect player-mana"
      :data-for="`Mana-${mt ? '1' : '2'}`"
      data-tip="Mana"
    >
      {{ player?.mana || 0 }}
    </div>
  </div>
</template>
