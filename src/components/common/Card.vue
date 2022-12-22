<script setup lang="ts">
import { PlayerData } from '../battle/types/battle'

const allCardImages = [
  '/resources/cards/Ace.png',
  '/resources/cards/Bakezori.png',
  '/resources/cards/Black_Solus.png',
  '/resources/cards/Calligrapher.png',
  '/resources/cards/Chakri_Avatar.png',
  '/resources/cards/Coalfist.png',
  '/resources/cards/Desolator.png',
  '/resources/cards/Dusk_Rigger.png',
  '/resources/cards/Flamewreath.png',
  '/resources/cards/Furiosa.png',
  '/resources/cards/Geomancer.png',
  '/resources/cards/Gore_Horn.png',
  '/resources/cards/Heartseeker.png',
  '/resources/cards/Jade_Monk.png',
  '/resources/cards/Kaido_Expert.png',
  '/resources/cards/Katara.png',
  '/resources/cards/Ki_Beholder.png',
  '/resources/cards/Kindling.png',
  '/resources/cards/Lantern_Fox.png',
  '/resources/cards/Mizuchi.png',
  '/resources/cards/Orizuru.png',
  '/resources/cards/Scarlet_Viper.png',
  '/resources/cards/Storm_Kage.png',
  '/resources/cards/Suzumebachi.png',
  '/resources/cards/Tusk_Boar.png',
  '/resources/cards/Twilight_Fox.png',
  '/resources/cards/Void_Talon.png',
  '/resources/cards/Whiplash.png',
  '/resources/cards/Widowmaker.png',
  '/resources/cards/Xho.png',
]

const generateRandomCardImage = () =>
  allCardImages[Math.floor(Math.random() * (allCardImages.length - 1))]

defineProps<{
  card: PlayerData
  title: string
  restStyles?: string
  isPlayerTwo?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:cardRef', value?: HTMLElement): void
}>()

const img1 = generateRandomCardImage()
const img2 = generateRandomCardImage()

const playerRef = ref<HTMLElement>()

onMounted(() => emit('update:cardRef', playerRef.value))
</script>

<template>
  <div ref="playerRef" class="card-container" :class="restStyles">
    <Tilt parallax :max="60">
      <img :src="isPlayerTwo ? img1 : img2" alt="card" class="card-img" />
      <!-- Attack -->
      <div
        class="card-point-container flex-center sm:left-[21.2%] left-[22%] popout"
      >
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
