<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type BattlegroundChoice } from '~/store/battleground'

const router = useRouter()

const battlegroundStore = useBattlegroundStore()

// Alert
const alertInfoStore = useAlertInfoStore()
const { setAlertInfo, clearAlertInfo } = alertInfoStore
const { alertInfo } = storeToRefs(alertInfoStore)

const handleBattleGroundChoice = (ground: BattlegroundChoice) => {
  battlegroundStore.battleground = ground

  setAlertInfo({
    status: true,
    type: 'info',
    message: `${ground.name} is battle ready!`,
  })

  const delay = setTimeout(() => {
    router.back()

    clearAlertInfo()
    
    clearTimeout(delay)
  }, 1000)
}
</script>

<template>
  <div class="flex-center battleground-container">
    <AlertInfo
      v-show="alertInfo.status"
      :type="alertInfo.type"
      :message="alertInfo.message"
    />
    <h1 class="head-text text-center">
      Choose your <span class="text-site-violet">Battle</span>Ground

      <div class="flex-center battle-grounds-wrapper">
        <div
          v-for="ground in battlegroundStore.availableBattlegrounds"
          :key="ground.id"
          class="flex-center battle-ground-card battle-card"
          @click="handleBattleGroundChoice(ground)"
        >
          <img
            :src="ground.image"
            alt="ground"
            class="battle-ground-card-img"
          />
          <div class="battle-card-info absolute w-full h-full flex-center">
            <p class="battle-ground-card-text">
              {{ ground.name }}
            </p>
          </div>
        </div>
      </div>
    </h1>
  </div>
</template>
