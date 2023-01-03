<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const { currentAccountAddress } = storeToRefs(useWeb3Store())
const { activeBattle } = storeToRefs(useBattleStore())

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const isOpen = useVModel(props, 'isOpen', emit)

const formattedAddress = computed(() =>
  currentAccountAddress.value.slice(0, 30)
)

const unknownAddress = '?'.repeat(30)
</script>

<template>
  <div class="flex-between game-load-container gameload">
    <div class="absolute left-6 top-6">
      <div class="game-info-sidebar-close-box">
        <div
          class="flex-center game-info-sidebar-close"
          @click="isOpen = false"
        >
          x
        </div>
      </div>
    </div>
    <div class="game-load-btn-box">
      <CustomButton
        title="Choose Battleground"
        rest-styles="mt-6"
        @handle-click="router.push('/battleground')"
      />
    </div>

    <div class="flex flex-center flex-col">
      <h2 class="game-load-head-text text-center text-4xl">
        Battle {{ activeBattle?.name }}
      </h2>
    </div>

    <div class="flex-1 flex-center flex-col">
      <h1 class="game-load-head-text text-center">
        Waiting for a <br />
        worthy opponent...
      </h1>
      <p class="game-load-text">
        Protip: while you're waiting, choose your preferred battleground
      </p>

      <div class="game-load-players-box">
        <div class="flex-center flex-col">
          <img
            src="/resources/player01.png"
            alt="plery1logo"
            class="game-load-player-img"
          />
          <p class="game-load-player-text">
            {{ formattedAddress }}
          </p>
        </div>

        <h2 class="game-load-vs">VS</h2>

        <div class="flex-center flex-col">
          <img
            src="/resources/player02.png"
            alt="plery1logo"
            class="game-load-player-img"
          />
          <p class="game-load-player-text">
            {{ unknownAddress }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
