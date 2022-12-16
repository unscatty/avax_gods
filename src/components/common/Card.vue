<script setup lang="ts">
import { Ref } from 'vue'
import { PlayerData } from '../battle/types/battle'

const allCardImages = [
  '/resources/Ace.png',
  '/resources/Bakezori.png',
  '/resources/Black_Solus.png',
  '/resources/Calligrapher.png',
  '/resources/Chakri_Avatar.png',
  '/resources/Coalfist.png',
  '/resources/Desolator.png',
  '/resources/Dusk_Rigger.png',
  '/resources/Flamewreath.png',
  '/resources/Furiosa.png',
  '/resources/Geomancer.png',
  '/resources/Gore_Horn.png',
  '/resources/Heartseeker.png',
  '/resources/Jade_Monk.png',
  '/resources/Kaido_Expert.png',
  '/resources/Katara.png',
  '/resources/Ki_Beholder.png',
  '/resources/Kindling.png',
  '/resources/Lantern_Fox.png',
  '/resources/Mizuchi.png',
  '/resources/Orizuru.png',
  '/resources/Scarlet_Viper.png',
  '/resources/Storm_Kage.png',
  '/resources/Suzumebachi.png',
  '/resources/Tusk_Boar.png',
  '/resources/Twilight_Fox.png',
  '/resources/Void_Talon.png',
  '/resources/Whiplash.png',
  '/resources/Widowmaker.png',
  '/resources/Xho.png',
]

const generateRandomCardImage = () =>
  allCardImages[Math.floor(Math.random() * (allCardImages.length - 1))]

defineProps<{
  card: PlayerData
  title: string
  cardRef?: Ref<HTMLElement>
  restStyles?: string
  isPlayerTwo?: boolean
}>()

const img1 = generateRandomCardImage()
const img2 = generateRandomCardImage()
</script>

<template>
  <div class="card-container" :class="restStyles">
    <Tilt parallax :max="60">
      <img :src="isPlayerTwo ? img1 : img2" alt="card" class="card-img" />
      <!-- Attack -->
      <div class="card-point-container flex-center sm:left-[21.2%] left-[22%] popout">
        <p class="card-point text-yellow-400">
          {{ card.attack > 0 ? card.attack : 'X' }}
        </p>
      </div>
      <!-- Defense -->
      <div
        class="card-point-container flex-center sm:right-[14.2%] right-[15%] popout"
      >
        <p class="card-point text-red-700">
          {{ card.defense > 0 ? card.defense : 'X' }}
        </p>
      </div>

      <div class="card-text-container flex-center popout">
        <p class="card-text">{{ title }}</p>
      </div>
    </Tilt>
  </div>
</template>

<style scoped>
.popout {
  transform: translateZ(10px);
}
</style>
